'use server';

import * as z from 'zod';
import { auth, ErrorCode } from '@/lib/auth';
import { headers } from 'next/headers';
import { APIError } from 'better-auth/api';

import db from '@/lib/db';
import { LoginSchema } from '@/schemas/auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { email, password, rememberMe } = validatedFields.data;
    try {
        const reqHeaders = await headers();
        const data = await auth.api.signInEmail({
            headers: reqHeaders,
            body: {
                email,
                password,
                rememberMe
            }
        });

        return {
            error: null,
            emailVerified: data.user.emailVerified
        };
    } catch (err: any) {
        if (err instanceof APIError) {
            const code = err.body?.code as ErrorCode | undefined;
            return {
                error:
                    code === 'INVALID_EMAIL_OR_PASSWORD'
                        ? 'Invalid email or password'
                        : err.message || 'Authentication failed'
            };
        }

        console.error('[login]', err);
        return { error: 'Internal Server Error' };
    }
};

export const getUserIdfromToken = async (token: string) => {
    if (!token) return { data: null, error: true };

    try {
        const verification = await db.verification.findFirst({
            where: { identifier: `reset-password:${token}` },
            select: { value: true } // ✅ only fetch what you need
        });

        // --- Step 2: Return safe response
        if (!verification) {
            return { data: null, error: true };
        }

        return { data: verification.value, error: false };
    } catch (error) {
        return { data: null, error: true };
    }
};
