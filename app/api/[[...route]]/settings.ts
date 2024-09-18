import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import db from '@/lib/db';
import { NameSchema } from '@/schemas/settings';
import { getAuth } from './getAuth';
import { currentUser } from '@/lib/auth';
import { getUserById } from '@/data/user';
import { unstable_update as update } from '@/auth';

const app = new Hono().patch(
    '/name',
    getAuth,
    zValidator('json', NameSchema),
    async (c) => {
        const user = await currentUser();

        if (!user) {
            return c.json({ result: false, message: 'Unauthorized' });
        }

        const dbUser = await getUserById(user.id!);

        if (!dbUser) {
            return c.json({ result: false, message: 'Unauthorized' });
        }

        const values = c.req.valid('json');

        const validatedFields = NameSchema.safeParse(values);

        if (!validatedFields.success) {
            return c.json({ result: false, message: 'Invalid fields' });
        }

        const updatedUser = await db.user.update({
            where: { id: dbUser.id },
            data: {
                ...values
            }
        });

        update({
            user: {
                firstName: updatedUser.firstName as string,
                lastName: updatedUser.lastName as string
            }
        });

        return c.json({ result: true, message: 'Name updated' });
    }
);

export default app;
