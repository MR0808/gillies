'use server';

import type { Prisma } from '@/generated/prisma/client';
import { unstable_cache } from 'next/cache';
import { Whisky } from '@/generated/prisma/client';;

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

type ReviewWithUser = Prisma.ReviewGetPayload<{
    select: {
        id: true;
        rating: true;
        comment: true;
        createdAt: true;
        user: {
            select: {
                id: true;
                name: true;
                lastName: true;
                image: true;
            };
        };
    };
}>;

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
    // ✅ 1️⃣ Do dynamic session logic outside cache
    const session = await authCheckServer();
    if (!session || session.user.role !== 'ADMIN') {
        return { data: null, error: 'Not authorised' };
    }

    if (!meetingId) return { error: 'Missing meetingId' };

    // ✅ 2️⃣ Define pure cached query (no headers/cookies here)
    const cachedFn = unstable_cache(
        async (mId: string) => {
            const whiskies = await db.whisky.findMany({
                where: { meetingId: mId },
                orderBy: { order: 'asc' },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    order: true,
                    quaich: true,
                    meetingId: true
                }
            });

            return { data: whiskies };
        },
        [`meeting-whiskies:${meetingId}`],
        {
            revalidate: 120, // 2 min cache window
            tags: [
                TAGS.meeting(meetingId), // invalidate when meeting changes
                TAGS.meetingWhiskies(meetingId) // specific tag for whiskies
            ]
        }
    );

    // ✅ 3️⃣ Execute cached function
    return cachedFn(meetingId);
}

export async function getMeetingWhisky(id: string) {
    // ✅ 1️⃣ Do dynamic session logic *outside* cache
    const session = await authCheckServer();
    if (!session || session.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!id) {
        return { error: 'Missing id!' };
    }

    // ✅ 2️⃣ Define pure cached query (no headers/cookies here)
    const cachedFn = unstable_cache(
        async (whiskyId: string) => {
            const whisky = await db.whisky.findUnique({
                where: { id: whiskyId },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    image: true,
                    order: true,
                    quaich: true,
                    meetingId: true
                }
            });

            if (!whisky) return { error: 'Not found' };
            return { data: whisky };
        },
        // Unique key per whisky
        [`whisky:${id}`],
        {
            revalidate: 120, // 2-minute cache lifetime
            tags: [
                TAGS.whisky(id), // whisky-specific tag
                TAGS.meetingWhiskies(id) // link to whisky lists
            ]
        }
    );

    // ✅ 3️⃣ Execute cached function
    return cachedFn(id);
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

export const getWhiskyDetails = async (meetingId: string, whiskyId: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { data: null, error: 'Not authorised' };
    }

    if (!meetingId || !whiskyId)
        return { data: null, error: 'Missing meetingId or whiskyId' };

    // ✅ Define cached function (pure + deterministic)
    const cachedFn = unstable_cache(
        async (mId: string, wId: string) => {
            // --- Step 1: Base whisky & meeting info ---
            const whisky = await db.whisky.findUnique({
                where: { id: wId },
                include: {
                    meeting: {
                        select: {
                            id: true,
                            date: true,
                            location: true,
                            status: true
                        }
                    }
                }
            });

            if (!whisky) return { error: 'Whisky not found' };

            // --- Step 2: Fetch reviews safely ---
            const reviews = (await db.review.findMany({
                where: { whiskyId: wId },
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    rating: true,
                    comment: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            lastName: true,
                            image: true
                        }
                    }
                }
            })) as unknown as ReviewWithUser[];

            // --- Step 3: Prisma aggregation (basic stats) ---
            const stats = await db.review.aggregate({
                where: { whiskyId: wId },
                _avg: { rating: true },
                _count: { rating: true },
                _min: { rating: true },
                _max: { rating: true }
            });

            // --- Step 4: Compute range, median, stddev manually ---
            const ratings = reviews.map((r) => r.rating).sort((a, b) => a - b);
            const count = ratings.length;

            const range =
                count > 0
                    ? (stats._max.rating ?? 0) - (stats._min.rating ?? 0)
                    : 0;

            const median =
                count === 0
                    ? 0
                    : count % 2 === 1
                      ? ratings[Math.floor(count / 2)]
                      : (ratings[count / 2 - 1] + ratings[count / 2]) / 2;

            const mean = stats._avg.rating ?? 0;
            const variance =
                count > 1
                    ? ratings.reduce(
                          (acc, val) => acc + Math.pow(val - mean, 2),
                          0
                      ) / count
                    : 0;
            const standardDeviation = Math.sqrt(variance);

            // --- Step 5: Return merged result ---
            return {
                data: {
                    id: whisky.id,
                    name: whisky.name,
                    description: whisky.description,
                    image: whisky.image,
                    order: whisky.order,
                    quaich: whisky.quaich,
                    meeting: whisky.meeting,
                    stats: {
                        average: mean,
                        count: stats._count.rating ?? 0,
                        min: stats._min.rating ?? 0,
                        max: stats._max.rating ?? 0,
                        range,
                        median,
                        standardDeviation
                    },
                    reviews
                },
                error: null
            };
        },
        // Unique cache key per whisky + meeting combo
        [`whisky-details:${meetingId}:${whiskyId}`],
        {
            revalidate: 60, // 1 minute
            tags: [
                TAGS.whisky(whiskyId),
                TAGS.meeting(meetingId),
                TAGS.meetingWhiskies(meetingId),
                TAGS.meetingWhisky(meetingId, whiskyId),
                TAGS.reviews
            ]
        }
    );

    // ✅ Execute cached function
    return cachedFn(meetingId, whiskyId);
};
