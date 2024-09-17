'use server';

import * as OTPAuth from 'otpauth';

import { generateRecoveryCodes } from '@/lib/tokens';

export const generateQRCode = async (name: string) => {
    try {

        let secret = new OTPAuth.Secret({ size: 20 }).base32;
        let totp = new OTPAuth.TOTP({
            issuer: 'Wikibeerdia',
            label: name,
            algorithm: 'SHA1',
            digits: 6,
            secret
        });
        let otpurl = totp.toString();

        return { secret, otpurl };
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error('Internal Server Errors');
    }
}

type Props = {
    name: string;
    secret: string;
    token: string;

};

export const verifyQRCode = ({name, secret, token}: Props) => {
    try {

        let totp = new OTPAuth.TOTP({
            issuer: 'Wikibeerdia',
            label: name,
            algorithm: 'SHA1',
            digits: 6,
            secret
        });

        let delta = totp.validate({ token, window: 2 });

        if (delta === null) {
            return { result: false };
        }

        return { result: true };
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }

        throw new Error('Internal Server Errors');
    }
}


export const setupQRCode = async ({name, secret, token}: Props) => {
    try {

        const result = verifyQRCode({name, secret, token})
        
        if (!result) return {result: false}

        const { recoveryCodes, recoveryCodesHashed } =
            await generateRecoveryCodes();

        return {
            result: true,
            recoveryCodes,
            recoveryCodesHashed,
        };

    } catch (error) {
        console.log('error inside get route', error);
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }

        return new Response('Internal Server Errors', { status: 500 });
    }
}
