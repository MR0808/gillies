import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import members from './members';
import credentials from './credentials';
import settings from './settings';
import meetings from './meetings';
import whiskies from './whiskies';
import voting from './voting';
import results from './results';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

const routes = app
    .route('/members', members)
    .route('/credentials', credentials)
    .route('/settings', settings)
    .route('/meetings', meetings)
    .route('/whiskies', whiskies)
    .route('/voting', voting)
    .route('/results', results);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
