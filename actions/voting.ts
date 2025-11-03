'use server';

import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache';

import db from '@/lib/db';
import { authCheckServer } from '@/lib/authCheck';
import { ReviewServerInput, ReviewServerSchema } from '@/schemas/voting';
import { revalidateMeetingResults } from '@/cache/revalidate';
import { TAGS } from '@/cache/tags';

export async function getUserMeetings(userId: string) {
    return unstable_cache(
        async () => {
            const session = await authCheckServer();
            if (!session) return { error: 'Not authorised' };

            const { user } = session;

            try {
                // Fetch meetings joined by this user
                const meetings = await db.meeting.findMany({
                    where: { users: { some: { id: user.id } } },
                    orderBy: { date: 'desc' },
                    select: {
                        id: true,
                        date: true,
                        location: true,
                        status: true
                    }
                });

                if (!meetings.length) return { data: [] };

                // Fetch whiskies per meeting in one go
                const whiskies = await db.whisky.findMany({
                    where: { meetingId: { in: meetings.map((m) => m.id) } },
                    orderBy: { order: 'asc' },
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        order: true,
                        meetingId: true
                    }
                });

                // Merge manually (Accelerate-safe)
                const data = meetings.map((m) => ({
                    ...m,
                    whiskies: whiskies.filter((w) => w.meetingId === m.id)
                }));

                return { data };
            } catch (err) {
                return { error: 'Internal server error' };
            }
        },
        [`meetings`],
        { revalidate: 120, tags: [TAGS.meetings] }
    )();
}

export const getMeetingWhiskies = async (meetingId: string) => {
    const session = await authCheckServer();
    if (!session) return { error: 'Not authorised' };
    if (!meetingId) return { error: 'Missing meeting ID' };

    const { user } = session;

    try {
        const dbUser = await db.user.findUnique({ where: { id: user.id } });
        if (!dbUser) return { error: 'Unauthorised' };

        // Fetch whiskies first
        const whiskies = await db.whisky.findMany({
            where: { meetingId },
            orderBy: { order: 'asc' },
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                order: true,
                quaich: true
            }
        });

        if (!whiskies.length) return { data: [] };

        // Fetch this user's reviews for these whiskies
        const reviews = await db.review.findMany({
            where: {
                userId: dbUser.id,
                whiskyId: { in: whiskies.map((w) => w.id) }
            },
            select: {
                id: true,
                rating: true,
                comment: true,
                whiskyId: true
            }
        });

        // Merge manually
        const data = whiskies.map((w) => ({
            ...w,
            reviews: reviews.filter((r) => r.whiskyId === w.id)
        }));

        return { data };
    } catch (err) {
        console.error('[getMeetingWhiskies]', err);
        return { error: 'Internal server error' };
    }
};

export const createVote = async (values: ReviewServerInput) => {
    const session = await authCheckServer();
    if (!session) return { error: 'Not authorised' };

    const { user } = session;

    try {
        const dbUser = await db.user.findUnique({ where: { id: user.id } });
        if (!dbUser) return { error: 'Unauthorised' };

        const validated = ReviewServerSchema.safeParse(values);
        if (!validated.success) return { error: 'Invalid fields' };

        const { rating, comment, whiskyId } = validated.data;

        // Upsert review atomically (Accelerate-safe)
        const data = await db.review.upsert({
            where: {
                userId_whiskyId: {
                    userId: user.id,
                    whiskyId
                }
            },
            update: { rating, comment },
            create: {
                userId: user.id,
                whiskyId,
                rating,
                comment
            }
        });

        // Trigger revalidation of the meeting page
        const whisky = await db.whisky.findUnique({
            where: { id: whiskyId },
            select: { meetingId: true }
        });

        if (whisky?.meetingId) revalidateMeetingResults(whisky.meetingId);

        return { success: data };
    } catch (err) {
        console.error('[createVote]', err);
        return { error: 'Internal server error' };
    }
};
