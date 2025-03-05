'use server';

import db from '@/lib/db';
import checkAuth from '@/utils/checkAuth';

export const getMeetingResults = async (id: string) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!id) {
        return { error: 'Missing id!' };
    }

    // const whiskies = await db.whisky.findMany({
    //     where: { meetingId },
    //     orderBy: { order: 'asc' }
    // });

    const meeting = await db.meeting.findUnique({
        where: {
            id
        },
        include: {
            whiskies: { orderBy: { order: 'asc' } }
        }
    });

    if (!meeting) {
        return { error: 'Missing data!' };
    }

    const whiskies = meeting?.whiskies;

    let data: {
        meetingId: string;
        meetingName: string;
        meetingDate: string;
        whiskies: {
            name: string;
            average: number;
            count: number;
            max: number;
            min: number;
        }[];
    } = {
        meetingId: meeting.id,
        meetingName: meeting.location,
        meetingDate: meeting.date,
        whiskies: []
    };
    for (let i = 0; i < whiskies.length; i++) {
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
            where: { whiskyId: whiskies[i].id }
        });
        data.whiskies.push({
            name: whiskies[i].name,
            average: results._avg.rating || 0,
            count: results._count.rating,
            min: results._min.rating || 0,
            max: results._max.rating || 0
        });
    }

    return { data };
};
