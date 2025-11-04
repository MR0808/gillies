'use server';

import * as z from 'zod';
import { revalidatePath, unstable_cache } from 'next/cache';

import db from '@/lib/db';
import { MemberSchema } from '@/schemas/members';
import { generateRegistrationToken } from '@/lib/tokens';
import { sendRegistrationEmail } from '@/lib/mail';
import { getRegistrationTokenById } from '@/data/registrationToken';
import { authCheckServer } from '@/lib/authCheck';
import { TAGS } from '@/cache/tags';
import { revalidateMembers } from '@/cache/revalidate';

async function requireAdmin() {
    const session = await authCheckServer();
    if (!session || session.user.role !== 'ADMIN') {
        return { ok: false, error: { error: 'Not authorised' } };
    }
    return { ok: true };
}

export async function getMembers() {
    // ✅ 1️⃣ Do dynamic auth *outside* the cache
    const session = await authCheckServer();
    if (!session || session.user.role !== 'ADMIN') {
        return { data: null, error: 'Not authorised' };
    }

    // ✅ 2️⃣ Define the pure cached query (no headers/cookies here)
    const cachedFn = unstable_cache(
        async () => {
            const users = await db.user.findMany({
                orderBy: [{ name: 'asc' }, { lastName: 'asc' }],
                select: {
                    id: true,
                    name: true,
                    lastName: true,
                    email: true,
                    role: true,
                    emailVerified: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            return { data: users };
        },
        ['members-list'], // cache key
        {
            revalidate: 120, // refresh every 2 minutes
            tags: [TAGS.members]
        }
    );

    // ✅ 3️⃣ Call and return cached data
    return cachedFn();
}

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
    const auth = await requireAdmin();
    if (!auth.ok) return { error: auth.error || 'Not authorised' };

    const validated = MemberSchema.safeParse(values);
    if (!validated.success) return { error: 'Invalid fields!' };

    const { name, lastName } = validated.data;
    const email = validated.data.email.toLowerCase();

    try {
        // ✅ run user + account creation atomically
        const [user, registrationToken] = await db.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    name,
                    lastName,
                    email,
                    emailVerified: false
                },
                select: { id: true, name: true, lastName: true, email: true }
            });

            await tx.account.create({
                data: {
                    accountId: newUser.id,
                    providerId: 'credential',
                    userId: newUser.id
                }
            });

            const token = await generateRegistrationToken(email);
            return [newUser, token];
        });

        await sendRegistrationEmail(
            registrationToken.email,
            registrationToken.token,
            user.name
        );

        revalidateMembers();
        return { data: user };
    } catch (err) {
        console.error('[createMember]', err);
        return { error: 'Internal server error' };
    }
};

export const createMembersFromCSV = async (csvContent: string) => {
    const auth = await requireAdmin();
    if (!auth.ok) return { error: auth.error || 'Not authorised' };

    const lines = csvContent.trim().split('\n');
    if (lines.length < 2)
        return { success: false, error: 'CSV file empty or invalid' };

    const headers = lines[0]
        .toLowerCase()
        .split(',')
        .map((h) => h.trim());
    const nameIndex = headers.indexOf('name');
    const lastNameIndex = headers.indexOf('lastname');
    const emailIndex = headers.indexOf('email');

    if (nameIndex < 0 || lastNameIndex < 0 || emailIndex < 0)
        return {
            success: false,
            error: "CSV must contain 'name','lastname','email' columns"
        };

    const results = { total: 0, success: 0, failed: 0, errors: [] as string[] };

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        results.total++;
        const values = line.split(',').map((v) => v.trim());
        const [name, lastName, emailRaw] = [
            values[nameIndex],
            values[lastNameIndex],
            values[emailIndex]
        ];
        const email = emailRaw?.toLowerCase();

        if (!name || !lastName || !email) {
            results.failed++;
            results.errors.push(`Row ${i + 1}: Missing required fields`);
            continue;
        }

        try {
            await db.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        name,
                        lastName,
                        email,
                        role: 'USER',
                        emailVerified: false
                    }
                });
                await tx.account.create({
                    data: {
                        accountId: user.id,
                        providerId: 'credential',
                        userId: user.id
                    }
                });

                const token = await generateRegistrationToken(email);
                await sendRegistrationEmail(
                    token.email,
                    token.token,
                    user.name
                );
            });

            results.success++;
        } catch (err) {
            results.failed++;
            results.errors.push(
                `Row ${i + 1} (${email}): ${err instanceof Error ? err.message : 'Failed'}`
            );
        }
    }

    revalidateMembers();
    return { success: true, results, error: null };
};

export const updateMember = async (
    values: z.infer<typeof MemberSchema>,
    id: string
) => {
    const auth = await requireAdmin();
    if (!auth.ok) return { error: auth.error || 'Not authorised' };
    if (!id) return { error: 'Missing id!' };

    const validated = MemberSchema.safeParse(values);
    if (!validated.success) return { error: 'Invalid fields!' };

    const { name, lastName, role } = validated.data;
    const email = validated.data.email.toLowerCase();

    try {
        const current = await db.user.findUnique({
            where: { id },
            select: { email: true }
        });
        if (!current) return { error: 'User not found' };

        if (email !== current.email) {
            const exists = await db.user.findUnique({ where: { email } });
            if (exists) return { error: 'Email address already in use' };
        }

        const user = await db.user.update({
            where: { id },
            data: { name, lastName, email, role }
        });

        revalidateMembers();
        return { data: user };
    } catch (err) {
        return { error: 'Internal server error' };
    }
};

// --------------------------------------------
//  resendInvite
// --------------------------------------------
export const resendInvite = async (id: string) => {
    const auth = await requireAdmin();
    if (!auth.ok) return { error: auth.error || 'Not authorised' };
    if (!id) return { error: 'Missing id!' };

    try {
        const registrationToken = await getRegistrationTokenById(id);
        if (!registrationToken) return { error: 'Not found' };

        const user = await db.user.findUnique({ where: { id } });
        if (!user) return { error: 'Not found' };

        await sendRegistrationEmail(
            registrationToken.email,
            registrationToken.token,
            user.name
        );
        return { success: true };
    } catch (err) {
        return { error: 'Internal server error' };
    }
};

// --------------------------------------------
//  deleteMember
// --------------------------------------------
export const deleteMember = async (id: string) => {
    const auth = await requireAdmin();
    if (!auth.ok) return { error: auth.error || 'Not authorised' };
    if (!id) return { error: 'Missing id!' };

    try {
        const deleted = await db.user.delete({ where: { id } });
        revalidateMembers();
        return { data: deleted };
    } catch (err) {
        return { error: 'Internal server error' };
    }
};
