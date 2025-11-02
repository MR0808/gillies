'use server';

import * as z from 'zod';
import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { CreateMeetingSchema, UpdateMeetingSchema } from '@/schemas/meetings';
import { authCheckServer } from '@/lib/authCheck';

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

export const getAllMeetings = async () => {
    const meetings = await db.whisky.findMany({
        select: { id: true }
    });

    return meetings;
};

export const getMeetings = async () => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

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

    // Step 2: Fetch whiskies + users
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
            where: { meetings: { some: { id: { in: meetingIds } } } },
            orderBy: [{ lastName: 'asc' }, { name: 'asc' }],
            // ✅ Explicitly include meetings relation
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
                meetings: { select: { id: true } } // required for join matching
            }
        }) as unknown as UserWithMeetings[] // <-- ✅ forces correct type
    ]);

    // Step 3: Merge data
    const data = meetings.map((meeting) => ({
        ...meeting,
        whiskies: whiskies.filter((w) => w.meetingId === meeting.id),
        users: users
            .filter((u) => u.meetings.some((m) => m.id === meeting.id))
            .map(({ meetings, ...u }) => u) // remove internal link
    }));

    // const data = await db.meeting.findMany({
    //     orderBy: {
    //         date: 'asc'
    //     },
    //     select: {
    //         id: true,
    //         date: true,
    //         location: true,
    //         quaich: true,
    //         status: true,
    //         whiskies: {
    //             select: {
    //                 id: true,
    //                 quaich: true,
    //                 name: true,
    //                 image: true,
    //                 description: true,
    //                 order: true,
    //                 meetingId: true
    //             },
    //             orderBy: { order: 'asc' }
    //         },
    //         users: {
    //             select: {
    //                 id: true,
    //                 image: true,
    //                 name: true,
    //                 lastName: true,
    //                 email: true
    //             },
    //             orderBy: [{ lastName: 'asc' }, { name: 'asc' }]
    //         }
    //     }
    // });

    return { data };
};

export const getMeeting = async (id: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!id) {
        return { error: 'Missing id!' };
    }

    const meeting = await db.meeting.findUnique({
        where: { id },
        select: {
            id: true,
            date: true,
            location: true,
            status: true,
            quaich: true
        }
    });

    if (!meeting) return null;

    const [whiskies, users] = await Promise.all([
        db.whisky.findMany({
            where: { meetingId: id },
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
            where: { meetings: { some: { id } } },
            orderBy: [{ name: 'asc' }, { lastName: 'asc' }],
            select: {
                id: true,
                image: true,
                name: true,
                lastName: true,
                email: true
            }
        })
    ]);

    const data = { ...meeting, whiskies, users };

    // const data = await db.meeting.findUnique({
    //     where: { id },
    //     select: {
    //         id: true,
    //         date: true,
    //         location: true,
    //         quaich: true,
    //         status: true,
    //         whiskies: {
    //             select: {
    //                 id: true,
    //                 quaich: true,
    //                 name: true,
    //                 image: true,
    //                 description: true,
    //                 order: true,
    //                 meetingId: true
    //             },
    //             orderBy: { order: 'asc' }
    //         },
    //         users: {
    //             select: {
    //                 id: true,
    //                 image: true,
    //                 name: true,
    //                 lastName: true,
    //                 email: true
    //             },
    //             orderBy: [{ lastName: 'asc' }, { name: 'asc' }]
    //         }
    //     }
    // });

    if (!data) {
        return { error: 'Not found' };
    }

    return { data };
};

export const createMeeting = async (
    values: z.infer<typeof CreateMeetingSchema>
) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    const validatedFields = CreateMeetingSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const data = await db.meeting.create({
        data: {
            ...values
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    revalidatePath(`/dashboard/meetings`);

    return { data };
};

export const updateMeeting = async (
    values: z.infer<typeof UpdateMeetingSchema>,
    id: string
) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!id) {
        return { error: 'Missing id!' };
    }

    const validatedFields = UpdateMeetingSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const data = await db.meeting.update({
        where: {
            id
        },
        data: {
            ...values
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    revalidatePath(`/dashboard/meetings/${data.id}`);

    return { data };
};

export const closeMeeting = async (id: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!id) {
        return { error: 'Missing id!' };
    }

    const data = await db.meeting.update({
        where: {
            id
        },
        data: {
            status: 'CLOSED'
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    revalidatePath(`/dashboard/meetings/`);
    revalidatePath(`/dashboard/meetings/${data.id}`);

    return { data };
};

export const addMemberToMeeting = async (meetingId: string, userId: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    // Mock: Add user to meeting
    await db.meeting.update({
        where: { id: meetingId },
        data: {
            users: {
                connect: { id: userId }
            }
        }
    });

    revalidatePath(`/dashboard/meetings/${meetingId}`);
    return { success: true };
};

export const removeMemberFromMeeting = async (
    meetingId: string,
    userId: string
) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    // Mock: Remove user from meeting
    await db.meeting.update({
        where: { id: meetingId },
        data: {
            users: {
                disconnect: { id: userId }
            }
        }
    });

    revalidatePath(`/dashboard/meetings/${meetingId}`);
    return { success: true };
};
