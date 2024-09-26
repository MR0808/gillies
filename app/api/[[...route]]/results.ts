import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { Prisma } from '@prisma/client';

import db from '@/lib/db';
import { getAuthAdmin } from './getAuth';

const app = new Hono().get(
    '/:meetingid',
    getAuthAdmin,
    zValidator(
        'param',
        z.object({
            meetingid: z.string().optional()
        })
    ),
    async (c) => {
        const { meetingid } = c.req.valid('param');

        if (!meetingid) {
            return c.json({ error: 'Bad request' }, 400);
        }

        const whiskies = await db.whisky.findMany({
            where: { meetingId: meetingid },
            orderBy: { order: 'asc' }
        });

        let data: {
            name: string;
            average: number;
            count: number;
            max: number;
            min: number;
        }[] = [];
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
            data.push({
                name: whiskies[i].name,
                average: results._avg.rating || 0,
                count: results._count.rating,
                min: results._min.rating || 0,
                max: results._max.rating || 0
            });
        }

        return c.json({ data });
    }
);

export default app;
