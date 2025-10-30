'use server';

import * as z from 'zod';
import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { authCheckServer } from '@/lib/authCheck';
import {
    ReviewSchema,
    ReviewServerInput,
    ReviewServerSchema
} from '@/schemas/voting';
import { Review } from '@/generated/prisma';

export const getUserMeetings = async () => {
    const userSession = await authCheckServer();

    if (!userSession) {
        return { error: 'Not authorised' };
    }

    const { user } = userSession;

    const data = await db.meeting.findMany({
        where: { users: { some: { id: { contains: user.id } } } },
        include: { whiskies: true },
        orderBy: { date: 'desc' }
    });

    if (!data) {
        return { error: 'Unauthorised' };
    }

    return { data };
};

export const getMeetingWhiskies = async (meetingId: string) => {
    const userSession = await authCheckServer();

    if (!userSession) {
        return { error: 'Not authorised' };
    }

    const { user } = userSession;

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
        include: {
            reviews: { where: { userId: dbUser.id } }
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    return { data };
};

export const createVote = async (values: ReviewServerInput) => {
    const userSession = await authCheckServer();

    if (!userSession) {
        return { error: 'Not authorised' };
    }

    const { user } = userSession;

    const dbUser = await db.user.findUnique({
        where: { id: user.id }
    });

    if (!dbUser) {
        return { error: 'Unauthorised' };
    }

    const validatedFields = ReviewServerSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields' };
    }

    let { rating, comment, whiskyId } = validatedFields.data;

    const existingReview = await db.review.findFirst({
        where: {
            userId: user.id,
            whiskyId: whiskyId
        }
    });

    let data: Review;

    if (existingReview) {
        data = await db.review.update({
            where: { id: existingReview.id },
            data: {
                rating: rating,
                comment: comment
            }
        });
    } else {
        data = await db.review.create({
            data: {
                userId: user.id,
                whiskyId: whiskyId,
                rating: rating,
                comment: comment
            }
        });
    }

    if (!data) {
        return { error: 'Not found' };
    }

    const meeting = await db.whisky.findUnique({ where: { id: whiskyId } });

    revalidatePath(`/meeting/${meeting?.meetingId}`);

    return { success: data };
};
