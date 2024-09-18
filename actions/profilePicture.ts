'use server';

import db from '@/lib/db';
import { ProfilePictureSchemaFile } from '@/schemas/settings';
import { validateWithZodSchema } from '@/schemas';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { uploadImage, deleteImage } from '@/utils/supabase';

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
