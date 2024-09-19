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

export const EmailSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    })
});

export const ResetPasswordSchema = z
    .object({
        password: z.string().min(6, {
            message: 'Password must be at least 6 characters'
        }),
        confirmPassword: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' })
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match'
    })
    .superRefine(({ password }, checkPassComplexity) => {
        const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
        const containsLowercase = (ch: string) => /[a-z]/.test(ch);
        const containsSpecialChar = (ch: string) =>
            /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
        let countOfUpperCase = 0,
            countOfLowerCase = 0,
            countOfNumbers = 0,
            countOfSpecialChar = 0;
        for (let i = 0; i < password.length; i++) {
            let ch = password.charAt(i);
            if (!isNaN(+ch)) countOfNumbers++;
            else if (containsUppercase(ch)) countOfUpperCase++;
            else if (containsLowercase(ch)) countOfLowerCase++;
            else if (containsSpecialChar(ch)) countOfSpecialChar++;
        }
        if (
            countOfLowerCase < 1 ||
            countOfUpperCase < 1 ||
            countOfSpecialChar < 1 ||
            countOfNumbers < 1
        ) {
            checkPassComplexity.addIssue({
                code: 'custom',
                message: 'password does not meet complexity requirements'
            });
        }
    });
