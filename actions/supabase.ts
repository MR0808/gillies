'use server';

import { supabaseServer } from '@/lib/supabase';
import { authCheckServer } from '@/lib/authCheck';

export const uploadAvatar = async (formData: FormData) => {
    const userSession = await authCheckServer();

    if (!userSession) {
        return {
            success: false,
            publicUrl: null,
            error: 'Not authorised'
        };
    }

    try {
        const image = formData.get('image') as File;
        const bucket = formData.get('bucket') as string;

        if (!image || !bucket) {
            return {
                success: false,
                publicUrl: null,
                error: 'Invalid input: image and bucket are required'
            };
        }

        // Validate file type
        if (!image.type.startsWith('image/')) {
            return {
                success: false,
                publicUrl: null,
                error: 'File must be an image'
            };
        }

        // Validate file size (e.g., 5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (image.size > maxSize) {
            return {
                success: false,
                publicUrl: null,
                error: 'File size must be less than 5MB'
            };
        }

        const timestamp = Date.now();
        const fileExtension = image.name.split('.').pop();
        const newName = `${timestamp}-${crypto.randomUUID()}.${fileExtension}`;

        const { data, error } = await supabaseServer.storage
            .from(bucket)
            .upload(newName, image, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            return {
                success: false,
                publicUrl: null,
                error: `Image upload failed - ${error}`
            };
        }

        const {
            data: { publicUrl }
        } = supabaseServer.storage.from(bucket).getPublicUrl(newName);

        return {
            success: true,
            publicUrl,
            error: null
        };
    } catch (error) {
        return {
            success: false,
            publicUrl: null,
            error: `Server error occurred - ${error}`
        };
    }
};

export const deleteAvatar = async ({
    imageUrl,
    bucket
}: {
    imageUrl: string;
    bucket: string;
}) => {
    const userSession = await authCheckServer();

    if (!userSession) {
        return {
            success: false,
            error: 'Not authorised'
        };
    }
    try {
        if (!imageUrl || !bucket) {
            return {
                success: false,
                error: 'Invalid input'
            };
        }

        // Extract image name from the URL
        const imageName = imageUrl.split('/').pop();
        if (!imageName) {
            return {
                success: false,
                error: 'Image not found'
            };
        }

        const { error } = await supabaseServer.storage
            .from(bucket)
            .remove([imageName]);

        if (error) {
            return {
                success: false,
                error: 'Image deletion failed'
            };
        }

        return {
            success: true,
            error: null
        };
    } catch (error) {
        return {
            success: false,
            error: 'Server error'
        };
    }
};
