'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

import { whiskySchema, type WhiskyInput } from '@/schemas/meetings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { uploadImage } from '@/utils/supabase';
import { addOrUpdateWhisky } from '@/actions/whiskies';
import { WhiskyDialogProps } from '@/types/meeting';

type Whisky = {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    order: number;
    quaich: boolean;
};

const WhiskyDialog = ({
    open,
    onClose,
    whisky,
    meetingId,
    currentQuaichId,
    existingOrders
}: WhiskyDialogProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showQuaichWarning, setShowQuaichWarning] = useState(false);
    const [pendingData, setPendingData] = useState<WhiskyInput | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue
    } = useForm<WhiskyInput>({
        resolver: zodResolver(whiskySchema),
        defaultValues: whisky
            ? {
                  id: whisky.id,
                  name: whisky.name,
                  description: whisky.description || '',
                  image: whisky.image || '',
                  order: whisky.order,
                  quaich: whisky.quaich
              }
            : {
                  name: '',
                  description: '',
                  image: '',
                  order: Math.max(...existingOrders, 0) + 1,
                  quaich: false
              }
    });

    const quaichValue = watch('quaich');

    useEffect(() => {
        if (open) {
            if (whisky) {
                reset({
                    id: whisky.id,
                    name: whisky.name,
                    description: whisky.description || '',
                    image: whisky.image || '',
                    order: whisky.order,
                    quaich: whisky.quaich
                });
                setImagePreview(whisky.image);
            } else {
                reset({
                    name: '',
                    description: '',
                    image: '',
                    order: Math.max(...existingOrders, 0) + 1,
                    quaich: false
                });
                setImagePreview(null);
            }
            setImageFile(null);
        }
    }, [open, whisky, reset, existingOrders]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: WhiskyInput) => {
        // Check if marking as quaich and there's already a quaich
        if (data.quaich && currentQuaichId && currentQuaichId !== whisky?.id) {
            setPendingData(data);
            setShowQuaichWarning(true);
            return;
        }

        await saveWhisky(data);
    };

    const saveWhisky = async (data: WhiskyInput) => {
        try {
            let imageUrl = data.image;

            // Upload image if a new file was selected
            if (imageFile) {
                imageUrl = await uploadImage(imageFile, 'images');
            }

            await addOrUpdateWhisky(meetingId, {
                ...data,
                image: imageUrl
            });

            toast.success(
                whisky
                    ? 'Whisky updated successfully'
                    : 'Whisky added successfully'
            );

            onClose();
        } catch (error) {
            toast.error('Failed to save whisky');
        }
    };

    const handleQuaichConfirm = async () => {
        if (pendingData) {
            await saveWhisky(pendingData);
            setShowQuaichWarning(false);
            setPendingData(null);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {whisky ? 'Edit Whisky' : 'Add Whisky'}
                        </DialogTitle>
                        <DialogDescription>
                            {whisky
                                ? 'Update the whisky details'
                                : 'Add a new whisky to the meeting'}
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                placeholder="Enter whisky name"
                                aria-invalid={errors.name ? 'true' : 'false'}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                placeholder="Enter whisky description"
                                rows={4}
                                aria-invalid={
                                    errors.description ? 'true' : 'false'
                                }
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Image</Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                >
                                    <Upload className="h-4 w-4" />
                                </Button>
                            </div>
                            {imagePreview && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview || '/placeholder.svg'}
                                        alt="Preview"
                                        className="h-32 w-32 object-cover rounded-md"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">Order</Label>
                            <Input
                                id="order"
                                type="number"
                                {...register('order', { valueAsNumber: true })}
                                placeholder="Enter order number"
                                aria-invalid={errors.order ? 'true' : 'false'}
                            />
                            {errors.order && (
                                <p className="text-sm text-destructive">
                                    {errors.order.message}
                                </p>
                            )}
                            <p className="text-sm text-muted-foreground">
                                If this order already exists, other whiskies
                                will be pushed up
                            </p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="quaich"
                                checked={quaichValue}
                                onCheckedChange={(checked) =>
                                    setValue('quaich', checked as boolean)
                                }
                            />
                            <Label htmlFor="quaich" className="cursor-pointer">
                                Mark as Quaich (only one per meeting)
                            </Label>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="cursor-pointer"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="cursor-pointer"
                            >
                                {isSubmitting
                                    ? 'Saving...'
                                    : whisky
                                      ? 'Update'
                                      : 'Add'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={showQuaichWarning}
                onOpenChange={setShowQuaichWarning}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Override Quaich?</AlertDialogTitle>
                        <AlertDialogDescription>
                            There is already a Quaich selected for this meeting.
                            Marking this whisky as the Quaich will remove the
                            Quaich status from the previous whisky. Do you want
                            to continue?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setPendingData(null)}
                            className="cursor-pointer"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleQuaichConfirm}
                            className="cursor-pointer"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default WhiskyDialog;
