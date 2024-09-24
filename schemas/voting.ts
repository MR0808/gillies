import * as z from 'zod';

export const VotingSchema = z.object({
    comment: z.optional(
        z.string().min(1, {
            message: 'Name is required'
        })
    ),
    rating: z.coerce.number({ message: 'Please include a rating' })
});
