import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { hash } from 'bcrypt-ts';

import db from '@/lib/db';
import { getRegistrationTokenByToken } from '@/data/registrationToken';
import { getUserByEmail } from '@/data/user';
import { RegisterSchema } from '@/schemas/auth';

const app = new Hono()
    .get(
        '/:token',
        zValidator(
            'param',
            z.object({
                token: z.string().optional()
            })
        ),
        async (c) => {
            const { token } = c.req.valid('param');
            const existingToken = await getRegistrationTokenByToken(token!);

            if (!existingToken) {
                return c.json({ error: 'Token does not exist' }, 422);
            }

            const existingUser = await getUserByEmail(existingToken.email);

            if (!existingUser) {
                return c.json({ error: 'Email does not exist' }, 422);
            }

            return c.json({ data: existingToken });
        }
    )
    .patch(
        '/:token',
        zValidator('param', z.object({ token: z.string().optional() })),
        zValidator('json', RegisterSchema),
        async (c) => {
            const { token } = c.req.valid('param');
            let { password, email } = c.req.valid('json');

            if (!token) return c.json({ error: 'Token does not exist!' }, 421);

            const existingToken = await getRegistrationTokenByToken(token);

            if (!existingToken) {
                return c.json({ error: 'Token does not exist!' }, 421);
            }

            const existingUser = await getUserByEmail(existingToken.email);

            if (!existingUser) {
                return c.json({ error: 'Email does not exist!' }, 422);
            }

            if (email !== existingToken.email)
                return c.json({ error: 'Invalid email' }, 422);

            const hashedPassword = await hash(password, 10);

            const data = await db.user.update({
                where: { id: existingUser.id },
                data: {
                    emailVerified: new Date(),
                    registered: true,
                    password: hashedPassword
                }
            });

            await db.registrationToken.delete({
                where: { id: existingToken.id }
            });

            return c.json({ data });
        }
    );

export default app;
