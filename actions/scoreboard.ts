'use server';

import db from '@/lib/db';
import { Scoreboard } from '@/types';
import whiskyImg from '@/public/images/whisky.jpg';
import { authCheckServer } from '@/lib/authCheck';

export const getWhisky = async (id: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!id) {
        return { error: 'Missing id!' };
    }

    const whisky = await db.whisky.findUnique({
        where: {
            id
        }
    });

    if (!whisky) {
        return { error: 'Missing data!' };
    }

    const results = await db.review.aggregate({
        _avg: {
            rating: true
        },
        _count: {
            rating: true
        },
        _max: {
            rating: true
        },
        _min: { rating: true },
        where: { whiskyId: whisky.id }
    });

    const whiskyReviews = await db.review.findMany({
        where: {
            whiskyId: id
        },
        select: {
            id: true,
            rating: true,
            comment: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    lastName: true,
                    image: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    let whiskyScores: Scoreboard = {
        whiskyId: whisky.id,
        whiskyName: whisky.name,
        whiskyImage: whisky.image || whiskyImg.src,
        average: results._avg.rating || 0,
        count: results._count.rating,
        min: results._min.rating || 0,
        max: results._max.rating || 0
    };

    return { whiskyScores, whiskyReviews };
};
