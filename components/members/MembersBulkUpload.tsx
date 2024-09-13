'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SubmitButton } from '../form/Buttons';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import FormError from '../form/FormError';
import FormSuccess from '../form/FormSuccess';

const MembersBulkUpload = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Bulk Upload Members"
                    description="Use the below form to bulk upload and invite members"
                />
            </div>
            <Separator />
            <Form {...form}>
                <FormError message={error} />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
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
                    </div>
                    <SubmitButton
                        isPending={isPending}
                        className="ml-auto"
                        text={action}
                    />
                </form>
            </Form>
        </>
    );
};
export default MembersBulkUpload;
