import { z } from 'zod';

export const MemberSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.email('Invalid email address'),
    role: z.enum(['USER', 'ADMIN'])
});

export const MemberFilterSchema = z.object({
    search: z.string().optional(),
    role: z.enum(['USER', 'ADMIN', 'ALL']).optional(),
    emailVerified: z.enum(['true', 'false', 'all']).optional()
});

export type MemberFormData = z.infer<typeof MemberSchema>;
export type MemberFilterData = z.infer<typeof MemberFilterSchema>;

// Old

// import { getUserByEmail } from '@/data/user';

// export const MemberSchema = z.object({
//     email: z
//         .email({
//             message: 'Email is required'
//         })
//         .refine(
//             async (e) => {
//                 const user = await getUserByEmail(e);
//                 if (user) {
//                     return false;
//                 }
//                 return true;
//             },
//             { message: 'Email is already in use' }
//         ),
//     name: z.string().min(1, {
//         message: 'First name is required'
//     }),
//     lastName: z.string().min(1, {
//         message: 'Last name is required'
//     })
// });

export const MemberUpdateSchema = z.object({
    email: z.email({
        message: 'Email is required'
    }),
    name: z.string().min(1, {
        message: 'First name is required'
    }),
    lastName: z.string().min(1, {
        message: 'Last name is required'
    })
});

export const MemberImportSchema = z.array(
    z.object({
        email: z.email({
            message: 'Email is required'
        }),
        name: z.string().min(1, {
            message: 'First name is required'
        }),
        lastName: z.string().min(1, {
            message: 'Last name is required'
        })
    })
);
