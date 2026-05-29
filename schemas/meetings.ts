import { z } from 'zod';

const emptyToNull = (val: unknown) =>
    val === '' || val === undefined ? null : val;

const optionalWhiskyAge = z.preprocess(
    emptyToNull,
    z.union([
        z.null(),
        z.coerce
            .number()
            .int({ message: 'Age must be a whole number of years' })
            .positive({ message: 'Age must be at least 1 year' })
            .max(150, { message: 'Age must be 150 years or less' })
    ])
);

const optionalWhiskyAbv = z.preprocess(
    emptyToNull,
    z.union([
        z.null(),
        z.coerce
            .number({ message: 'ABV must be a number' })
            .min(0, { message: 'ABV must be at least 0' })
            .max(100, { message: 'ABV must be at most 100' })
            .refine(
                (n) => Math.abs(Math.round(n * 10) / 10 - n) < 1e-9,
                { message: 'ABV must have at most one decimal place' }
            )
            .transform((n) => Math.round(n * 10) / 10)
    ])
);

export const UpdateMeetingSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    location: z.string().min(1, 'Location is required')
});

export const CreateMeetingSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    location: z.string().min(1, 'Location is required')
});

export const WhiskySchema = z
    .object({
        id: z.string().optional(),
        name: z.string().min(1, 'Name is required'),
        description: z.string().min(1, 'Description is required'),
        nas: z.boolean().default(false),
        age: optionalWhiskyAge,
        abv: optionalWhiskyAbv,
        image: z.string().optional(),
        order: z.number().int().min(1, 'Order must be at least 1'),
        quaich: z.boolean()
    })
    .transform((data) => ({
        ...data,
        age: data.nas ? null : data.age
    }));

export type UpdateMeetingInput = z.infer<typeof UpdateMeetingSchema>;
export type WhiskyInput = z.infer<typeof WhiskySchema>;
export type WhiskyFormInput = z.input<typeof WhiskySchema>;
export type CreateMeetingFormData = z.infer<typeof CreateMeetingSchema>;
