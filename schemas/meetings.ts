import { z } from 'zod';

export const UpdateMeetingSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    location: z.string().min(1, 'Location is required')
});

export const CreateMeetingSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    location: z.string().min(1, 'Location is required')
});

export const WhiskySchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().optional(),
    order: z.number().int().min(1, 'Order must be at least 1'),
    quaich: z.boolean()
});

export type UpdateMeetingInput = z.infer<typeof UpdateMeetingSchema>;
export type WhiskyInput = z.infer<typeof WhiskySchema>;
export type CreateMeetingFormData = z.infer<typeof CreateMeetingSchema>;
