import * as z from 'zod';

// export const ReviewSchema = z.object({
//     whiskyId: z.string().min(1, 'Whisky is required'),
//     rating: z.number().min(0).max(10).multipleOf(0.1),
//     comment: z.string().min(1, 'Comment is required')
// });

export const ReviewSchema = z
    .object({
        whiskyId: z.string().min(1, 'Whisky ID is required'),
        rating: z
            .string()
            .trim()
            .refine((val) => val !== '', { message: 'Rating is required' }),
        comment: z.string().min(1, 'Comment is required')
    })
    .superRefine((data, ctx) => {
        const value = data.rating;

        if (value) {
            const num = parseFloat(value);

            // If invalid in any way: not numeric, out of range, or too many decimals
            if (
                isNaN(num) ||
                num < 0 ||
                num > 10 ||
                !/^\d{1,2}(\.\d)?$/.test(value)
            ) {
                ctx.addIssue({
                    code: 'custom', // ✅ required by Zod
                    path: ['rating'],
                    message:
                        'Rating must be a number between 0 and 10 with one decimal max'
                });
            }
        }
    });

export const ReviewServerSchema = z.object({
    whiskyId: z.string().min(1, 'Whisky ID is required'),
    rating: z
        .number()
        .min(0, 'Rating must be between 0 and 10')
        .max(10, 'Rating must be between 0 and 10'),
    comment: z.string()
});

// 🧩 Types
export type ReviewFormInput = z.infer<typeof ReviewSchema>;
export type ReviewServerInput = z.infer<typeof ReviewServerSchema>;
