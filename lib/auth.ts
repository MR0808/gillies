import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { UserRole } from '@/generated/prisma/client';;
import { customSession, openAPI } from 'better-auth/plugins';

import db from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/argon2';
import { sendResetEmail, sendVerificationEmail } from '@/lib/mail';

const baseURL =
    process.env.BETTER_AUTH_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'http://localhost:3000';

const options = {
    baseURL,
    database: prismaAdapter(db, {
        provider: 'postgresql' // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        password: {
            hash: hashPassword,
            verify: verifyPassword
        },
        autoSignIn: false,
        requireEmailVerification: false,
        sendResetPassword: async ({ user, url }) => {
            await sendResetEmail({
                email: user.email,
                link: url,
                name: user.name
            });
        }
    },
    advanced: {
        database: {
            generateId: false
        }
    },
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailVerification: async (
                { user, newEmail, url, token },
                request
            ) => {
                // await sendVerificationEmail({
                //     email: newEmail,
                //     otp: token,
                //     name: user.name
                // });
            }
        },
        additionalFields: {
            lastName: {
                type: 'string',
                required: true
            },
            role: {
                type: ['USER', 'ADMIN'] as Array<UserRole>
            },
            emailVerified: {
                type: 'boolean',
                required: false
            }
        }
    },
    session: {
        expiresIn: 30 * 24 * 60 * 60,
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60
        }
    },
    account: {
        accountLinking: {
            enabled: false
        }
    },
    plugins: [nextCookies()]
} satisfies BetterAuthOptions;

export const auth = betterAuth({
    ...options,
    plugins: [
        ...(options.plugins ?? []),
        customSession(async ({ user, session }, ctx) => {
            return {
                session,
                user
            };
        }, options),
        openAPI()
    ]
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | 'UNKNOWN';
