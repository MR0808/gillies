'use server';

import { getUserById } from '@/data/user';
import db from '@/lib/db';

export const verifyPasswordToken = async (token: string) => {
    try {
        if (!token) {
            return { valid: false, reason: 'Missing token' };
        }

        // Find verification token record
        const existingToken = await db.verification.findFirst({
            where: { identifier: `reset-password:${token}` },
            select: { id: true, value: true, expiresAt: true }
        });

        if (!existingToken) {
            return { valid: false, reason: 'Token not found' };
        }

        // Expiration check
        const now = Date.now();
        if (new Date(existingToken.expiresAt).getTime() < now) {
            return { valid: false, reason: 'Token expired' };
        }

        // Lookup user linked to token value
        const user = await getUserById(existingToken.value);
        if (!user) {
            return { valid: false, reason: 'User not found' };
        }

        // ✅ Everything checks out
        return { valid: true, reason: null, userId: user.id };
    } catch (err) {
        return { valid: false, reason: 'Internal server error' };
    }
};
