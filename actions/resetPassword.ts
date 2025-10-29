'use server';

import { getUserById } from '@/data/user';
import db from '@/lib/db';

export const verifyPasswordToken = async (token: string) => {
    const existingToken = await db.verification.findFirst({
        where: { identifier: `reset-password:${token}` }
    });

    if (!existingToken) {
        return false;
    }

    const hasExpired = new Date(existingToken.expiresAt) < new Date();

    if (hasExpired) {
        return false;
    }

    const existingUser = await getUserById(existingToken.value);

    if (!existingUser) {
        return false;
    }

    return true;
};
