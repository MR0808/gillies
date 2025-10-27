'use server';

import * as z from 'zod';
import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import checkAuth from '@/utils/checkAuth';
import {
    MemberSchema,
    MemberImportSchema,
    MemberUpdateSchema
} from '@/schemas/members';
import { generateRegistrationToken } from '@/lib/tokens';
import { sendRegistrationEmail } from '@/lib/mail';
import { getRegistrationTokenById } from '@/data/registrationToken';

export const getMembers = async () => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    const data = await db.user.findMany({
        orderBy: {
            lastName: 'asc'
        }
    });

    return { data };
};

export const getMember = async (id: string) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!id) {
        return { error: 'Missing id!' };
    }

    const data = await db.user.findUnique({ where: { id } });

    if (!data) {
        return { error: 'Not found' };
    }

    return { data };
};

export const createMember = async (values: z.infer<typeof MemberSchema>) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    const validatedFields = await MemberSchema.safeParseAsync(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    let { firstName, lastName, email } = validatedFields.data;

    email = email.toLocaleLowerCase();

    const data = await db.user.create({
        data: {
            firstName,
            lastName,
            email
        },
        select: {
            firstName: true,
            lastName: true,
            email: true
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    const registrationToken = await generateRegistrationToken(email);

    await sendRegistrationEmail(
        registrationToken.email,
        registrationToken.token
    );

    revalidatePath('/dashboard/members');

    return { data };
};

export const createMembers = async (
    values: z.infer<typeof MemberImportSchema>
) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    const validatedFields = MemberImportSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const emails = await db.user.findMany({ select: { email: true } });
    const list = emails.map((email) => {
        return email.email;
    });

    const upload = values.filter(
        (member) => list.includes(member.email) === false
    );

    const data = await db.user.createMany({
        data: upload
    });

    if (!data) {
        return { error: 'Not found' };
    }

    upload.forEach(async (member) => {
        const registrationToken = await generateRegistrationToken(member.email);

        await sendRegistrationEmail(
            registrationToken.email,
            registrationToken.token
        );
    });

    revalidatePath('/dashboard/members');

    return { data };
};

export const updateMember = async (
    values: z.infer<typeof MemberUpdateSchema>,
    id: string
) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!id) {
        return { error: 'Missing id!' };
    }

    const validatedFields = await MemberUpdateSchema.safeParseAsync(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    let { firstName, lastName, email } = validatedFields.data;

    email = email.toLocaleLowerCase();

    const currentUser = await db.user.findUnique({
        where: { id },
        select: { email: true }
    });

    if (!currentUser) {
        return { error: 'User does not exist' };
    }

    if (email && email !== currentUser.email) {
        // Check if the new email already exists in the database
        const existingUser = await db.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { error: 'Email address already in use' };
        }
    }

    const data = await db.user.update({
        where: {
            id
        },
        data: {
            firstName,
            lastName,
            email
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    revalidatePath('/dashboard/members');

    return { data };
};

export const resendInvite = async (id: string) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!id) {
        return { error: 'Missing id!' };
    }

    const registrationToken = await getRegistrationTokenById(id);

    if (!registrationToken) {
        return { error: 'Not found' };
    }

    await sendRegistrationEmail(
        registrationToken.email,
        registrationToken.token
    );

    return { success: registrationToken };
};

export const deleteMember = async (id: string) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!id) {
        return { error: 'Missing id!' };
    }

    const data = await db.user.delete({
        where: {
            id
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    revalidatePath('/dashboard/members');

    return { data };
};
