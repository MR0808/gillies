'use server';

import { revalidatePath } from 'next/cache';
import { Whisky } from '@/generated/prisma';

import db from '@/lib/db';
import { deleteImage } from '@/utils/supabase';
import { whiskySchema } from '@/schemas/meetings';
import { authCheckServer } from '@/lib/authCheck';

export const getMeetingWhiskies = async (meetingId: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

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
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

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

export const deleteWhisky = async (id: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!id) {
        return { error: 'Missing id!' };
    }

    const whisky = await db.whisky.findUnique({ where: { id } });

    if (!whisky) {
        return { error: 'Missing whisky' };
    }

    if (whisky.image) {
        await deleteImage(whisky.image, 'images');
    }

    if (whisky.quaich) {
        await db.meeting.update({
            where: { id: whisky.meetingId },
            data: { quaich: null }
        });
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

export const addOrUpdateWhisky = async (meetingId: string, data: unknown) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    const validated = whiskySchema.parse(data);

    const existingWhiskies = await db.whisky.findMany({
        where: { meetingId },
        orderBy: { order: 'asc' }
    });

    // Mock: Handle order conflicts - push existing whiskies up
    const conflictingWhiskies = existingWhiskies.filter(
        (w) => w.order >= validated.order && w.id !== validated.id
    );

    for (const whisky of conflictingWhiskies) {
        await db.whisky.update({
            where: { id: whisky.id },
            data: { order: whisky.order + 1 }
        });
    }

    // Mock: Handle quaich - only one per meeting
    if (validated.quaich) {
        // Unmark all other whiskies as quaich
        await db.whisky.updateMany({
            where: { meetingId, id: { not: validated.id } },
            data: { quaich: false }
        });
    }

    let whisky: Whisky;

    // Mock: Create or update whisky
    if (validated.id) {
        const oldWhisky = await db.whisky.findUnique({
            where: { id: validated.id }
        });

        if (!oldWhisky) {
            return { error: 'Whisky not found' };
        }

        if (oldWhisky.image && validated.image !== oldWhisky.image) {
            await deleteImage(oldWhisky.image, 'images');
        }

        whisky = await db.whisky.update({
            where: { id: validated.id },
            data: {
                name: validated.name,
                description: validated.description,
                image: validated.image,
                order: validated.order,
                quaich: validated.quaich
            }
        });
    } else {
        whisky = await db.whisky.create({
            data: {
                name: validated.name,
                description: validated.description,
                image: validated.image,
                order: validated.order,
                quaich: validated.quaich,
                meetingId
            }
        });
    }

    if (validated.quaich) {
        // Update meeting with new quaich ID
        await db.meeting.update({
            where: { id: meetingId },
            data: { quaich: whisky.id }
        });
    }

    revalidatePath(`/dashboard/meetings/${meetingId}`);
    return { success: true };
};
