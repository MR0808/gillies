import * as z from 'zod';

import { getUserByEmail } from '@/data/user';

export const MemberSchema = z.object({
    email: z
        .string()
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
    firstName: z.string().min(1, {
        message: 'First name is required'
    }),
    lastName: z.string().min(1, {
        message: 'Last name is required'
    })
});

export const MemberImportSchema = z.array(
    z.object({
        email: z.string().email({
            message: 'Email is required'
        }),
        firstName: z.string().min(1, {
            message: 'First name is required'
        }),
        lastName: z.string().min(1, {
            message: 'Last name is required'
        })
    })
);
