import * as z from 'zod';

export const WhiskySchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    description: z.optional(
        z.string().min(1, {
            message: 'Description is required'
        })
    ),
    quaich: z.boolean()
});
