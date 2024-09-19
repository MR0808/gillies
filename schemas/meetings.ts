import * as z from 'zod';

export const MeetingSchema = z.object({
    location: z.string().min(1, {
        message: 'Location is required'
    }),
    date: z.string().date('Date is required')
});
