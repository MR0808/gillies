import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import db from '@/lib/db';
import { getAuthAdmin } from './getAuth';
import { MeetingSchemaSubmit } from '@/schemas/meetings';

const app = new Hono()
    .get('/', getAuthAdmin, async (c) => {
        const data = await db.meeting.findMany({
            orderBy: {
                date: 'asc'
            },
            include: {
                whiskies: { orderBy: { name: 'asc' } },
                users: { orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }] }
            }
        });

        return c.json({ data });
    })
    .post(
        '/',
        getAuthAdmin,
        zValidator('json', MeetingSchemaSubmit),
        async (c) => {
            let { location, date } = c.req.valid('json');

            const data = await db.meeting.create({
                data: {
                    location,
                    date
                }
            });

            return c.json({ data });
        }
    )
    .get(
        '/:id',
        getAuthAdmin,
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

            const data = await db.meeting.findUnique({
                where: { id },
                include: {
                    whiskies: { orderBy: { name: 'asc' } },
                    users: {
                        orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }]
                    }
                }
            });

            if (!data) {
                return c.json({ error: 'Not found' }, 404);
            }

            return c.json({ data });
        }
    )
    .patch(
        '/:id',
        getAuthAdmin,
        zValidator('param', z.object({ id: z.string().optional() })),
        zValidator('json', MeetingSchemaSubmit),
        async (c) => {
            const { id } = c.req.valid('param');
            let { date, location } = c.req.valid('json');

            const data = await db.meeting.update({
                where: {
                    id
                },
                data: {
                    date,
                    location
                }
            });

            if (!data) {
                return c.json({ error: 'Not found' }, 404);
            }

            return c.json({ data });
        }
    );

export default app;
