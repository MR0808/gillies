import { z } from 'zod';

export function validateWithZodSchema<T extends z.ZodTypeAny>(
    schema: T,
    data: unknown
): z.infer<T> {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.issues.map((error) => error.message);
        throw new Error(errors.join(', '));
    }
    return result.data;
}

export function validateImageFile() {
    const maxUploadSize = 1024 * 1024;
    const acceptedFileTypes = ['image/'];
    return z
        .instanceof(File)
        .refine((file) => {
            return !file || file.size <= maxUploadSize;
        }, `File size must be less than 1 MB`)
        .refine((file) => {
            return (
                !file ||
                acceptedFileTypes.some((type) => file.type.startsWith(type))
            );
        }, 'File must be an image');
}
