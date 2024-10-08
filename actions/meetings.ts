'use server'

import * as z from 'zod';

import db from '@/lib/db';
import { MeetingSchemaSubmit, MeetingMemberSchema } from '@/schemas/meetings';
import checkAuth from '@/utils/checkAuth';

export const getMeetings = async () => {
    const authCheck = await checkAuth(true)
    if (!authCheck) return {error: 'Not authorised'}

    const data = await db.meeting.findMany({
        orderBy: {
            date: 'asc'
        },
        include: {
            whiskies: { orderBy: { name: 'asc' } },
            users: { orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }] }
        }
    });

    return { data };
}

export const getMeeting = async (id: string) => {
    const authCheck = await checkAuth(true)
    if (!authCheck) return {error: 'Not authorised'}

    if (!id) {
        return { error: "Missing id!" };
    }

    const data = await db.meeting.findUnique({
        where: { id },
        include: {
            whiskies: { orderBy: { order: 'asc' } },
            users: {
                orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }]
            }
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    return { data };
}

export const createMeeting = async (values: z.infer<typeof MeetingSchemaSubmit>) => {
    const authCheck = await checkAuth(true)
    if (!authCheck) return {error: 'Not authorised'}

    const validatedFields = MeetingSchemaSubmit.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const data = await db.meeting.create({
        data: {
            ...values
        }
    });

    return { data }
}

export const updateMeeting = async (values: z.infer<typeof MeetingSchemaSubmit>, id: string) => {
    const authCheck = await checkAuth(true)
    if (!authCheck) return {error: 'Not authorised'}

    if (!id) {
        return { error: "Missing id!" };
    }

    const validatedFields = MeetingSchemaSubmit.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
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

    return { data }
}

export const updateMeetingMembers = async (values: z.infer<typeof MeetingMemberSchema>, id: string) => {
    const authCheck = await checkAuth(true)
    if (!authCheck) return {error: 'Not authorised'}

    if (!id) {
        return { error: "Missing id!" };
    }

    const validatedFields = MeetingMemberSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { members } = validatedFields.data

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

    return { data }
}