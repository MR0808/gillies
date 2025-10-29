'use client';

import * as z from 'zod';
import { useForm, SubmitErrorHandler } from 'react-hook-form';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CheckCircle2, Loader2 } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmailSchema } from '@/schemas/auth';
import { forgetPassword } from '@/lib/auth-client';

const ForgotPasswordForm = () => {
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: ''
        }
    });

    const onSubmit = (values: z.infer<typeof EmailSchema>) => {
        setSuccess(false);
        startTransition(async () => {
            await forgetPassword({
                email: values.email,
                redirectTo: '/auth/reset-password',
                fetchOptions: {
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    },
                    onSuccess: async () => {
                        setSuccess(true);
                        toast.success(
                            'Reset password email sent successfully!'
                        );
                    }
                }
            });
        });
    };

    const onError: SubmitErrorHandler<z.infer<typeof EmailSchema>> = (
        errors
    ) => {
        toast.dismiss();

        toast.error('Please enter a valid email', {
            position: 'top-center',
            closeButton: true,
            duration: Infinity
        });
    };

    return (
        <>
            {!success ? (
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                    >
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="john.doe@example.com"
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm text-destructive" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full cursor-pointer"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                'Send reset link'
                            )}
                        </Button>
                    </form>
                </Form>
            ) : (
                <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>
                        If an account exists with that email, you'll receive a
                        password reset link shortly.
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
};
export default ForgotPasswordForm;
