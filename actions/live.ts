// 'use server';

// import db from '@/lib/db';

// export async function getLiveWhiskyScores(whiskyId: string) {
//     // Mock: Fetch whisky with all reviews
//     const whisky = await db.whisky.findUnique({
//         where: { id: whiskyId },
//         include: {
//             reviews: {
//                 include: {
//                     user: {
//                         select: {
//                             name: true,
//                             lastName: true,
//                             image: true
//                         }
//                     }
//                 },
//                 orderBy: { createdAt: 'desc' }
//             },
//             meeting: true
//         }
//     });

//     // Mock data with realistic voting patterns
//     return whisky;
// }

'use server';

import db from '@/lib/db';
import { unstable_cache } from 'next/cache';

/**
 * Fetches a whisky, its meeting, and all reviews with user info.
 * Optimised for Prisma Accelerate and serverless environments.
 */
export const getLiveWhiskyScores = unstable_cache(
    async (whiskyId: string) => {
        if (!whiskyId) return null;

        // --- Step 1: Fetch base whisky
        const whisky = await db.whisky.findUnique({
            where: { id: whiskyId },
            include: { meeting: true }
        });

        if (!whisky) return null;

        // --- Step 2: Fetch reviews + user info separately (Accelerate-safe)
        const reviews = await db.review.findMany({
            where: { whiskyId },
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
        });

        // --- Step 3: Merge manually
        return {
            ...whisky,
            reviews
        };
    },
    ['live-whisky-scores'], // cache key prefix
    {
        revalidate: 30, // seconds
        tags: ['whiskies', 'reviews'] // optional revalidation triggers
    }
);
