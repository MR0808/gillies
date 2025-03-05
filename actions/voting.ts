'use server';

import * as z from 'zod';
import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { VotingSchema } from '@/schemas/voting';

export const getUserMeetings = async () => {
    const user = await currentUser();
    if (!user) return { error: 'Not authorised' };

    // const data = await db.user.findUnique({
    //     where: { id: user.id },
    //     include: { meetings: true }
    // });

    const data = await db.meeting.findMany({
        where: { users: { some: { id: { contains: user.id } } } }
    });

    if (!data) {
        return { error: 'Unauthorised' };
    }

    return { data };
};

export const getMeetingWhiskiesByUser = async (meetingId: string) => {
    const user = await currentUser();
    if (!user) return { error: 'Not authorised' };

    const dbUser = await db.user.findUnique({
        where: { id: user.id }
    });

    if (!dbUser) {
        return { error: 'Unauthorised' };
    }

    if (!meetingId) {
        return { error: 'Bad request' };
    }

    const data = await db.whisky.findMany({
        where: { meetingId },
        orderBy: [{ order: 'asc' }],
        select: {
            id: true,
            name: true,
            description: true,
            quaich: true,
            image: true,
            reviews: { where: { userId: dbUser.id } }
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    return { data };
};

export const getWhiskyForVoting = async (whiskyId: string) => {
    const user = await currentUser();
    if (!user) return { error: 'Not authorised' };

    const dbUser = await db.user.findUnique({
        where: { id: user.id }
    });

    if (!dbUser) {
        return { error: 'Unauthorised' };
    }

    if (!whiskyId) {
        return { error: 'Bad request' };
    }

    const data = await db.review.findFirst({
        where: {
            AND: {
                userId: user.id,
                whiskyId
            }
        },
        select: {
            whisky: true,
            rating: true,
            comment: true,
            id: true
        }
    });

    if (!data) {
        const whisky = await db.whisky.findUnique({
            where: { id: whiskyId }
        });
        if (whisky) {
            return {
                data: { whisky, rating: 0, comment: '', id: '' }
            };
        }
        return { error: 'Bad request' };
    }

    return { data };
};

export const createVote = async (
    values: z.infer<typeof VotingSchema>,
    whiskyId: string
) => {
    const user = await currentUser();
    if (!user) return { error: 'Not authorised' };

    const dbUser = await db.user.findUnique({
        where: { id: user.id }
    });

    if (!dbUser) {
        return { error: 'Unauthorised' };
    }

    if (!whiskyId) {
        return { error: 'Bad request' };
    }

    const validatedFields = VotingSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    let { rating, comment } = validatedFields.data;

    const data = await db.review.create({
        data: {
            userId: dbUser.id,
            whiskyId,
            rating,
            comment: comment || ''
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    const meeting = await db.whisky.findUnique({ where: { id: whiskyId } });

    revalidatePath(`/vote/${meeting?.meetingId}`);

    return { success: data };
};

export const updateVote = async (
    values: z.infer<typeof VotingSchema>,
    id: string
) => {
    const user = await currentUser();
    if (!user) return { error: 'Not authorised' };

    const dbUser = await db.user.findUnique({
        where: { id: user.id }
    });

    if (!dbUser) {
        return { error: 'Unauthorised' };
    }

    if (!id) {
        return { error: 'Bad request' };
    }

    const validatedFields = VotingSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    let { rating, comment } = validatedFields.data;

    const data = await db.review.update({
        where: {
            id
        },
        data: {
            rating,
            comment: comment || ''
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    const meeting = await db.review.findUnique({
        where: { id },
        select: { whisky: true }
    });

    revalidatePath(`/vote/${meeting?.whisky.meetingId}`);

    return { success: data };
};
