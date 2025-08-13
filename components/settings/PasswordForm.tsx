'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { SubmitButton } from '@/components/form/Buttons';
import { AccountFormInput } from '@/components/form/FormInput';
import FormError from '@/components/form/FormError';
import { ResetPasswordSchema } from '@/schemas/auth';
import { cn } from '@/lib/utils';
import { updatePasswordSettings } from '@/actions/resetPassword';

const PasswordForm = ({ session }: { session: Session | null }) => {
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

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    const cancel = () => {
        form.reset();
        setEdit(!edit);
        setError(undefined);
    };

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        startTransition(() => {
            if (user?.email) {
                updatePasswordSettings(values, user.email).then((data) => {
                    if (data?.success) {
                        setEdit(false);
                        update();
                        setError(undefined);
                        form.reset(values);
                        toast.success(data.success);
                    }
                    if (data?.error) {
                        setError(data.error);
                    }
                });
            }
        });
    };

    return (
        <div className="flex flex-col gap-5 w-full px-4 border-b border-b-gray-200 py-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">Password</h3>
                <div
                    className="cursor-pointer text-base font-normal hover:underline"
                    onClick={cancel}
                >
                    {edit ? 'Cancel' : 'Edit'}
                </div>
            </div>
            {edit && (
                <Form {...form}>
                    <form
                        className="space-y-6 w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-x-6">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className={cn('w-full mb-5')}>
                                        <FormControl>
                                            <AccountFormInput
                                                {...field}
                                                name="password"
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className={cn('w-full')}>
                                        <FormControl>
                                            <AccountFormInput
                                                {...field}
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="Confirm Password"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {error && (
                            <div className="flex flex-row gap-x-6">
                                <div className="basis-full">
                                    <FormError message={error} />
                                </div>
                            </div>
                        )}
                        <div className="flex-1">
                            <SubmitButton text="update" isPending={isPending} />
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};
export default PasswordForm;
