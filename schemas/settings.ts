import * as z from 'zod';

export const NameSchema = z.object({
    firstName: z.string().min(1, {
        message: 'First name is required'
    }),
    lastName: z.string().min(1, {
        message: 'Last name is required'
    })
});

export const ProfilePictureSchema = z.object({
    image: typeof window === 'undefined' ? z.any() : z.instanceof(FileList)
});

export const ProfilePictureSchemaFile = z.object({
    image: validateImageFile()
});

function validateImageFile() {
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
