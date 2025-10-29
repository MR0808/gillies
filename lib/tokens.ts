import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt-ts';

import db from '@/lib/db';
import { getRegistrationTokenByEmail } from '@/data/registrationToken';

export const generateRegistrationToken = async (email: string) => {
    const token = uuidv4();

    const existingToken = await getRegistrationTokenByEmail(email);

    if (existingToken) {
        await db.registrationToken.delete({
            where: {
                id: existingToken.id
            }
        });
    }

    const registrationToken = await db.registrationToken.create({
        data: {
            email,
            token
        }
    });

    return registrationToken;
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
        const hashedCode = await hash(recoveryCode, 12);
        recoveryCodes.push(chars.join(''));
        recoveryCodesHashed.push(hashedCode);
    }
    return { recoveryCodes, recoveryCodesHashed };
};
