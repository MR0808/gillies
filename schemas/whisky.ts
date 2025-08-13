import * as z from 'zod';
import { zfd } from 'zod-form-data';

export const WhiskySchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    description: z.optional(
        z.string().min(1, {
            message: 'Description is required'
        })
    ),
    quaich: z.boolean(),
    order: z.number({ message: 'Please include an order' }),
    image: z
        .array(z.object({ value: z.custom<File>() }))
        .min(1, { message: 'Please add at least one image.' })
        .max(1, { message: 'You can only have one image' }),
    imageUrl: z.optional(z.string())
});

export const WhiskySchemaFormData = zfd.formData({
    name: zfd.text(),
    description: zfd.text(),
    quaich: zfd.text(),
    order: zfd.text(),
    image: zfd.repeatable(z.array(zfd.file()).min(1))
});

export const WhiskySchemaFormDataEdit = zfd.formData({
    name: zfd.text(),
    description: zfd.text(),
    quaich: zfd.text(),
    order: zfd.text(),
    image: zfd.repeatable(z.array(zfd.file()).min(0)),
    imageUrl: zfd.text()
});
