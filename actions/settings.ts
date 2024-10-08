'use server'

import * as z from 'zod'
import { hash } from 'bcrypt-ts';

import db from '@/lib/db';
import {
    NameSchema,
    EmailSchema,
    ResetPasswordSchema
} from '@/schemas/settings';
import { currentUser } from '@/lib/auth';
import { getUserById, getUserByEmail } from '@/data/user';
import { unstable_update as update } from '@/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
import { ProfilePictureSchemaFile } from '@/schemas/settings';
import { validateWithZodSchema } from '@/schemas';
import { uploadImage, deleteImage } from '@/utils/supabase';

export const updateName = async (values: z.infer<typeof NameSchema>) => {
    const user = await currentUser();
    if (!user) return {error: 'Not authorised'}
    
    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return {error: 'Not authorised' };
    }

    const validatedFields = NameSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: 'Invalid fields' };
    }

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    });

    update({
        user: {
            firstName: updatedUser.firstName as string,
            lastName: updatedUser.lastName as string
        }
    });

    return {success: 'Name updated' };
}    

export const updatePassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const user = await currentUser();
    if (!user) return {error: 'Not authorised'}
    
    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return {error: 'Not authorised' };
    }

    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: 'Invalid fields' };
    }

    const { password } = validatedFields.data;

    const hashedPassword = await hash(password, 10);

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            password: hashedPassword
        }
    });

    return {success: 'Password updated' };
}    

export const updateEmail = async (values: z.infer<typeof EmailSchema>) => {
    const user = await currentUser();
    if (!user) return {error: 'Not authorised'}
    
    const dbUser = await getUserById(user.id!);

    if (!dbUser) {
        return {error: 'Not authorised' };
    }

    const validatedFields = EmailSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: 'Invalid fields' };
    }

    values.email = values.email.toLowerCase();

    const existingUser = await getUserByEmail(values.email);

    if (existingUser) {
        return {error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values,
            emailVerified: null
        }
    });

    update({
        user: {
            email: updatedUser.email as string
        }
    });

    return {success: 'Email updated' };
}

export const updateProfilePicture = async (formData: FormData) => {
    try {
        const user = await currentUser();

        if (!user) {
            return { result: false, message: 'Unauthorized' };
        }

        const dbUser = await getUserById(user.id!);

        if (!dbUser) {
            return { result: false, message: 'Unauthorized' };
        }

        const image = formData.get('image') as File;

        const validatedFile = validateWithZodSchema(ProfilePictureSchemaFile, {
            image
        });

        const fullPath = await uploadImage(validatedFile.image, 'images');
        if (dbUser?.image) await deleteImage(dbUser?.image, 'images');
        await db.user.update({
            where: { id: dbUser.id },
            data: {
                image: fullPath
            }
        });
        return { result: true, message: 'Profile image updated successfully' };
    } catch (error) {
        return renderError(error);
    }
};

const renderError = (
    error: unknown
): { result: boolean | null; message: string } => {
    console.log(error);
    return {
        result: false,
        message: error instanceof Error ? error.message : 'An error occurred'
    };
};