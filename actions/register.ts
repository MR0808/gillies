'use server';

import * as z from 'zod';
import { compare, hash } from 'bcrypt-ts';
import db from '@/lib/db';

import { RegisterSchema } from '@/schemas/auth';
import { getUserByEmail } from '@/data/user';
import { getRegistrationTokenByToken } from '@/data/registrationToken';

export const registerVerification = async (token: string) => {
    const existingToken = await getRegistrationTokenByToken(token);

    if (!existingToken) {
        return {
            error: 'Token does not exist'
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'Email does not exist' };
    }

    return { success: 'Token Verified' };
};

export const registerPassword = async (
    values: z.infer<typeof RegisterSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: 'Missing token!' };
    }

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { password, email } = validatedFields.data;

    const existingToken = await getRegistrationTokenByToken(token);

    if (!existingToken) {
        return { error: 'Token does not exist!' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'Email does not exist!' };
    }

    if (email !== existingToken.email) return { error: 'Invalid email' };

    const hashedPassword = await hash(password, 10);

    await db.account.updateMany({
        where: { userId: existingUser.id },
        data: {
            password: hashedPassword
        }
    });

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: true
        }
    });

    await db.registrationToken.delete({
        where: { id: existingToken.id }
    });

    return { success: 'Registration successful' };
};
