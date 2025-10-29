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

export const ReviewSchema = z.object({
    whiskyId: z.string().min(1, 'Whisky is required'),
    rating: z.number().min(0).max(10).multipleOf(0.1),
    comment: z.string().min(1, 'Comment is required')
});
