import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import db from '@/lib/db';
import { getAuthAdmin, getAuth } from './getAuth';
import { WhiskySchema } from '@/schemas/whisky';

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
    .post(
        '/:meetingid',
        getAuthAdmin,
        zValidator(
            'param',
            z.object({
                meetingid: z.string().optional()
            })
        ),
        zValidator('json', WhiskySchema),
        async (c) => {
            const { meetingid } = c.req.valid('param');

            if (!meetingid) {
                return c.json({
                    result: false,
                    data: null,
                    message: 'No meeting id attached'
                });
            }
            let { name, description, quaich } = c.req.valid('json');

            if (quaich) {
                const existingMeeting = await db.whisky.findFirst({
                    where: {
                        meetingId: meetingid,
                        quaich: true
                    }
                });
                if (existingMeeting) {
                    return c.json({
                        result: false,
                        data: null,
                        message: 'Quaich already selected'
                    });
                }
            }

            const data = await db.whisky.create({
                data: {
                    name,
                    description,
                    meetingId: meetingid,
                    quaich
                }
            });

            return c.json({
                result: true,
                data,
                message: 'Whisky successfully created'
            });
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
    )
    .patch(
        '/:meetingid/:id',
        getAuthAdmin,
        zValidator(
            'param',
            z.object({
                meetingid: z.string().optional(),
                id: z.string().optional()
            })
        ),
        zValidator('json', WhiskySchema),
        async (c) => {
            const { meetingid, id } = c.req.valid('param');

            if (!meetingid || !id) {
                return c.json({
                    result: false,
                    data: null,
                    message: 'No meeting id attached'
                });
            }

            let { name, description, quaich } = c.req.valid('json');

            if (quaich) {
                const existingMeeting = await db.whisky.findFirst({
                    where: {
                        meetingId: meetingid,
                        quaich: true
                    }
                });
                if (existingMeeting) {
                    return c.json({
                        result: false,
                        data: null,
                        message: 'Quaich already selected'
                    });
                }
            }

            const data = await db.whisky.update({
                where: {
                    id
                },
                data: {
                    name,
                    description,
                    quaich
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
    )
    .delete(
        '/:id',
        getAuthAdmin,
        zValidator('param', z.object({ id: z.string().optional() })),
        async (c) => {
            const { id } = c.req.valid('param');

            if (!id) {
                return c.json({
                    result: false,
                    data: null,
                    message: 'No whisky id attached'
                });
            }

            const data = await db.whisky.delete({
                where: {
                    id
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
                message: 'Whisky successfully deleted'
            });
        }
    );

export default app;
