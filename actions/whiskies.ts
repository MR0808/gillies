'use server';

import { unstable_cache } from 'next/cache';
import { Whisky } from '@/generated/prisma';

import { TAGS } from '@/cache/tags';
import {
    revalidateMeeting,
    revalidateMeetingResults,
    revalidateMeetingsList,
    revalidateWhiskies,
    revalidateWhisky
} from '@/cache/revalidate';
import db from '@/lib/db';
import { deleteImage } from '@/utils/supabase';
import { WhiskySchema } from '@/schemas/meetings';
import { authCheckServer } from '@/lib/authCheck';

export const getAllWhiskies = unstable_cache(
    async () => {
        const whiskies = await db.whisky.findMany({
            select: { id: true }
        });
        return { data: whiskies };
    },
    ['whiskies-list'],
    { revalidate: 300, tags: [TAGS.meetings] } // Shared under meetings-level cache
);

export async function getMeetingWhiskies(meetingId: string) {
    return unstable_cache(
        async () => {
            const session = await authCheckServer();
            if (!session || session.user.role !== 'ADMIN')
                return { error: 'Not authorised' };
            if (!meetingId) return { error: 'Missing meetingId' };

            const whiskies = await db.whisky.findMany({
                where: { meetingId },
                orderBy: { order: 'asc' }
            });

            return { data: whiskies };
        },
        [`meeting-whiskies:${meetingId}`],
        { revalidate: 120, tags: [TAGS.meetingWhiskies(meetingId)] }
    )();
}

export async function getMeetingWhisky(id: string) {
    return unstable_cache(
        async () => {
            const session = await authCheckServer();
            if (!session || session.user.role !== 'ADMIN')
                return { error: 'Not authorised' };
            if (!id) return { error: 'Missing id!' };

            const whisky = await db.whisky.findUnique({
                where: { id }
            });

            if (!whisky) return { error: 'Not found' };
            return { data: whisky };
        },
        [`whisky:${id}`],
        { revalidate: 120, tags: [TAGS.whisky(id)] }
    )();
}

export const deleteWhisky = async (id: string) => {
    const session = await authCheckServer();
    if (!session || session.user.role !== 'ADMIN')
        return { error: 'Not authorised' };
    if (!id) return { error: 'Missing id!' };

    const whisky = await db.whisky.findUnique({ where: { id } });
    if (!whisky) return { error: 'Missing whisky' };

    if (whisky.image) await deleteImage(whisky.image, 'images');

    if (whisky.quaich) {
        await db.meeting.update({
            where: { id: whisky.meetingId },
            data: { quaich: null }
        });
    }

    await db.whisky.delete({ where: { id } });

    // 🔄 Cache revalidation cascade
    await revalidateMeeting(whisky.meetingId);
    await revalidateMeetingResults(whisky.meetingId);
    await revalidateMeetingsList();
    await revalidateWhiskies(whisky.meetingId);

    return { success: true };
};

export const addOrUpdateWhisky = async (meetingId: string, data: unknown) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    const validated = WhiskySchema.parse(data);

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

    await revalidateMeeting(meetingId);
    await revalidateMeetingResults(meetingId);
    await revalidateMeetingsList();
    await revalidateWhiskies(whisky.meetingId);
    await revalidateWhisky(whisky.id);
    return { success: true };
};
