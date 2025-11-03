'use server';

import * as z from 'zod';
import { hash } from 'bcrypt-ts';
import db from '@/lib/db';

import { RegisterSchema } from '@/schemas/auth';
import { getUserByEmail } from '@/data/user';
import { getRegistrationTokenByToken } from '@/data/registrationToken';

export const registerVerification = async (token: string) => {
    try {
        if (!token) return { error: 'Missing token' };

        const existingToken = await getRegistrationTokenByToken(token);
        if (!existingToken) return { error: 'Token does not exist' };

        const existingUser = await getUserByEmail(existingToken.email);
        if (!existingUser) return { error: 'Email does not exist' };

        return { success: 'Token verified' };
    } catch (err) {
        return { error: 'Internal server error' };
    }
};

export const registerPassword = async (
    values: z.infer<typeof RegisterSchema>,
    token?: string | null
) => {
    try {
        if (!token) return { error: 'Missing token!' };

        const validated = RegisterSchema.safeParse(values);
        if (!validated.success) return { error: 'Invalid fields!' };

        const { password, email } = validated.data;

        // Look up token + user in parallel (Accelerate-safe)
        const [existingToken, user] = await Promise.all([
            getRegistrationTokenByToken(token),
            getUserByEmail(email)
        ]);

        if (!existingToken) return { error: 'Token does not exist!' };
        if (!user) return { error: 'Email does not exist!' };
        if (email !== existingToken.email) return { error: 'Invalid email' };

        // hash password client-side compatible for bcrypt-ts
        const hashedPassword = await hash(password, 10);

        // run all DB updates in one transaction
        await db.$transaction([
            db.account.updateMany({
                where: { userId: user.id },
                data: { password: hashedPassword }
            }),
            db.user.update({
                where: { id: user.id },
                data: { emailVerified: true }
            }),
            db.registrationToken.delete({
                where: { id: existingToken.id }
            })
        ]);

        return { success: 'Registration successful' };
    } catch (err) {
        console.error('[registerPassword]', err);
        return { error: 'Internal server error' };
    }
};
