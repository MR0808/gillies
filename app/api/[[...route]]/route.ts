import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import members from './members';
import register from './register';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

const routes = app.route('/members', members).route('/register', register);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
