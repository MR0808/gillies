import db from '@/lib/db';

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
