import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import db from '@/lib/db';
import { getAuthAdmin, getAuth } from './getAuth';

const app = new Hono()
    .get(
        '/:meetingid',
        getAuth,
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
            const data = await db.whisky.findMany({
                where: { meetingId: meetingid },
                orderBy: {
                    name: 'asc'
                }
            });

            return c.json({ data });
        }
    )
    .get(
        '/:id',
        getAuth,
        zValidator(
            'param',
            z.object({
                id: z.string().optional()
            })
        ),
        async (c) => {
            const { id } = c.req.valid('param');

            if (!id) {
                return c.json({ error: 'Bad request' }, 400);
            }

            const data = await db.whisky.findUnique({
                where: { id }
            });

            if (!data) {
                return c.json({ error: 'Not found' }, 404);
            }

            return c.json({ data });
        }
    );

export default app;
