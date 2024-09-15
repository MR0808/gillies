import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import db from '@/lib/db';

const app = new Hono().get('/', async (c) => {
    const data = await db.user.findMany({
        orderBy: {
            lastName: 'asc'
        }
    });

    return c.json({ data });
});

export default app;
