import * as z from 'zod';

export const VotingSchema = z.object({
    comment: z.optional(z.string()),
    rating: z
        .number()
        .min(0)
        .max(10)
        .refine((val) => Number(val.toFixed(1)) === val, {
            message: 'Rating must be a multiple of 0.1'
        })
});
