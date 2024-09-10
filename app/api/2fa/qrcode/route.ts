'use server';

import * as OTPAuth from 'otpauth';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
    try {
        const data = await req.json();
        const { name } = data;

        let secret = new OTPAuth.Secret({ size: 20 }).base32;
        let totp = new OTPAuth.TOTP({
            issuer: 'Wikibeerdia',
            label: name,
            algorithm: 'SHA1',
            digits: 6,
            secret
        });
        let otpurl = totp.toString();

        return Response.json({ secret, otpurl });
    } catch (error) {
        console.log('error inside get route', error);
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }

        return new Response('Internal Server Errors', { status: 500 });
    }
}
