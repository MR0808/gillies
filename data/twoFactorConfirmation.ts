import db from '@/lib/db';

const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique(
            {
                where: { userId }
            }
        );

        return twoFactorConfirmation;
    } catch {
        return null;
    }
};

export default getTwoFactorConfirmationByUserId