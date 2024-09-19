'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { SubmitButton } from '@/components/form/Buttons';
import { AccountFormInput } from '@/components/form/FormInput';
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import { EmailSchema } from '@/schemas/auth';
import { cn } from '@/lib/utils';
import { useEditEmail } from '@/features/settings/useEditEmail';

const EmailForm = ({ session }: { session: Session | null }) => {
    const [user, setUser] = useState(session?.user);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { data: newSession, update } = useSession();
    const [isPending, setIsPending] = useState(false);
    const [closeText, setCloseText] = useState('Cancel');

    const mutation = useEditEmail();

    useEffect(() => {
        if (newSession && newSession.user) {
            setUser(newSession?.user);
        }
    }, [newSession]);

    const form = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: user?.email || ''
        }
    });

    const cancel = () => {
        form.reset();
        setEdit(!edit);
        setError(undefined);
        setSuccess(undefined);
        setCloseText('Cancel');
    };

    const onSubmit = (values: z.infer<typeof EmailSchema>) => {
        setIsPending(true);
        mutation.mutate(values, {
            onSuccess: () => {
                update();
                form.reset();
                setError(undefined);
                setSuccess(
                    'Email successfully updated, you will need to verify this email though'
                );
                setCloseText('Close');
                setIsPending(false);
            },
            onError: (error) => {
                setIsPending(false);
                setError(error.message);
            }
        });
    };

    return (
        <div className="flex flex-col gap-5 w-full px-4 py-8">
            <div className="flex justify-between">
                <h3 className="font-semibold text-base">Email</h3>
                <div
                    className="cursor-pointer text-base font-normal hover:underline"
                    onClick={cancel}
                >
                    {edit ? closeText : 'Edit'}
                </div>
            </div>
            {edit ? (
                <Form {...form}>
                    <form
                        className="space-y-6 w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-row gap-x-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className={cn('w-full')}>
                                        <FormControl>
                                            <AccountFormInput
                                                {...field}
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {(success || error) && (
                            <div className="flex flex-row gap-x-6">
                                <div className="basis-full">
                                    <FormError message={error} />
                                    <FormSuccess message={success} />
                                </div>
                            </div>
                        )}
                        <div className="flex-1">
                            <SubmitButton text="update" isPending={isPending} />
                        </div>
                    </form>
                </Form>
            ) : (
                <div
                    className={`${
                        !user?.email && 'italic'
                    } text-base font-normal`}
                >
                    {user?.email ? `${user.email}` : 'Not specified'}
                </div>
            )}
        </div>
    );
};
export default EmailForm;
