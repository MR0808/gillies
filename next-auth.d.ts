import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
    firstName: string;
    lastName: string;
    role: UserRole;
    otpEnabled: boolean;
    isOAuth: boolean;
    image: string | undefined;
};

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}
