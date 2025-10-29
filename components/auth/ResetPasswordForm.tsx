'use client';

import type { z } from 'zod';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { useForm, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResetPasswordSchema } from '@/schemas/auth';
import { resetPassword } from '@/lib/auth-client';

const ResetPasswordForm = ({ token }: { token: string }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        startTransition(async () => {
            await resetPassword({
                newPassword: values.password,
                token,
                fetchOptions: {
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    },
                    onSuccess: async () => {
                        toast.dismiss();
                        toast.success('Password reset successfully.', {
                            position: 'top-center'
                        });
                        router.push('/auth/login');
                    }
                }
            });
        });
    };

    const onError: SubmitErrorHandler<z.infer<typeof ResetPasswordSchema>> = (
        errors
    ) => {
        const errorMessages = Object.entries(errors).map(([field, error]) => (
            <li key={field}>{error.message || `Invalid ${field}`}</li>
        ));

        toast.dismiss();

        toast.error('There were errors while resettting password', {
            position: 'top-center',
            description: (
                <ul className="list-disc ml-4 space-y-1">{errorMessages}</ul>
            ),
            closeButton: true,
            duration: Infinity
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-4"
            >
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Resetting...
                        </>
                    ) : (
                        'Reset password'
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default ResetPasswordForm;
