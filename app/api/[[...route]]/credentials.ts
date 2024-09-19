import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import * as OTPAuth from 'otpauth';
import { AuthError } from 'next-auth';
import { compare, hash } from 'bcrypt-ts';
import db from '@/lib/db';

import { signIn } from '@/auth';
import {
    LoginSchema,
    RegisterSchema,
    EmailSchema,
    ResetPasswordSchema
} from '@/schemas/auth';
import { getUserByEmail } from '@/data/user';
import {
    sendVerificationEmail,
    sendRegistrationEmail,
    sendPasswordResetEmail
} from '@/lib/mail';
import {
    generateVerificationToken,
    generatePasswordResetToken
} from '@/lib/tokens';
import getTwoFactorConfirmationByUserId from '@/data/twoFactorConfirmation';
import {
    getRegistrationTokenByEmail,
    getRegistrationTokenByToken
} from '@/data/registrationToken';
import { getPasswordResetTokenByToken } from '@/data/passwordResetToken';
import { getVerificationTokenByToken } from '@/data/verificationToken';

const app = new Hono()
    .post('/login', zValidator('json', LoginSchema), async (c) => {
        let { email, password } = c.req.valid('json');

        const existingUser = await getUserByEmail(email);

        if (!existingUser || !existingUser.email || !existingUser.password) {
            return c.json({
                result: false,
                message: 'Email and password combination is invalid',
                twoFactorEnabled: false
            });
        }

        if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(
                existingUser.email
            );

            await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token
            );

            return c.json({
                result: false,
                message: 'Email not verified. New confirmation email sent!',
                twoFactorEnabled: false
            });
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

            return c.json({
                result: false,
                message:
                    'Please click the link you were sent to confirm your registration',
                twoFactorEnabled: false
            });
        }

        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false
            });
        } catch (error) {
            console.log(error);
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                        return c.json({
                            result: false,
                            message:
                                'Email and password combination is invalid',
                            twoFactorEnabled: false
                        });
                    default:
                        return c.json(
                            {
                                result: false,
                                message: 'Something went wrong',
                                twoFactorEnabled: false
                            },
                            418
                        );
                }
            }
        }

        return c.json({
            result: true,
            twoFactorEnabled: existingUser.otpEnabled,
            message: 'User logged in'
        });
    })
    .post('/token', zValidator('json', LoginSchema), async (c) => {
        let { email, token } = c.req.valid('json');
        if (token) {
            const existingUser = await getUserByEmail(email);

            if (
                !existingUser ||
                !existingUser.email ||
                !existingUser.password
            ) {
                return c.json({
                    result: false,
                    message: 'Email and password combination is invalid'
                });
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
                return c.json({ result: false, message: 'Invalid code!' });
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

            return c.json({ result: false, message: 'Token accepted' });
        }
        return c.json({ result: false, message: 'No token attached' });
    })
    .post('/backup', zValidator('json', LoginSchema), async (c) => {
        let { email, backupCode } = c.req.valid('json');

        if (backupCode) {
            const existingUser = await getUserByEmail(email);

            if (
                !existingUser ||
                !existingUser.email ||
                !existingUser.password
            ) {
                return c.json({
                    result: false,
                    message: 'Email and password combination is invalid'
                });
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

                return c.json({
                    result: true,
                    message: 'Backup code accepted'
                });
            } else {
                return c.json({
                    result: false,
                    message: 'Invalid backup code!'
                });
            }
        }
        return c.json({ result: false, message: 'No backup code attached' });
    })
    .get(
        '/register/:token',
        zValidator(
            'param',
            z.object({
                token: z.string().optional()
            })
        ),
        async (c) => {
            const { token } = c.req.valid('param');
            const existingToken = await getRegistrationTokenByToken(token!);

            if (!existingToken) {
                return c.json({
                    result: false,
                    message: 'Token does not exist'
                });
            }

            const existingUser = await getUserByEmail(existingToken.email);

            if (!existingUser) {
                return c.json({
                    result: false,
                    message: 'Email does not exist'
                });
            }

            return c.json({ result: true, message: 'Token Verified' });
        }
    )
    .patch(
        '/register/:token',
        zValidator('param', z.object({ token: z.string().optional() })),
        zValidator('json', RegisterSchema),
        async (c) => {
            const { token } = c.req.valid('param');
            let { password, email } = c.req.valid('json');

            if (!token)
                return c.json({
                    result: false,
                    message: 'Token does not exist!'
                });

            const existingToken = await getRegistrationTokenByToken(token);

            if (!existingToken) {
                return c.json({
                    result: false,
                    message: 'Token does not exist!'
                });
            }

            const existingUser = await getUserByEmail(existingToken.email);

            if (!existingUser) {
                return c.json({
                    result: false,
                    message: 'Email does not exist!'
                });
            }

            if (email !== existingToken.email)
                return c.json({ result: false, message: 'Invalid email' });

            const hashedPassword = await hash(password, 10);

            const data = await db.user.update({
                where: { id: existingUser.id },
                data: {
                    emailVerified: new Date(),
                    registered: true,
                    password: hashedPassword
                }
            });

            await db.registrationToken.delete({
                where: { id: existingToken.id }
            });

            return c.json({ result: true, message: 'Registration successful' });
        }
    )
    .post('/reset', zValidator('json', EmailSchema), async (c) => {
        let values = c.req.valid('json');

        const validatedFields = EmailSchema.safeParse(values);

        if (!validatedFields.success) {
            return c.json({ result: false, message: 'Invalid email!' });
        }

        const { email } = validatedFields.data;

        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            return c.json({ result: false, message: 'Invalid email!' });
        }

        const passwordResetToken = await generatePasswordResetToken(email);
        await sendPasswordResetEmail(
            passwordResetToken.email,
            passwordResetToken.token
        );

        return c.json({ result: true, message: 'Reset email sent!' });
    })
    .get(
        '/updatepassword/:token',
        zValidator(
            'param',
            z.object({
                token: z.string().optional()
            })
        ),
        async (c) => {
            const { token } = c.req.valid('param');
            const existingToken = await getPasswordResetTokenByToken(token!);

            if (!existingToken) {
                return c.json({
                    result: false,
                    message: 'Token does not exist'
                });
            }

            const hasExpired = new Date(existingToken.expires) < new Date();

            if (hasExpired) {
                return c.json({
                    result: false,
                    message: 'Token has expired'
                });
            }

            const existingUser = await getUserByEmail(existingToken.email);

            if (!existingUser) {
                return c.json({
                    result: false,
                    message: 'Email does not exist'
                });
            }

            return c.json({ result: true, message: 'Token Verified' });
        }
    )
    .patch(
        '/updatepassword/:token',
        zValidator('param', z.object({ token: z.string().optional() })),
        zValidator('json', ResetPasswordSchema),
        async (c) => {
            const { token } = c.req.valid('param');
            let values = c.req.valid('json');

            if (!token)
                return c.json({
                    result: false,
                    message: 'Token does not exist!'
                });

            const validatedFields = ResetPasswordSchema.safeParse(values);

            if (!validatedFields.success) {
                return c.json({
                    result: false,
                    message: 'Invalid fields!'
                });
            }

            const { password } = validatedFields.data;

            const existingToken = await getPasswordResetTokenByToken(token);

            if (!existingToken) {
                return c.json({
                    result: false,
                    message: 'Invalid token!'
                });
            }

            const hasExpired = new Date(existingToken.expires) < new Date();

            if (hasExpired) {
                return c.json({
                    result: false,
                    message: 'Token has expired!'
                });
            }

            const existingUser = await getUserByEmail(existingToken.email);

            if (!existingUser) {
                return c.json({
                    result: false,
                    message: 'Email does not exist!'
                });
            }

            const hashedPassword = await hash(password, 10);

            await db.user.update({
                where: { id: existingUser.id },
                data: {
                    password: hashedPassword
                }
            });

            await db.passwordResetToken.delete({
                where: { id: existingToken.id }
            });

            return c.json({ result: true, message: 'Password updated' });
        }
    )
    .get(
        '/verification/:token',
        zValidator(
            'param',
            z.object({
                token: z.string().optional()
            })
        ),
        async (c) => {
            const { token } = c.req.valid('param');
            const existingToken = await getVerificationTokenByToken(token!);

            if (!existingToken) {
                return c.json({
                    result: false,
                    message: 'Token does not exist'
                });
            }

            const hasExpired = new Date(existingToken.expires) < new Date();

            if (hasExpired) {
                return c.json({
                    result: false,
                    message: 'Token has expired'
                });
            }

            const existingUser = await getUserByEmail(existingToken.email);

            if (!existingUser) {
                return c.json({
                    result: false,
                    message: 'Email does not exist'
                });
            }

            await db.user.update({
                where: { id: existingUser.id },
                data: {
                    emailVerified: new Date(),
                    email: existingToken.email
                }
            });

            await db.verificationToken.delete({
                where: { id: existingToken.id }
            });

            return c.json({ result: true, message: 'Token Verified' });
        }
    );

export default app;
