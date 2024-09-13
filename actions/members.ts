'use server';

import * as z from 'zod';

import db from '@/lib/db';
import { MemberSchema } from '@/schemas/members';
import { getUserByEmail } from '@/data/user';
import renderError from '@/lib/error';
import { generateRegistrationToken } from '@/lib/tokens';
import { sendRegistrationEmail } from '@/lib/mail';
import { getRegistrationTokenByEmail } from '@/data/registrationToken';

export const createMember = async (values: z.infer<typeof MemberSchema>) => {
    const validatedFields = MemberSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    let { firstName, lastName, email } = validatedFields.data;

    email = email.toLocaleLowerCase();
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: 'Email already in use!' };
    }

    await db.user.create({
        data: {
            firstName,
            lastName,
            email
        }
    });

    const registrationToken = await generateRegistrationToken(email);

    await sendRegistrationEmail(
        registrationToken.email,
        registrationToken.token
    );

    return {
        success: 'Member successfully registered'
    };
};
export const resendInvite = async (email: string) => {
    const registrationToken = await getRegistrationTokenByEmail(email);

    if (registrationToken) {
        await sendRegistrationEmail(
            registrationToken.email,
            registrationToken.token
        );
        return {
            success: 'Member successfully registered'
        };
    }

    return { error: 'No member found' };
};

export const fetchAllMembers = () => {
    return db.user.findMany({
        orderBy: {
            lastName: 'desc'
        }
    });
};
