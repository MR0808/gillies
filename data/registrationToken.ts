import db from '@/lib/db';
import { getUserById } from './user';

export const getRegistrationTokenByToken = async (token: string) => {
    try {
        const registrationToken = await db.registrationToken.findUnique({
            where: { token }
        });

        return registrationToken;
    } catch {
        return null;
    }
};

export const getRegistrationTokenByEmail = async (email: string) => {
    try {
        const registrationToken = await db.registrationToken.findFirst({
            where: { email }
        });

        return registrationToken;
    } catch {
        return null;
    }
};

export const getRegistrationTokenById = async (id: string) => {
    try {
        const user = await getUserById(id);
        if (user?.email) {
            const registrationToken = await db.registrationToken.findFirst({
                where: { email: user?.email }
            });
            return registrationToken;
        }
        return null;
    } catch {
        return null;
    }
};
