import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import db from '@/lib/db';
import { getAuth, getAuthAdmin } from './getAuth';
import { MemberSchema } from '@/schemas/members';
import { generateRegistrationToken } from '@/lib/tokens';
import { sendRegistrationEmail } from '@/lib/mail';
import { getRegistrationTokenById } from '@/data/registrationToken';

const app = new Hono()
    .get('/', getAuthAdmin, async (c) => {
        const data = await db.user.findMany({
            orderBy: {
                lastName: 'asc'
            }
        });

        return c.json({ data });
    })
    .post('/', getAuthAdmin, zValidator('json', MemberSchema), async (c) => {
        let { firstName, lastName, email } = c.req.valid('json');

        email = email.toLocaleLowerCase();

        const data = await db.user.create({
            data: {
                firstName,
                lastName,
                email
            },
            select: {
                firstName: true,
                lastName: true,
                email: true
            }
        });

        const registrationToken = await generateRegistrationToken(email);

        await sendRegistrationEmail(
            registrationToken.email,
            registrationToken.token
        );

        return c.json({ data });
    })
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

            const data = await db.user.findUnique({ where: { id } });

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
        zValidator('json', MemberSchema),
        async (c) => {
            const { id } = c.req.valid('param');
            let { firstName, lastName, email } = c.req.valid('json');

            email = email.toLocaleLowerCase();

            if (!id) {
                return c.json({ error: 'Missing id' }, 400);
            }

            const data = await db.user.update({
                where: {
                    id
                },
                data: {
                    firstName,
                    lastName,
                    email
                }
            });

            if (!data) {
                return c.json({ error: 'Not found' }, 404);
            }

            return c.json({ data });
        }
    )
    .post(
        '/resend/:id',
        getAuthAdmin,
        zValidator('param', z.object({ id: z.string().optional() })),
        async (c) => {
            const { id } = c.req.valid('param');
            console.log('id', id);

            if (!id) {
                return c.json({ error: 'Missing id' }, 400);
            }

            const registrationToken = await getRegistrationTokenById(id);
            console.log(registrationToken);

            if (!registrationToken) {
                return c.json({ error: 'Not found' }, 404);
            }

            await sendRegistrationEmail(
                registrationToken.email,
                registrationToken.token
            );
            return c.json({ registrationToken });
        }
    )
    .delete(
        '/:id',
        getAuthAdmin,
        zValidator('param', z.object({ id: z.string().optional() })),
        async (c) => {
            const { id } = c.req.valid('param');

            if (!id) {
                return c.json({ error: 'Missing id' }, 400);
            }

            const data = await db.user.delete({
                where: {
                    id
                }
            });

            if (!data) {
                return c.json({ error: 'Not found' }, 404);
            }

            return c.json({ data });
        }
    );

export default app;
