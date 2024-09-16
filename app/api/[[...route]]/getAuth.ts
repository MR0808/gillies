import { createMiddleware } from 'hono/factory';

import { currentUser, currentRole } from '@/lib/auth';

export const getAuth = createMiddleware(async (c, next) => {
    const user = await currentUser();
    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    await next();
});

export const getAuthAdmin = createMiddleware(async (c, next) => {
    const user = await currentUser();
    if (!user) return c.json({ error: 'Unauthorized' }, 401);
    if (user.role !== 'ADMIN') return c.json({ error: 'Unauthorized' }, 401);

    await next();
});
