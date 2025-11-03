'use server';

import { unstable_cache } from 'next/cache';

import db from '@/lib/db';
import { authCheckServer } from '@/lib/authCheck';
import { TAGS } from '@/cache/tags';

export async function getMeetingResults(meetingId: string) {
    return unstable_cache(
        async () => {
            // --- Security ---
            const userSession = await authCheckServer();
            if (!userSession) return { error: 'Not authorised' };
            if (!meetingId) return { error: 'Missing id!' };

            try {
                // --- Step 1: Base meeting info ---
                const meeting = await db.meeting.findUnique({
                    where: { id: meetingId },
                    select: {
                        id: true,
                        date: true,
                        location: true,
                        quaich: true
                    }
                });

                if (!meeting) return { error: 'Meeting not found' };

                // --- Step 2: Whiskies in this meeting ---
                const whiskies = await db.whisky.findMany({
                    where: { meetingId },
                    orderBy: { order: 'asc' },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        image: true,
                        order: true
                    }
                });

                if (!whiskies.length)
                    return { error: 'No whiskies found for meeting' };
                const whiskyIds = whiskies.map((w) => w.id);

                // --- Step 3: Aggregate review stats ---
                type ReviewStats = {
                    whiskyId: string;
                    _avg: { rating: number | null };
                    _count: { rating: number };
                    _max: { rating: number | null };
                    _min: { rating: number | null };
                };

                const reviewStats = (await db.review.groupBy({
                    by: ['whiskyId'],
                    where: { whiskyId: { in: whiskyIds } },
                    _avg: { rating: true },
                    _count: { rating: true },
                    _max: { rating: true },
                    _min: { rating: true }
                })) as unknown as ReviewStats[];

                // --- Step 4: Get individual reviews + user info ---
                const reviewUsers = await db.review.findMany({
                    where: { whiskyId: { in: whiskyIds } },
                    select: {
                        id: true,
                        whiskyId: true,
                        rating: true,
                        comment: true,
                        user: {
                            select: { name: true, lastName: true, image: true }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                });

                // --- Step 5: Merge into final data structure ---
                const data = whiskies.map((w) => {
                    const stats = reviewStats.find((r) => r.whiskyId === w.id);
                    const reviewers = reviewUsers.filter(
                        (r) => r.whiskyId === w.id
                    );

                    return {
                        id: w.id,
                        name: w.name,
                        description: w.description,
                        image: w.image,
                        order: w.order,
                        average: stats?._avg.rating ?? 0,
                        count: stats?._count.rating ?? 0,
                        min: stats?._min.rating ?? 0,
                        max: stats?._max.rating ?? 0,
                        reviewers
                    };
                });

                return {
                    data: {
                        meetingId: meeting.id,
                        meetingName: meeting.location,
                        meetingDate: meeting.date,
                        meetingQuaich: meeting.quaich,
                        whiskies: data
                    }
                };
            } catch (err) {
                return { error: 'Internal server error' };
            }
        },
        [`meeting-results:${meetingId}`], // per-meeting key
        { revalidate: 60, tags: [TAGS.meetingResults(meetingId)] }
    )(); // call immediately
}
