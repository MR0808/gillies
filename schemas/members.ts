import * as z from 'zod';

import { getUserByEmail } from '@/data/user';

export const MemberSchema = z.object({
    email: z
        .email({
            message: 'Email is required'
        })
        .refine(
            async (e) => {
                const user = await getUserByEmail(e);
                if (user) {
                    return false;
                }
                return true;
            },
            { message: 'Email is already in use' }
        ),
    name: z.string().min(1, {
        message: 'First name is required'
    }),
    lastName: z.string().min(1, {
        message: 'Last name is required'
    })
});

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
