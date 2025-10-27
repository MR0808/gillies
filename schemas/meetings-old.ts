import * as z from 'zod';

export const MeetingSchema = z.object({
    location: z.string().min(1, {
        message: 'Location is required'
    }),
    date: z.date({ message: 'Date is required' })
});

export const MeetingSchemaSubmit = z.object({
    location: z.string().min(1, {
        message: 'Location is required'
    }),
    // date: z.string().date('Date is required')
    date: z.iso.date('Date is required')
});

export const MeetingMemberSchema = z.object({
    members: z.array(
        z.string().min(1, {
            message: 'Member id required'
        })
    )
});
