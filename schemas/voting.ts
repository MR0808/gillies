import * as z from 'zod';

export const VotingSchema = z.object({
    comment: z.optional(z.string()),
    rating: z.number({ message: 'Please include a rating' })
});
