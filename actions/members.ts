'use server';

import * as z from 'zod';
import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { MemberSchema, MemberImportSchema } from '@/schemas/members';
import { generateRegistrationToken } from '@/lib/tokens';
import { sendRegistrationEmail } from '@/lib/mail';
import { getRegistrationTokenById } from '@/data/registrationToken';
import { authCheckServer } from '@/lib/authCheck';

export const getMembers = async () => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    const data = await db.user.findMany({
        orderBy: [{ name: 'asc' }, { lastName: 'asc' }]
    });

    return { data };
};

export const getMembersFirstName = async () => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    const data = await db.user.findMany({
        orderBy: [{ name: 'asc' }, { lastName: 'asc' }]
    });

    return { data };
};

// export const getMember = async (id: string) => {
//     const userSession = await authCheckServer();

//     if (!userSession || userSession.user.role !== 'ADMIN') {
//         return { error: 'Not authorised' };
//     }

//     if (!id) {
//         return { error: 'Missing id!' };
//     }

//     const data = await db.user.findUnique({ where: { id } });

//     if (!data) {
//         return { error: 'Not found' };
//     }

//     return { data };
// };

export const createMember = async (values: z.infer<typeof MemberSchema>) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    const validatedFields = await MemberSchema.safeParseAsync(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    let { name, lastName, email } = validatedFields.data;

    email = email.toLocaleLowerCase();

    const data = await db.user.create({
        data: {
            name,
            lastName,
            email,
            emailVerified: false
        },
        select: {
            id: true,
            name: true,
            lastName: true,
            email: true
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    await db.account.create({
        data: {
            accountId: data.id,
            providerId: 'credential',
            userId: data.id
        }
    });

    const registrationToken = await generateRegistrationToken(email);

    await sendRegistrationEmail(
        registrationToken.email,
        registrationToken.token,
        data.name
    );

    revalidatePath('/dashboard/members');

    return { data };
};

export const createMembersFromCSV = async (csvContent: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    const lines = csvContent.trim().split('\n');

    if (lines.length < 2) {
        return { success: false, error: 'CSV file is empty or invalid' };
    }

    // Get headers and validate
    const headers = lines[0]
        .toLowerCase()
        .split(',')
        .map((h) => h.trim());
    const nameIndex = headers.indexOf('name');
    const lastNameIndex = headers.indexOf('lastname');
    const emailIndex = headers.indexOf('email');

    if (nameIndex === -1 || lastNameIndex === -1 || emailIndex === -1) {
        return {
            success: false,
            error: "CSV must contain 'name', 'lastname', and 'email' columns"
        };
    }

    const results = {
        total: 0,
        success: 0,
        failed: 0,
        errors: [] as string[]
    };

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue; // Skip empty lines

        results.total++;

        const values = line.split(',').map((v) => v.trim());
        const name = values[nameIndex];
        const lastName = values[lastNameIndex];
        const email = values[emailIndex];

        // Validate row data
        if (!name || !lastName || !email) {
            results.failed++;
            results.errors.push(`Row ${i + 1}: Missing required fields`);
            continue;
        }

        // Create user with default role USER and emailVerified false
        const userData = {
            name,
            lastName,
            email,
            role: 'USER' as const,
            emailVerified: false
        };

        try {
            // Mock: Create user and generate registration token
            const user = await db.user.create({
                data: {
                    name: userData.name,
                    lastName: userData.lastName,
                    email: userData.email,
                    role: userData.role,
                    emailVerified: false
                }
            });

            await db.account.create({
                data: {
                    accountId: user.id,
                    providerId: 'credential',
                    userId: user.id
                }
            });

            const registrationToken = await generateRegistrationToken(email);

            await sendRegistrationEmail(
                registrationToken.email,
                registrationToken.token,
                user.name
            );

            results.success++;
        } catch (error) {
            results.failed++;
            results.errors.push(
                `Row ${i + 1} (${email}): Failed to create user`
            );
        }
    }

    revalidatePath('/dashboard/members');

    return {
        success: true,
        results
    };
};

export const updateMember = async (
    values: z.infer<typeof MemberSchema>,
    id: string
) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!id) {
        return { error: 'Missing id!' };
    }

    const validatedFields = await MemberSchema.safeParseAsync(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    let { name, lastName, email, role } = validatedFields.data;

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
            name,
            lastName,
            email,
            role
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    revalidatePath('/dashboard/members');

    return { data };
};

export const resendInvite = async (id: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!id) {
        return { error: 'Missing id!' };
    }

    const registrationToken = await getRegistrationTokenById(id);

    if (!registrationToken) {
        return { error: 'Not found' };
    }

    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
        return { error: 'Not found' };
    }

    await sendRegistrationEmail(
        registrationToken.email,
        registrationToken.token,
        user.name
    );

    return { success: registrationToken };
};

export const deleteMember = async (id: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

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
