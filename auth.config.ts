import { compare } from 'bcrypt-ts';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { UserRole } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

import db from './lib/db';
import { LoginSchema } from '@/schemas/auth';
import { getUserByEmail } from '@/data/user';
import { getUserById } from '@/data/user';
import { getAccountByUserId } from '@/data/account';
import getTwoFactorConfirmationByUserId from '@/data/twoFactorConfirmation';

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    const validatedFields = LoginSchema.safeParse(credentials);

                    if (validatedFields.success) {
                        const { email, password } = validatedFields.data;

                        const user = await getUserByEmail(email);
                        if (!user || !user.password) return null;

                        const passwordsMatch = await compare(
                            password,
                            user.password
                        );

                        if (passwordsMatch) return user;
                    }
                    return null;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/error'
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            });
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== 'credentials') return true;

            const existingUser = await getUserById(user.id!);

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false;

            if (existingUser.otpEnabled) {
                const twoFactorConfirmation =
                    await getTwoFactorConfirmationByUserId(existingUser.id);

                if (!twoFactorConfirmation) return false;

                // Delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            }

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (token.firstName && session.user) {
                session.user.firstName = token.firstName as string;
            }

            if (token.lastName && session.user) {
                session.user.lastName = token.lastName as string;
            }

            if (session.user) {
                session.user.otpEnabled = token.otpEnabled as boolean;
            }

            if (session.user) {
                session.user.email = token.email!;
                session.user.image = token.image as string;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.firstName = (existingUser.firstName as string) || '';
            token.lastName = (existingUser.lastName as string) || '';
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.image = existingUser.image;
            token.otpEnabled = existingUser.otpEnabled;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' }
} satisfies NextAuthConfig;
