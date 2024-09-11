/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    '/dashboard',
    '/dashboard/members',
    '/dashboard/members/new',
    '/auth/verification',
    '/auth/error'
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/reset',
    '/auth/forgotpassword',
    '/auth/newpassword'
];

/**
 * An array of routes that are used for administration
 * If the user is not an admin, they will be redirected to the main page
 * @type {string[]}
 */
export const adminRoutes = ['/dashboard'];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
