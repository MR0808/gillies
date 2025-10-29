'use server';

import * as z from 'zod';
import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import {
    MeetingSchemaSubmit,
    MeetingMemberSchema
} from '@/schemas/meetings-old';
import { createMeetingSchema } from '@/schemas/meetings';
import { authCheckServer } from '@/lib/authCheck';

export const getMeetings = async () => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    const data = await db.meeting.findMany({
        orderBy: {
            date: 'asc'
        },
        select: {
            id: true,
            date: true,
            location: true,
            quaich: true,
            status: true,
            whiskies: {
                select: {
                    id: true,
                    quaich: true,
                    name: true,
                    image: true,
                    description: true,
                    order: true,
                    meetingId: true
                },
                orderBy: { order: 'asc' }
            },
            users: {
                select: {
                    id: true,
                    image: true,
                    name: true,
                    lastName: true,
                    email: true
                },
                orderBy: [{ lastName: 'asc' }, { name: 'asc' }]
            }
        }
    });

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

    const data = await db.meeting.findUnique({
        where: { id },
        select: {
            id: true,
            date: true,
            location: true,
            quaich: true,
            status: true,
            whiskies: {
                select: {
                    id: true,
                    quaich: true,
                    name: true,
                    image: true,
                    description: true,
                    order: true,
                    meetingId: true
                },
                orderBy: { order: 'asc' }
            },
            users: {
                select: {
                    id: true,
                    image: true,
                    name: true,
                    lastName: true,
                    email: true
                },
                orderBy: [{ lastName: 'asc' }, { name: 'asc' }]
            }
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    return { data };
};

export const createMeeting = async (
    values: z.infer<typeof createMeetingSchema>
) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    const validatedFields = MeetingSchemaSubmit.safeParse(values);

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
    values: z.infer<typeof MeetingSchemaSubmit>,
    id: string
) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!id) {
        return { error: 'Missing id!' };
    }

    const validatedFields = MeetingSchemaSubmit.safeParse(values);

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

export const updateMeetingMembers = async (
    values: z.infer<typeof MeetingMemberSchema>,
    id: string
) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!id) {
        return { error: 'Missing id!' };
    }

    const validatedFields = MeetingMemberSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { members } = validatedFields.data;

    const uploadMembers = members.map((member) => {
        return { id: member };
    });

    const data = await db.meeting.update({
        where: { id },
        data: {
            users: { set: uploadMembers }
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
