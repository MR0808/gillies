import * as z from 'zod';

export const DisplayNameSchema = z.object({
    displayName: z.string().min(1, {
        message: 'Display name is required'
    })
});

export const NameSchema = z.object({
    firstName: z.string().min(1, {
        message: 'First name is required'
    }),
    lastName: z.string().min(1, {
        message: 'Last name is required'
    })
});

export const GenderSchema = z.object({
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'NOTSAY'], {
        message: 'Gender is required'
    })
});

export const LocationSchema = z.object({
    country: z.number({ message: 'Country is required' }),
    state: z.optional(z.number({ message: 'State is required' }))
});

export const DateOfBirthSchema = z.object({
    dateOfBirth: z.date({ message: 'Date of birth is required' })
});

export const ProfilePictureSchema = z.object({
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
