import { z } from 'zod';

export const updateMeetingSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    location: z.string().min(1, 'Location is required')
});

export const whiskySchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().optional(),
    order: z.number().int().min(1, 'Order must be at least 1'),
    quaich: z.boolean().default(false)
});

export type UpdateMeetingInput = z.infer<typeof updateMeetingSchema>;
export type WhiskyInput = z.infer<typeof whiskySchema>;
