import * as z from 'zod';

export const MemberSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    firstName: z.string().min(1, {
        message: 'First name is required'
    }),
    lastName: z.string().min(1, {
        message: 'Last name is required'
    })
});

export const MemberUploadSchema = z.array(MemberSchema);
