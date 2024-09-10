import NextAuth, { User } from 'next-auth';
import { UserRole } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

import db from './lib/db';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { getAccountByUserId } from '@/data/account';
import getTwoFactorConfirmationByUserId from '@/data/twoFactorConfirmation';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    unstable_update
} = NextAuth({
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
    session: { strategy: 'jwt' },
    ...authConfig
});
