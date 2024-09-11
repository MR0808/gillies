import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

import db from '@/lib/db';
import { getVerificationTokenByEmail } from '@/data/verificationToken';
import { getPasswordResetTokenByEmail } from '@/data/passwordResetToken';

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id }
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
};

export const generateRandomString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

export const generateRecoveryCodes = async () => {
    const recoveryCodes = [];
    const recoveryCodesHashed = [];
    for (let i = 0; i < 6; i++) {
        const recoveryCode = generateRandomString(6);
        let chars = [...recoveryCode];
        chars.splice(3, 0, '-');
        const hashedCode = await bcrypt.hash(recoveryCode, 12);
        recoveryCodes.push(chars.join(''));
        recoveryCodesHashed.push(hashedCode);
    }
    return { recoveryCodes, recoveryCodesHashed };
};
