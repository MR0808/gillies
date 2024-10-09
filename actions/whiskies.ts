'use server';

import * as z from 'zod';
import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import checkAuth from '@/utils/checkAuth';
import { WhiskySchema } from '@/schemas/whisky';

export const getMeetingWhiskies = async (meetingId: string) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!meetingId) {
        return { error: 'Bad request' };
    }

    const data = await db.whisky.findMany({
        where: { meetingId },
        orderBy: {
            order: 'asc'
        }
    });

    return { data };
};

export const getMeetingWhisky = async (id: string) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!id) {
        return { error: 'Bad request' };
    }

    const data = await db.whisky.findUnique({
        where: { id }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    return { data };
};

export const createWhisky = async (
    values: z.infer<typeof WhiskySchema>,
    meetingId: string
) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!meetingId) {
        return { error: 'Missing id!' };
    }

    const validatedFields = WhiskySchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    let { name, description, quaich, order } = validatedFields.data;

    if (quaich) {
        const existingQuich = await db.whisky.findFirst({
            where: {
                meetingId,
                quaich: true
            }
        });
        if (existingQuich) {
            return { error: 'Quaich already selected' };
        }
    }

    const data = await db.whisky.create({
        data: {
            name,
            description,
            meetingId,
            order,
            quaich
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    revalidatePath(`/dashboard/meetings/${data.meetingId}`);

    return { data };
};

export const updateWhisky = async (
    values: z.infer<typeof WhiskySchema>,
    meetingId: string,
    id: string
) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!meetingId || !id) {
        return { error: 'Missing id!' };
    }

    const validatedFields = WhiskySchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    let { name, description, quaich, order } = validatedFields.data;

    if (quaich) {
        const existingQuaich = await db.whisky.findFirst({
            where: {
                meetingId,
                quaich: true
            }
        });

        if (existingQuaich && existingQuaich.id !== id) {
            return { error: 'Quaich already selected' };
        }
    }

    const data = await db.whisky.update({
        where: {
            id
        },
        data: {
            name,
            description,
            quaich,
            order
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    revalidatePath(`/dashboard/meetings/${data.meetingId}`);

    return { data };
};

export const deleteWhisky = async (id: string) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!id) {
        return { error: 'Missing id!' };
    }

    const data = await db.whisky.delete({
        where: {
            id
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    revalidatePath(`/dashboard/meetings/${data.meetingId}`);

    return { data };
};
