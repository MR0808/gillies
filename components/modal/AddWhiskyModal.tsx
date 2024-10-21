'use client';

import * as z from 'zod';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { SubmitButton } from '@/components/form/Buttons';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { WhiskySchema } from '@/schemas/whisky';
import { updateWhisky, createWhisky } from '@/actions/whiskies';
import WhiskyImageUpload from '../meetings/WhiskyImageUpload';

type FormValues = z.input<typeof WhiskySchema>;

interface AddWhiskyModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultValues: FormValues;
    meetingid: string;
    id?: string;
}

const AddWhiskyModal: React.FC<AddWhiskyModalProps> = ({
    isOpen,
    onClose,
    defaultValues,
    meetingid,
    id
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const action = id ? 'Update whisky' : 'Create whisky';

    const form = useForm<z.infer<typeof WhiskySchema>>({
        resolver: zodResolver(WhiskySchema),
        defaultValues
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const onSubmit = (values: z.infer<typeof WhiskySchema>) => {
        startTransition(() => {
            if (id) {
                const formData = new FormData();
                values.image[0] &&
                    formData.append('image', values.image[0].value);
                formData.append('name', values.name);
                formData.append('imageUrl', values.imageUrl || '');
                values.description &&
                    formData.append('description', values.description);
                formData.append('quaich', String(values.quaich));
                formData.append('order', String(values.order));
                updateWhisky(formData, meetingid, id).then((data) => {
                    console.log(data);
                    if (data?.data) {
                        form.reset();
                        onClose();
                    }
                    if (data?.error) {
                        toast.error(data.error);
                    }
                });
            } else {
                const formData = new FormData();
                formData.append('image', values.image[0].value);
                formData.append('name', values.name);
                values.description &&
                    formData.append('description', values.description);
                formData.append('quaich', String(values.quaich));
                formData.append('order', String(values.order));
                createWhisky(formData, meetingid).then((data) => {
                    if (data?.data) {
                        form.reset();
                        onClose();
                    }
                    if (data?.error) {
                        toast.error(data?.error);
                    }
                });
            }
        });
    };

    return (
        <Modal
            title="Add Whisky"
            description=""
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col w-full items-center justify-end space-x-2 gap-y-3">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-3/4 space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="hidden" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <WhiskyImageUpload />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Whisky Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            placeholder="Whisky Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Whisky Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Whisky description"
                                            className="resize-none"
                                            disabled={isPending}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="order"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Order</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            placeholder="Order"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quaich"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between">
                                    <div className="space-y-0.5">
                                        <FormLabel>Quaich</FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <SubmitButton
                                isPending={isPending}
                                className="ml-auto"
                                text={action}
                            />
                            <Button
                                disabled={isPending}
                                onClick={onClose}
                                size="lg"
                                type="button"
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};

export default AddWhiskyModal;
