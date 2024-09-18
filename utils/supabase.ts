import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File, bucket: string) => {

    const timestamp = Date.now();
    // const newName = `/users/${timestamp}-${image.name}`;
    const newName = `${timestamp}-${image.name}`;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(newName, image, {
            cacheControl: '3600'
        });
    if (!data) throw new Error('Image upload failed');
    return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = (url: string, bucket: string) => {
    const imageName = url.split('/').pop();
    if (!imageName) throw new Error('Invalid URL');
    return supabase.storage.from(bucket).remove([imageName]);
};
