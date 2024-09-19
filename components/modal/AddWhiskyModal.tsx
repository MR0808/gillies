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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { WhiskySchema } from '@/schemas/whisky';

interface AddWhiskyModalProps {
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
}

type FormValues = z.input<typeof WhiskySchema>;

const AddWhiskyModal: React.FC<AddWhiskyModalProps> = ({
    isOpen,
    onClose,
    loading
}) => {
    const [isMounted, setIsMounted] = useState(false);

    const form = useForm<z.infer<typeof WhiskySchema>>({
        resolver: zodResolver(WhiskySchema),
        defaultValues: {
            name: '',
            description: '',
            image: undefined,
            quaich: false
        }
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleSubmit = (values: FormValues) => {
        console.log(values);
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
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="w-3/4 space-y-8"
                    >
                        <div className="gap-8 md:grid md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="First Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                placeholder="Last Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                disabled={isPending}
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <SubmitButton
                            isPending={isPending}
                            className="ml-auto"
                            text={action}
                        />
                    </form>
                </Form>
                <Button disabled={loading} onClick={onClose}>
                    Close
                </Button>
            </div>
        </Modal>
    );
};

export default AddWhiskyModal;
