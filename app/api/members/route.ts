// import { authCheckServer } from '@/lib/authCheck';
// import db from '@/lib/db';

// export async function GET() {
//     try {
//         const userSession = await authCheckServer();

//         if (!userSession || userSession.user.role !== 'ADMIN') {
//             return Response.json({ error: 'Unauthorised' }, { status: 401 });
//         }

//         const members = await db.user.findMany({
//             orderBy: {
//                 lastName: 'asc'
//             }
//         });

//         if (!members) {
//             return Response.json(
//                 { error: 'Members not found' },
//                 { status: 404 }
//             );
//         }

//         return Response.json(members);
//     } catch (error) {
//         console.error(error);
//         return Response.json(
//             { error: 'Internal server error' },
//             { status: 500 }
//         );
//     }
// }
