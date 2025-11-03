'use server';

import * as z from 'zod';
import { revalidatePath, unstable_cache } from 'next/cache';

import db from '@/lib/db';
import { CreateMeetingSchema, UpdateMeetingSchema } from '@/schemas/meetings';
import { authCheckServer } from '@/lib/authCheck';
import { TAGS } from '@/cache/tags';
import {
    revalidateMeetingsList,
    revalidateMeeting,
    revalidateMeetingResults
} from '@/cache/revalidate';

type UserWithMeetings = {
    id: string;
    name: string;
    lastName: string;
    email: string;
    image: string | null;
    emailVerified: boolean;
    role: 'ADMIN' | 'USER';
    createdAt: Date;
    updatedAt: Date;
    meetings: { id: string }[];
};

const requireAdmin = async () => {
    const session = await authCheckServer();
    if (!session || session.user.role !== 'ADMIN') {
        return { ok: false, error: { error: 'Not authorised' } };
    }
    return { ok: true };
};

// export const getAllMeetings = async () => {
//     try {
//         const meetings = await db.meeting.findMany({
//             select: { id: true },
//             orderBy: { date: 'asc' }
//         });
//         return { data: meetings };
//     } catch (err) {
//         return { error: 'Internal server error' };
//     }
// };

export const getAllMeetings = unstable_cache(
    async () => {
        try {
            const meetings = await db.meeting.findMany({
                select: { id: true },
                orderBy: { date: 'asc' }
            });
            return { data: meetings };
        } catch (err) {
            console.error('[getAllMeetings]', err);
            return { error: 'Internal server error' };
        }
    },
    ['all-meetings'],
    { revalidate: 120, tags: [TAGS.meetings] }
);

// export const getMeetings = async () => {
//     unstable_cache(
//         async () => {
//             const auth = await requireAdmin();
//             if (!auth.ok) return auth.error;

//             try {
//                 const meetings = await db.meeting.findMany({
//                     orderBy: { date: 'asc' },
//                     select: {
//                         id: true,
//                         date: true,
//                         location: true,
//                         quaich: true,
//                         status: true
//                     }
//                 });

//                 if (!meetings.length) return { data: [] };
//                 const meetingIds = meetings.map((m) => m.id);

//                 // Parallelised related fetches (Accelerate-safe)
//                 const [whiskies, users] = await Promise.all([
//                     db.whisky.findMany({
//                         where: { meetingId: { in: meetingIds } },
//                         orderBy: { order: 'asc' },
//                         select: {
//                             id: true,
//                             name: true,
//                             image: true,
//                             description: true,
//                             order: true,
//                             meetingId: true,
//                             quaich: true
//                         }
//                     }),
//                     db.user.findMany({
//                         where: {
//                             meetings: { some: { id: { in: meetingIds } } }
//                         },
//                         orderBy: [{ lastName: 'asc' }, { name: 'asc' }],
//                         select: {
//                             id: true,
//                             name: true,
//                             lastName: true,
//                             email: true,
//                             image: true,
//                             emailVerified: true,
//                             role: true,
//                             createdAt: true,
//                             updatedAt: true,
//                             meetings: { select: { id: true } }
//                         }
//                     }) as unknown as UserWithMeetings[]
//                 ]);

//                 const data = meetings.map((meeting) => ({
//                     ...meeting,
//                     whiskies: whiskies.filter(
//                         (w) => w.meetingId === meeting.id
//                     ),
//                     users: users
//                         .filter((u) =>
//                             u.meetings.some((m) => m.id === meeting.id)
//                         )
//                         .map(({ meetings, ...rest }) => rest)
//                 }));

//                 return { data };
//             } catch (err) {
//                 return { error: 'Internal server error' };
//             }
//         },
//         ['meetings-list'],
//         { revalidate: 60, tags: ['meetings', 'whiskies', 'users'] }
//     );
// };

// export const getMeeting = async (id: string) => {
//     const auth = await requireAdmin();
//     if (!auth.ok) return { data: null, error: auth.error };
//     if (!id) return { data: null, error: 'Missing id!' };

//     try {
//         const meeting = await db.meeting.findUnique({
//             where: { id },
//             select: {
//                 id: true,
//                 date: true,
//                 location: true,
//                 status: true,
//                 quaich: true
//             }
//         });

//         if (!meeting) return { data: null, error: 'Not found' };

//         const [whiskies, users] = await Promise.all([
//             db.whisky.findMany({
//                 where: { meetingId: id },
//                 orderBy: { order: 'asc' },
//                 select: {
//                     id: true,
//                     name: true,
//                     image: true,
//                     description: true,
//                     order: true,
//                     quaich: true
//                 }
//             }),
//             db.user.findMany({
//                 where: { meetings: { some: { id } } },
//                 orderBy: [{ lastName: 'asc' }, { name: 'asc' }],
//                 select: {
//                     id: true,
//                     image: true,
//                     name: true,
//                     lastName: true,
//                     email: true
//                 }
//             })
//         ]);

//         return { data: { ...meeting, whiskies, users }, error: null };
//     } catch (err) {
//         return { data: null, error: 'Internal server error' };
//     }
// };

export async function getMeetings() {
    // ✅ 1️⃣ Run dynamic logic *outside* the cache
    const auth = await requireAdmin();
    if (!auth.ok) return { data: null, error: auth.error };

    // ✅ 2️⃣ Pure cached query block
    const cachedFn = unstable_cache(
        async () => {
            try {
                const meetings = await db.meeting.findMany({
                    orderBy: { date: 'asc' },
                    select: {
                        id: true,
                        date: true,
                        location: true,
                        quaich: true,
                        status: true
                    }
                });

                if (!meetings.length) return { data: [] };

                const meetingIds = meetings.map((m) => m.id);

                // Parallelised fetches (Accelerate-safe)
                const [whiskies, users] = await Promise.all([
                    db.whisky.findMany({
                        where: { meetingId: { in: meetingIds } },
                        orderBy: { order: 'asc' },
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            description: true,
                            order: true,
                            meetingId: true,
                            quaich: true
                        }
                    }),
                    db.user.findMany({
                        where: {
                            meetings: { some: { id: { in: meetingIds } } }
                        },
                        orderBy: [{ lastName: 'asc' }, { name: 'asc' }],
                        select: {
                            id: true,
                            name: true,
                            lastName: true,
                            email: true,
                            image: true,
                            emailVerified: true,
                            role: true,
                            createdAt: true,
                            updatedAt: true,
                            meetings: { select: { id: true } }
                        }
                    }) as unknown as UserWithMeetings[]
                ]);

                // Merge results efficiently
                const data = meetings.map((meeting) => ({
                    ...meeting,
                    whiskies: whiskies.filter(
                        (w) => w.meetingId === meeting.id
                    ),
                    users: users
                        .filter((u) =>
                            u.meetings.some((m) => m.id === meeting.id)
                        )
                        .map(({ meetings, ...rest }) => rest)
                }));

                return { data, error: null };
            } catch (err) {
                console.error('[getMeetings]', err);
                return { data: null, error: 'Internal server error' };
            }
        },
        ['meetings-list'], // cache key parts
        {
            revalidate: 60, // 1 minute cache lifetime
            tags: [TAGS.meetings]
        }
    );

    // ✅ 3️⃣ Return the cached data
    return cachedFn();
}

export async function getMeeting(id: string) {
    // ✅ Step 1: Do dynamic operations *outside* the cache
    const auth = await requireAdmin();
    if (!auth.ok) return { data: null, error: auth.error };
    if (!id) return { data: null, error: 'Missing id!' };

    // ✅ Step 2: Define the cached pure query
    const cachedFn = unstable_cache(
        async (meetingId: string) => {
            try {
                // --- Step 1: Fetch meeting
                const meeting = await db.meeting.findUnique({
                    where: { id: meetingId },
                    select: {
                        id: true,
                        date: true,
                        location: true,
                        status: true,
                        quaich: true
                    }
                });

                if (!meeting) return { data: null, error: 'Not found' };

                // --- Step 2: Fetch related entities in parallel
                const [whiskies, users] = await Promise.all([
                    db.whisky.findMany({
                        where: { meetingId },
                        orderBy: { order: 'asc' },
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            description: true,
                            order: true,
                            quaich: true
                        }
                    }),
                    db.user.findMany({
                        where: { meetings: { some: { id: meetingId } } },
                        orderBy: [{ lastName: 'asc' }, { name: 'asc' }],
                        select: {
                            id: true,
                            image: true,
                            name: true,
                            lastName: true,
                            email: true
                        }
                    })
                ]);

                // --- Step 3: Return merged data
                return { data: { ...meeting, whiskies, users }, error: null };
            } catch (err) {
                console.error('[getMeeting]', err);
                return { data: null, error: 'Internal server error' };
            }
        },
        // cache key
        [`meeting:${id}`],
        {
            revalidate: 60,
            tags: [TAGS.meeting(id), TAGS.meetings]
        }
    );

    // ✅ Step 3: Execute and return cached data
    return cachedFn(id);
}

export const createMeeting = async (
    values: z.infer<typeof CreateMeetingSchema>
) => {
    const auth = await requireAdmin();
    if (!auth.ok) return { error: auth.error || 'Not authorised' };

    const validated = CreateMeetingSchema.safeParse(values);
    if (!validated.success) return { error: 'Invalid fields!' };

    try {
        const meeting = await db.meeting.create({ data: validated.data });
        revalidateMeetingsList();
        revalidateMeeting(meeting.id);
        return { data: meeting };
    } catch (err) {
        return { error: 'Internal server error' };
    }
};

export const updateMeeting = async (
    values: z.infer<typeof UpdateMeetingSchema>,
    id: string
) => {
    const auth = await requireAdmin();
    if (!auth.ok) return { error: auth.error || 'Not authorised' };
    if (!id) return { error: 'Missing id!' };

    const validated = UpdateMeetingSchema.safeParse(values);
    if (!validated.success) return { error: 'Invalid fields!' };

    try {
        const updated = await db.meeting.update({
            where: { id },
            data: validated.data
        });

        revalidateMeetingsList();
        revalidateMeeting(id);
        revalidateMeetingResults(id);
        return { data: updated };
    } catch (err) {
        return { error: 'Internal server error' };
    }
};

export const closeMeeting = async (id: string) => {
    const auth = await requireAdmin();
    if (!auth.ok) return { error: auth.error || 'Not authorised' };
    if (!id) return { error: 'Missing id!' };

    try {
        const updated = await db.meeting.update({
            where: { id },
            data: { status: 'CLOSED' }
        });

        revalidateMeetingsList();
        revalidateMeeting(id);
        revalidateMeetingResults(id);
        return { data: updated };
    } catch (err) {
        return { error: 'Internal server error' };
    }
};

export const addMemberToMeeting = async (meetingId: string, userId: string) => {
    const auth = await requireAdmin();
    if (!auth.ok) return { error: auth.error || 'Not authorised' };

    try {
        await db.meeting.update({
            where: { id: meetingId },
            data: { users: { connect: { id: userId } } }
        });

        revalidateMeeting(meetingId);
        revalidateMeetingsList();
        return { success: true };
    } catch (err) {
        return { error: 'Internal server error' };
    }
};

export const removeMemberFromMeeting = async (
    meetingId: string,
    userId: string
) => {
    const auth = await requireAdmin();
    if (!auth.ok) return auth.error;

    try {
        await db.meeting.update({
            where: { id: meetingId },
            data: { users: { disconnect: { id: userId } } }
        });

        revalidateMeeting(meetingId);
        revalidateMeetingsList();
        return { success: true };
    } catch (err) {
        return { error: 'Internal server error' };
    }
};
