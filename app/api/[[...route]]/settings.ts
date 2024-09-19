import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { hash } from 'bcrypt-ts';

import db from '@/lib/db';
import {
    NameSchema,
    EmailSchema,
    ResetPasswordSchema
} from '@/schemas/settings';
import { getAuth } from './getAuth';
import { currentUser } from '@/lib/auth';
import { getUserById, getUserByEmail } from '@/data/user';
import { unstable_update as update } from '@/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

const app = new Hono()
    .patch('/name', getAuth, zValidator('json', NameSchema), async (c) => {
        const user = await currentUser();

        if (!user) {
            return c.json({ result: false, message: 'Unauthorized' });
        }

        const dbUser = await getUserById(user.id!);

        if (!dbUser) {
            return c.json({ result: false, message: 'Unauthorized' });
        }

        const values = c.req.valid('json');

        const validatedFields = NameSchema.safeParse(values);

        if (!validatedFields.success) {
            return c.json({ result: false, message: 'Invalid fields' });
        }

        const updatedUser = await db.user.update({
            where: { id: dbUser.id },
            data: {
                ...values
            }
        });

        update({
            user: {
                firstName: updatedUser.firstName as string,
                lastName: updatedUser.lastName as string
            }
        });

        return c.json({ result: true, message: 'Name updated' });
    })
    .patch(
        '/password',
        getAuth,
        zValidator('json', ResetPasswordSchema),
        async (c) => {
            const user = await currentUser();

            if (!user) {
                return c.json({ result: false, message: 'Unauthorized' });
            }

            const dbUser = await getUserById(user.id!);

            if (!dbUser) {
                return c.json({ result: false, message: 'Unauthorized' });
            }

            const values = c.req.valid('json');

            const validatedFields = ResetPasswordSchema.safeParse(values);

            if (!validatedFields.success) {
                return c.json({ result: false, message: 'Invalid fields!' });
            }

            const { password } = validatedFields.data;

            const hashedPassword = await hash(password, 10);

            await db.user.update({
                where: { id: dbUser.id },
                data: {
                    password: hashedPassword
                }
            });

            return c.json({ result: true, message: 'Password updated' });
        }
    )
    .patch('/email', getAuth, zValidator('json', EmailSchema), async (c) => {
        const user = await currentUser();

        if (!user) {
            return c.json({ result: false, message: 'Unauthorized' });
        }

        const dbUser = await getUserById(user.id!);

        if (!dbUser) {
            return c.json({ result: false, message: 'Unauthorized' });
        }

        const values = c.req.valid('json');

        const validatedFields = EmailSchema.safeParse(values);

        if (!validatedFields.success) {
            return c.json({ result: false, message: 'Invalid fields!' });
        }

        values.email = values.email.toLowerCase();

        const existingUser = await getUserByEmail(values.email);

        if (existingUser) {
            return c.json({ result: false, message: 'Email already in use!' });
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        const updatedUser = await db.user.update({
            where: { id: dbUser.id },
            data: {
                ...values,
                emailVerified: null
            }
        });

        update({
            user: {
                email: updatedUser.email as string
            }
        });

        return c.json({ result: true, message: 'Email updated' });
    });

export default app;
