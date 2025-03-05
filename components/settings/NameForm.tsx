'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { toast } from 'sonner';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';

import { SubmitButton } from '@/components/form/Buttons';
import { AccountFormInput } from '@/components/form/FormInput';
import FormError from '@/components/form/FormError';
import { NameSchema } from '@/schemas/settings';
import { cn } from '@/lib/utils';
import { updateName } from '@/actions/settings';

const NameForm = ({ session }: { session: Session | null }) => {
    const [user, setUser] = useState(session?.user);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const { data: newSession, update } = useSession();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (newSession && newSession.user) {
            setUser(newSession?.user);
        }
    }, [newSession]);

    const errorClass = 'pl-6';

    const form = useForm<z.infer<typeof NameSchema>>({
        resolver: zodResolver(NameSchema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || ''
        }
    });

    const cancel = () => {
        form.reset();
        setEdit(!edit);
    };

    const onSubmit = (values: z.infer<typeof NameSchema>) => {
        startTransition(() => {
            updateName(values).then((data) => {
                if (data?.success) {
                    setEdit(false);
                    update();
                    setError(undefined);
                    form.reset(values);
                    toast.success(data.success)
                }
                if (data?.error) {
                    setError(data.error);
                }
            });
        })
    };

    return (
        <div className="flex flex-col gap-5 w-full px-4 border-y border-y-gray-200 py-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">Name</h3>
                <div
                    className="cursor-pointer text-base font-normal hover:underline"
                    onClick={cancel}
                >
                    {edit ? 'Cancel' : 'Edit'}
                </div>
            </div>
            {edit ? (
                <Form {...form}>
                    <FormError message={error} />
                    <form
                        className="space-y-6 w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-row gap-x-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className={cn('w-full')}>
                                        <FormControl>
                                            <AccountFormInput
                                                {...field}
                                                name="firstName"
                                                type="text"
                                                placeholder="First Name"
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className={cn('w-full')}>
                                        <FormControl>
                                            <AccountFormInput
                                                {...field}
                                                name="lastName"
                                                type="text"
                                                placeholder="Last Name"
                                            />
                                        </FormControl>
                                        <FormMessage className={errorClass} />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <SubmitButton text="update" isPending={isPending} />
                        </div>
                    </form>
                </Form>
            ) : (
                <div
                    className={`${
                        !user?.firstName && 'italic'
                    } text-base font-normal`}
                >
                    {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : 'Not specified'}
                </div>
            )}
        </div>
    );
};
export default NameForm;
