'use client';

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { useEditWhisky } from '@/features/whiskies/useEditWhisky';
import { useCreateWhisky } from '@/features/whiskies/useCreateWhisky';
import FormError from '../form/FormError';

type FormValues = z.input<typeof WhiskySchema>;

interface AddWhiskyModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultValues: FormValues;
    edit: boolean;
    mutation: { meetingid: string; id?: string };
}

const AddWhiskyModal: React.FC<AddWhiskyModalProps> = ({
    isOpen,
    onClose,
    defaultValues,
    edit,
    mutation
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const action = edit ? 'Update whisky' : 'Create whisky';

    const mutationCreate = useCreateWhisky(mutation.meetingid);
    const mutationEdit = useEditWhisky(mutation.meetingid, mutation.id);

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
        setIsPending(true);
        edit
            ? mutationEdit.mutate(values, {
                  onSuccess: () => {
                      form.reset();
                      setIsPending(false);
                      onClose();
                  },
                  onError: () => {
                      setIsPending(false);
                  }
              })
            : mutationCreate.mutate(values, {
                  onSuccess: () => {
                      form.reset();
                      setIsPending(false);
                      onClose();
                  },
                  onError: () => {
                      setIsPending(false);
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
