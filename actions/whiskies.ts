'use server';

import * as z from 'zod';
import { revalidatePath } from 'next/cache';
import { Whisky } from '@prisma/client';

import db from '@/lib/db';
import checkAuth from '@/utils/checkAuth';
import {
    WhiskySchemaFormData,
    WhiskySchemaFormDataEdit
} from '@/schemas/whisky';
import { uploadImage, deleteImage } from '@/utils/supabase';

export const getMeetingWhiskies = async (meetingId: string) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!meetingId) {
        return { error: 'Bad request' };
    }

    const data = await db.whisky.findMany({
        where: { meetingId },
        orderBy: {
            order: 'asc'
        }
    });

    return { data };
};

export const getMeetingWhisky = async (id: string) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!id) {
        return { error: 'Bad request' };
    }

    const data = await db.whisky.findUnique({
        where: { id }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    return { data };
};

export const createWhisky = async (formData: FormData, meetingId: string) => {
    let data: Whisky;
    try {
        const authCheck = await checkAuth(true);
        if (!authCheck) return { data: null, error: 'Not authorised' };

        if (!meetingId) {
            return { data: null, error: 'Missing id!' };
        }

        const { name, description, quaich, order, image } =
            WhiskySchemaFormData.parse(formData);

        const quaichBool = quaich?.toLowerCase?.() === 'true';
        const orderNum = parseInt(order);

        const imageFullPath = await uploadImage(image[0], 'images');

        if (quaichBool) {
            const existingQuich = await db.whisky.findFirst({
                where: {
                    meetingId,
                    quaich: true
                }
            });
            if (existingQuich) {
                return { data: null, error: 'Quaich already selected' };
            }
        }

        data = await db.whisky.create({
            data: {
                name,
                description,
                meetingId,
                order: orderNum,
                quaich: quaichBool,
                image: imageFullPath
            }
        });

        if (!data) {
            return { data: null, error: 'Not found' };
        }

        revalidatePath(`/dashboard/meetings/${data.meetingId}`);

        return { data, error: null };
    } catch (error) {
        const message = renderError(error);
        return { data: null, error: message.message };
    }
};

// export const createWhisky = async (
//     values: z.infer<typeof WhiskySchema>,
//     meetingId: string
// ) => {
//     const authCheck = await checkAuth(true);
//     if (!authCheck) return { error: 'Not authorised' };

//     if (!meetingId) {
//         return { error: 'Missing id!' };
//     }

//     const validatedFields = WhiskySchema.safeParse(values);

//     if (!validatedFields.success) {
//         return { error: 'Invalid fields!' };
//     }

//     let { name, description, quaich, order } = validatedFields.data;

//     if (quaich) {
//         const existingQuich = await db.whisky.findFirst({
//             where: {
//                 meetingId,
//                 quaich: true
//             }
//         });
//         if (existingQuich) {
//             return { error: 'Quaich already selected' };
//         }
//     }

//     const data = await db.whisky.create({
//         data: {
//             name,
//             description,
//             meetingId,
//             order,
//             quaich
//         }
//     });

//     if (!data) {
//         return { error: 'Not found' };
//     }

//     revalidatePath(`/dashboard/meetings/${data.meetingId}`);

//     return { data };
// };

export const updateWhisky = async (
    formData: FormData,
    meetingId: string,
    id: string
) => {
    let data: Whisky;
    try {
        const authCheck = await checkAuth(true);
        if (!authCheck) return { data: null, error: 'Not authorised' };

        if (!meetingId || !id) {
            return { data: null, error: 'Missing id!' };
        }
        const { name, description, quaich, order, image, imageUrl } =
            WhiskySchemaFormDataEdit.parse(formData);

        const quaichBool = quaich?.toLowerCase?.() === 'true';
        const orderNum = parseInt(order);

        if (quaichBool) {
            const existingQuich = await db.whisky.findFirst({
                where: {
                    meetingId,
                    quaich: true
                }
            });
            if (existingQuich && existingQuich.id !== id) {
                return { data: null, error: 'Quaich already selected' };
            }
        }

        let updateData: {
            name: string;
            description: string;
            order: number;
            quaich: boolean;
            image?: string;
        } = {
            name,
            description,
            order: orderNum,
            quaich: quaichBool
        };

        if (image[0]) {
            const imageFullPath = await uploadImage(image[0], 'images');
            await deleteImage(imageUrl, 'images');
            updateData = { ...updateData, image: imageFullPath };
        }

        data = await db.whisky.update({
            where: {
                id
            },
            data: updateData
        });

        if (!data) {
            return { data: null, error: 'Not found' };
        }

        revalidatePath(`/dashboard/meetings/${data.meetingId}`);

        return { data, error: null };
    } catch (error) {
        const message = renderError(error);
        return { data: null, error: message.message };
    }
};

// export const updateWhisky = async (
//     values: z.infer<typeof WhiskySchema>,
//     meetingId: string,
//     id: string
// ) => {
//     const authCheck = await checkAuth(true);
//     if (!authCheck) return { error: 'Not authorised' };

//     if (!meetingId || !id) {
//         return { error: 'Missing id!' };
//     }

//     const validatedFields = WhiskySchema.safeParse(values);

//     if (!validatedFields.success) {
//         return { error: 'Invalid fields!' };
//     }

//     let { name, description, quaich, order } = validatedFields.data;

//     if (quaich) {
//         const existingQuaich = await db.whisky.findFirst({
//             where: {
//                 meetingId,
//                 quaich: true
//             }
//         });

//         if (existingQuaich && existingQuaich.id !== id) {
//             return { error: 'Quaich already selected' };
//         }
//     }

//     const data = await db.whisky.update({
//         where: {
//             id
//         },
//         data: {
//             name,
//             description,
//             quaich,
//             order
//         }
//     });

//     if (!data) {
//         return { error: 'Not found' };
//     }

//     revalidatePath(`/dashboard/meetings/${data.meetingId}`);

//     return { data };
// };

export const deleteWhisky = async (id: string) => {
    const authCheck = await checkAuth(true);
    if (!authCheck) return { error: 'Not authorised' };

    if (!id) {
        return { error: 'Missing id!' };
    }

    const data = await db.whisky.delete({
        where: {
            id
        }
    });

    if (!data) {
        return { error: 'Not found' };
    }

    revalidatePath(`/dashboard/meetings/${data.meetingId}`);

    return { data };
};

const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {
        message: error instanceof Error ? error.message : 'An error occurred'
    };
};
