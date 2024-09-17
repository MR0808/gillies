import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import * as OTPAuth from 'otpauth';
import { compare } from 'bcrypt-ts';

import db from '@/lib/db';
import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas/auth';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail, sendRegistrationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import getTwoFactorConfirmationByUserId from '@/data/twoFactorConfirmation';
import { getRegistrationTokenByEmail } from '@/data/registrationToken';

const app = new Hono()
    .post('/', zValidator('json', LoginSchema),
        async (c) => {
            let { email, password } = c.req.valid('json');
            const existingUser = await getUserByEmail(email);

        if (!existingUser || !existingUser.email || !existingUser.password) {
            return c.json({ data: false, error: 'Email and password combination is invalid' });
        }

        if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(
                existingUser.email
            );

            await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token
            );

            return c.json({data: false,  error: 'Email not verified. New confirmation email sent!' });
        }

        if (!existingUser.registered) {
            const registrationToken = await getRegistrationTokenByEmail(
                existingUser.email
            );
    
            if (registrationToken) {
                await sendRegistrationEmail(
                    registrationToken.email,
                    registrationToken?.token
                );
            }
    
            return c.json({data: false, 
                error: 'Please click the link you were sent to confirm your registration'
            });
        }

        const returnSignIn = await signIn('credentials', {
            email,
            password,
            redirect: false
        }); 

        if (returnSignIn.ok) return c.json({ data: true, twoFactorEnabled: existingUser.otpEnabled });

        return c.json({ data: false, error: 'Email and password combination is invalid' });

        
        }
    ).post('/token', zValidator('json', LoginSchema),
        async (c) => {

            let { email, token } = c.req.valid('json');
            if (token) {
            const existingUser = await getUserByEmail(email);

            if (!existingUser || !existingUser.email || !existingUser.password) {
                return c.json({ error: 'Email and password combination is invalid' });
            }

            const totp = new OTPAuth.TOTP({
                issuer: 'Wikibeerdia',
                label: `${existingUser.firstName} ${existingUser.lastName}`,
                algorithm: 'SHA1',
                digits: 6,
                secret: existingUser.otpBase32!
            });

            const delta = totp.validate({ token, window: 2 });

            if (delta === null) {
                return c.json({ error: 'Invalid code!' });
            }

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            );

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id
                }
            });

            return c.json({data: true})
        }
        return c.json({ error: 'No token attached' });
        
    }
    ).post('/backup', zValidator('json', LoginSchema),
        async (c) => {

    let { email, backupCode } = c.req.valid('json');

    if (backupCode) {
        const existingUser = await getUserByEmail(email);

        if (!existingUser || !existingUser.email || !existingUser.password) {
            return c.json({ error: 'Email and password combination is invalid' });
        }

        const codes = existingUser.otpBackups;

            let passed = false;
            let index = -1;
            for (const [i, code] of codes.entries()) {
                const doMatch = await compare(backupCode, code);

                if (doMatch) {
                    passed = true;
                    index = i;
                }
            }

            if (passed) {
                codes.splice(index, 1);
                await db.user.update({
                    where: { id: existingUser.id },
                    data: {
                        otpBackups: codes
                    }
                });
                const existingConfirmation =
                    await getTwoFactorConfirmationByUserId(existingUser.id);

                if (existingConfirmation) {
                    await db.twoFactorConfirmation.delete({
                        where: { id: existingConfirmation.id }
                    });
                }

                await db.twoFactorConfirmation.create({
                    data: {
                        userId: existingUser.id
                    }
                });

                return c.json({data: true})
            } else {
                return c.json({ error: 'Invalid backup code!' });
            }
    }
    return c.json({ error: 'No backup code attached' });

});

export default app;
