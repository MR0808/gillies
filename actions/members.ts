'use server';

import * as z from 'zod';
import { revalidatePath } from 'next/cache';

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
    try {
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
    } catch (error) {
        console.log(error);
        return { error: 'An error occurred!' };
    }
};

export const resendInvite = async (id: string) => {
    try {
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
    } catch (error) {
        console.log(error);
        return { error: 'An error occurred!' };
    }
};

export const fetchAllMembers = async () => {
    try {
        return await db.user.findMany({
            orderBy: {
                lastName: 'asc'
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteMember = async (id: string) => {
    try {
        await db.user.delete({
            where: {
                id
            }
        });
        revalidatePath('/dashboard/members');
    } catch (error) {
        console.log(error);
    }
};

export const updateMember = async (
    values: z.infer<typeof MemberSchema>,
    id: string
) => {
    const validatedFields = MemberSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    try {
        await db.user.update({
            where: {
                id
            },
            data: {
                ...values
            }
        });

        return {
            success: 'Member successfully updated'
        };
    } catch (error) {
        console.log(error);
        return { error: 'An error occurred!' };
    }
};
