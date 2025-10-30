'use server';

import db from '@/lib/db';

export async function getLiveWhiskyScores(whiskyId: string) {
    // Mock: Fetch whisky with all reviews
    const whisky = await db.whisky.findUnique({
        where: { id: whiskyId },
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
                },
                orderBy: { createdAt: 'desc' }
            },
            meeting: true
        }
    });

    // Mock data with realistic voting patterns
    return whisky;
}
