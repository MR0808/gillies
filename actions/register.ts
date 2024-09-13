'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import db from '@/lib/db';
import { getRegistrationTokenByToken } from '@/data/registrationToken';
import { getUserByEmail } from '@/data/user';
import { RegisterSchema } from '@/schemas/auth';

export const verifyRegistration = async (token: string) => {
    const existingToken = await getRegistrationTokenByToken(token);

    if (!existingToken) {
        return { error: 'Token does not exist!' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'Email does not exist!' };
    }

    return { success: 'Token verified!' };
};

export const register = async (
    values: z.infer<typeof RegisterSchema>,
    token: string | null
) => {
    if (!token) return { error: 'Token does not exist!' };

    const existingToken = await getRegistrationTokenByToken(token);

    if (!existingToken) {
        return { error: 'Token does not exist!' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'Email does not exist!' };
    }

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    let { email, password } = validatedFields.data;

    if (email !== existingToken.email) return { error: 'Invalid email!' };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
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

    return {
        success: 'Registration successful, please login to set up your account.'
    };
};
