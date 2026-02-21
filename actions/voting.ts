'use server';

import { unstable_cache, revalidatePath, revalidateTag } from 'next/cache';

import db from '@/lib/db';
import { authCheckServer } from '@/lib/authCheck';
import { ReviewServerInput, ReviewServerSchema } from '@/schemas/voting';
import { revalidateMeetingResults } from '@/cache/revalidate';
import { TAGS } from '@/cache/tags';

export async function getUserMeetings(userId?: string) {
    // ✅ 1️⃣ Do dynamic session logic outside cache
    const session = await authCheckServer();
    if (!session) return { data: null, error: 'Not authorised' };

    // Determine target user ID (either provided or current session)
    const effectiveUserId = userId || session.user.id;

    // ✅ 2️⃣ Define pure cached function
    const cachedFn = unstable_cache(
        async (uid: string) => {
            try {
                // --- Step 1: Fetch meetings joined by user ---
                const meetings = await db.meeting.findMany({
                    where: { users: { some: { id: uid } } },
                    orderBy: { date: 'desc' },
                    select: {
                        id: true,
                        date: true,
                        location: true,
                        status: true
                    }
                });

                if (!meetings.length) return { data: [] };

                // --- Step 2: Fetch whiskies for all those meetings ---
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

                // --- Step 3: Merge safely ---
                const data = meetings.map((m) => ({
                    ...m,
                    whiskies: whiskies.filter((w) => w.meetingId === m.id)
                }));

                return { data, error: null };
            } catch (err) {
                console.error('[getUserMeetings]', err);
                return { error: 'Internal server error', data: null };
            }
        },
        // ✅ Unique cache key per user
        [`user-meetings:${effectiveUserId}`],
        {
            revalidate: 120, // cache lifespan (2 min)
            tags: [
                TAGS.meetings, // all meetings cache
                TAGS.meetingResults(effectiveUserId) // cross-link if used in dashboards
            ]
        }
    );

    // ✅ 3️⃣ Return cached result
    return cachedFn(effectiveUserId);
}

export async function getMeetingWhiskies(meetingId: string) {
    // ✅ 1️⃣ Dynamic operations outside the cache
    const session = await authCheckServer();
    if (!session) return { data: null, error: 'Not authorised' };
    if (!meetingId) return { data: null, error: 'Missing meeting ID' };

    const { user } = session;
    const dbUser = await db.user.findUnique({ where: { id: user.id } });
    if (!dbUser) return { data: null, error: 'Unauthorised' };

    // ✅ 2️⃣ Define pure cached query (Accelerate-safe)
    const cachedFn = unstable_cache(
        async (mId: string, uId: string) => {
            try {
                // --- Step 1: Fetch whiskies for meeting ---
                const whiskies = await db.whisky.findMany({
                    where: { meetingId: mId },
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

                // --- Step 2: Fetch this user's reviews ---
                const reviews = await db.review.findMany({
                    where: {
                        userId: uId,
                        whiskyId: { in: whiskies.map((w) => w.id) }
                    },
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        whiskyId: true
                    }
                });

                // --- Step 3: Merge results manually ---
                const data = whiskies.map((w) => ({
                    ...w,
                    reviews: reviews.filter((r) => r.whiskyId === w.id)
                }));

                return { data, error: null };
            } catch (err) {
                console.error('[getMeetingWhiskies]', err);
                return { data: null, error: 'Internal server error' };
            }
        },
        // Cache key (unique per meeting + user)
        [`meeting-whiskies:${meetingId}:${dbUser.id}`],
        {
            revalidate: 60, // 1 minute cache window
            tags: [
                TAGS.meeting(meetingId), // meeting-level invalidation
                TAGS.meetingWhiskies(meetingId), // whisky list invalidation
                TAGS.meetingResults(meetingId) // results/reviews invalidation
            ]
        }
    );

    // ✅ 3️⃣ Execute cached query
    return cachedFn(meetingId, dbUser.id);
}

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
