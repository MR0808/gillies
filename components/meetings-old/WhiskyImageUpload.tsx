'use client';

import * as z from 'zod';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ImageUpIcon } from 'lucide-react';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { WhiskySchema } from '@/schemas/whisky';
import { cn } from '@/lib/utils';

const WhiskyImageUpload = () => {
    const form = useFormContext<z.infer<typeof WhiskySchema>>();
    const maxFiles = 1;
    const {
        fields: imageFields,
        append: appendImage,
        remove: removeImage
    } = useFieldArray({
        name: 'image',
        control: form.control
    });

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            if (imageFields.length + acceptedFiles.length <= maxFiles) {
                appendImage(acceptedFiles.map((file) => ({ value: file })));
                await form.trigger('image');
            } else {
                toast.error('Too many files', {
                    description: 'You have uploaded too many files'
                });
            }
        },
        [form]
    );

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
        open
    } = useDropzone({
        onDrop,
        maxFiles,
        maxSize: 10 * 1024 * 1024,
        accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'image/png': [],
            'image/webp': []
        }
    });

    useEffect(() => {
        if (fileRejections.length > 0) {
            const errorType = fileRejections[0].errors[0].code;
            if (errorType === 'file-invalid-type') {
                toast.error('Wrong file type', {
                    description: 'Please upload a file with the correct format'
                });
            } else if (errorType === 'file-too-large') {
                toast.error('File too large', {
                    description: 'Please upload a file with the correct size'
                });
            } else if (errorType === 'too-many-files') {
                toast.error('Too many files', {
                    description: 'You have uploaded too many files'
                });
            } else {
                toast.error('Uh oh! Something went wrong.', {
                    description:
                        'There was a problem with your request. Please try again'
                });
            }
        }
    }, [fileRejections]);

    return (
        <>
            <FormField
                control={form.control}
                name="image"
                render={() => (
                    <FormItem className={cn('w-full')}>
                        <FormLabel
                            className={cn(
                                'block text-lg font-medium leading-6 text-gray-900'
                            )}
                        >
                            Whisky Image
                        </FormLabel>
                        <FormControl>
                            <div
                                className={cn(
                                    `relative flex flex-col items-center justify-center rounded-lg border border-dashed px-4`,
                                    {
                                        'border-green-500 bg-green-500/10':
                                            isDragActive && !isDragReject,
                                        'border-destructive bg-destructive/10':
                                            isDragActive && isDragReject,
                                        'border-border bg-card': !isDragActive
                                    }
                                )}
                                {...getRootProps()}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <input {...getInputProps()} id="logoUrl" />
                                {imageFields.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-10">
                                        <ImageUpIcon className="h-12 w-12 fill-primary/75" />
                                        <div className="mb-2 mt-4">
                                            Drop or{' '}
                                            <span
                                                onClick={() => open()}
                                                className="cursor-pointer text-primary hover:underline"
                                            >
                                                select
                                            </span>
                                        </div>
                                        <span
                                            className={cn(
                                                'absolute bottom-2 left-1/2 -translate-x-1/2 text-xs',
                                                {
                                                    'text-destructive':
                                                        isDragReject ||
                                                        fileRejections.length >
                                                            0,
                                                    'text-muted-foreground':
                                                        !isDragReject &&
                                                        !(
                                                            fileRejections.length >
                                                            0
                                                        )
                                                }
                                            )}
                                        >
                                            Max size: 10MB, JPG or PNG
                                        </span>
                                    </div>
                                ) : (
                                    <div className="py-5">
                                        <div className="mt-2 grid grid-cols-5 gap-2">
                                            {imageFields.map((field, index) => (
                                                <div
                                                    key={field.id}
                                                    className="space-y-2"
                                                >
                                                    <Image
                                                        src={URL.createObjectURL(
                                                            field.value
                                                        )}
                                                        alt="Brewery Logo"
                                                        width="0"
                                                        height="0"
                                                        sizes="100vw"
                                                        className="h-auto w-full"
                                                        priority={true}
                                                    />
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() =>
                                                            removeImage(index)
                                                        }
                                                        type="button"
                                                        className="w-full"
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex w-full flex-row justify-between pt-2">
                                            <div className="text-sm text-gray-400">{`${imageFields.length}/${maxFiles}`}</div>
                                            {imageFields.length < maxFiles && (
                                                <span
                                                    onClick={() => open()}
                                                    className="cursor-pointer text-sm text-gray-400 hover:text-primary hover:underline"
                                                >
                                                    Add more images
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </FormControl>
                    </FormItem>
                )}
            />
        </>
    );
};

export default WhiskyImageUpload;
