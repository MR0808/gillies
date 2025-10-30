'use server';

import { authCheckServer } from '@/lib/authCheck';
import db from '@/lib/db';

export const getMeetingResults = async (meetingId: string) => {
    const userSession = await authCheckServer();

    if (!userSession || userSession.user.role !== 'ADMIN') {
        return { error: 'Not authorised' };
    }

    if (!meetingId) {
        return { error: 'Missing id!' };
    }

    const meeting = await db.meeting.findUnique({
        where: { id: meetingId },
        include: {
            whiskies: {
                include: {
                    reviews: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    lastName: true,
                                    image: true
                                }
                            }
                        }
                    }
                },
                orderBy: { order: 'asc' }
            }
        }
    });

    if (!meeting) {
        return { error: 'Missing data!' };
    }

    // const whiskies = meeting?.whiskies;

    // let data: {
    //     meetingId: string;
    //     meetingName: string;
    //     meetingDate: string;
    //     whiskies: {
    //         name: string;
    //         average: number;
    //         count: number;
    //         max: number;
    //         min: number;
    //     }[];
    // } = {
    //     meetingId: meeting.id,
    //     meetingName: meeting.location,
    //     meetingDate: meeting.date,
    //     whiskies: []
    // };
    // for (let i = 0; i < whiskies.length; i++) {
    //     const results = await db.review.aggregate({
    //         _avg: {
    //             rating: true
    //         },
    //         _count: {
    //             rating: true
    //         },
    //         _max: {
    //             rating: true
    //         },
    //         _min: { rating: true },
    //         where: { whiskyId: whiskies[i].id }
    //     });
    //     data.whiskies.push({
    //         name: whiskies[i].name,
    //         average: results._avg.rating || 0,
    //         count: results._count.rating,
    //         min: results._min.rating || 0,
    //         max: results._max.rating || 0
    //     });
    // }

    return { meeting };
};
