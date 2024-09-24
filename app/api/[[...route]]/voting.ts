import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import db from '@/lib/db';
import { getAuth } from './getAuth';
import { currentUser } from '@/lib/auth';
import { VotingSchema } from '@/schemas/voting';

const app = new Hono()
    .get('/meetings', getAuth, async (c) => {
        const user = await currentUser();

        if (!user) {
            return c.json({ error: 'Unauthorized' }, 400);
        }

        const data = await db.user.findUnique({
            where: { id: user.id },
            include: { meetings: true }
        });

        if (!data) {
            return c.json({ error: 'Unauthorized' }, 400);
        }

        return c.json({ data });
    })
    .get(
        '/whiskies/:meetingid',
        getAuth,
        zValidator(
            'param',
            z.object({
                meetingid: z.string().optional()
            })
        ),
        async (c) => {
            const { meetingid } = c.req.valid('param');
            console.log(meetingid);

            if (!meetingid) {
                return c.json({ error: 'Bad request' }, 400);
            }
            const data = await db.whisky.findMany({
                where: { meetingId: meetingid },
                orderBy: [{ order: 'asc' }]
            });

            return c.json({ data });
        }
    )
    .get(
        '/vote/:whiskyid',
        getAuth,
        zValidator(
            'param',
            z.object({
                whiskyid: z.string().optional()
            })
        ),
        async (c) => {
            const user = await currentUser();

            if (!user) {
                return c.json({ error: 'Unauthorized' }, 400);
            }

            const dbUser = await db.user.findUnique({
                where: { id: user.id }
            });

            if (!dbUser) {
                return c.json({ error: 'Unauthorized' }, 400);
            }

            const { whiskyid } = c.req.valid('param');

            if (!whiskyid) {
                return c.json({ error: 'Bad request' }, 400);
            }

            const data = await db.review.findFirst({
                where: {
                    AND: {
                        userId: user.id,
                        whiskyId: whiskyid
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
                    where: { id: whiskyid }
                });
                if (whisky) {
                    return c.json({
                        data: { whisky, rating: 0, comment: '', id: '' }
                    });
                }
                return c.json({ error: 'Bad request' }, 400);
            }

            return c.json({ data });
        }
    )
    .post(
        '/vote/:whiskyid',
        getAuth,
        zValidator(
            'param',
            z.object({
                whiskyid: z.string().optional()
            })
        ),
        zValidator('json', VotingSchema),
        async (c) => {
            const user = await currentUser();

            if (!user) {
                return c.json({
                    result: false,
                    data: null,
                    message: 'Unauthorized'
                });
            }

            const dbUser = await db.user.findUnique({
                where: { id: user.id }
            });

            if (!dbUser) {
                return c.json({
                    result: false,
                    data: null,
                    message: 'Unauthorized'
                });
            }

            const { whiskyid } = c.req.valid('param');

            if (!whiskyid) {
                return c.json({
                    result: false,
                    data: null,
                    message: 'bad request'
                });
            }

            let { rating, comment } = c.req.valid('json');

            const data = await db.review.create({
                data: {
                    userId: dbUser.id,
                    whiskyId: whiskyid,
                    rating,
                    comment: comment || ''
                }
            });

            return c.json({
                result: true,
                data,
                message: 'Rating added'
            });
        }
    )
    .patch(
        '/vote/:whiskyid/:id',
        getAuth,
        zValidator(
            'param',
            z.object({
                whiskyid: z.string().optional(),
                id: z.string().optional()
            })
        ),
        zValidator('json', VotingSchema),
        async (c) => {
            const user = await currentUser();

            if (!user) {
                return c.json({
                    result: false,
                    data: null,
                    message: 'Unauthorized'
                });
            }

            const dbUser = await db.user.findUnique({
                where: { id: user.id }
            });

            if (!dbUser) {
                return c.json({
                    result: false,
                    data: null,
                    message: 'Unauthorized'
                });
            }

            const { whiskyid, id } = c.req.valid('param');

            if (!whiskyid || !id) {
                return c.json({
                    result: false,
                    data: null,
                    message: 'No ids attached'
                });
            }

            let { rating, comment } = c.req.valid('json');

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
                return c.json({
                    result: false,
                    data: null,
                    message: 'Whisky not found'
                });
            }

            return c.json({
                result: true,
                data,
                message: 'Whisky successfully created'
            });
        }
    );

export default app;
