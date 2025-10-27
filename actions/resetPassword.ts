'use server';

import * as z from 'zod';
import { hash } from 'bcrypt-ts';

import { EmailSchema, ResetPasswordSchema } from '@/schemas/auth';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';
import { getPasswordResetTokenByToken } from '@/data/passwordResetToken';
import db from '@/lib/db';

export const resetPassword = async (values: z.infer<typeof EmailSchema>) => {
    const validatedFields = EmailSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid emaiL!' };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    console.log('here');

    if (!existingUser) {
        return { success: 'Reset email sent!' };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: 'Reset email sent!' };
};

export const verifyPasswordToken = async (token: string) => {
    const existingToken = await getPasswordResetTokenByToken(token!);

    if (!existingToken) {
        return { error: 'Token does not exist' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'Email does not exist' };
    }

    return { success: 'Token Verified' };
};

export const updatePassword = async (
    values: z.infer<typeof ResetPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return { error: 'Missing token!' };
    }

    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: 'Invalid token!' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: 'Token has expired!' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'Email does not exist!' };
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

    return { success: 'Password updated' };
};

export const updatePasswordSettings = async (
    values: z.infer<typeof ResetPasswordSchema>,
    email: string
) => {
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: 'Email does not exist!' };
    }

    const hashedPassword = await hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashedPassword
        }
    });

    return { success: 'Password updated' };
};
