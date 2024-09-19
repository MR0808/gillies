'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';

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
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import CardWrapper from './CardWrapper';
import { useForgotPassword } from '@/features/forgotpassword/useForgotPassword';

const ForgotPasswordForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, setIsPending] = useState(false);

    const mutation = useForgotPassword();

    const form = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: ''
        }
    });

    const onSubmit = (values: z.infer<typeof EmailSchema>) => {
        setError('');
        setSuccess('');
        setIsPending(true);
        mutation.mutate(values, {
            onSuccess: (data) => {
                setIsPending(false);
                setSuccess(data.message);
            },
            onError: (error) => {
                setError(error.message);
                setIsPending(false);
            }
        });
    };

    return (
        <CardWrapper
            headerLabel="Forgot password"
            backButtonLabel="Remember your password?"
            backButtonHref="/auth/login"
            backButton={true}
        >
            {success ? (
                <FormSuccess message={success} />
            ) : (
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormError message={error} />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            {isPending ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </form>
                </Form>
            )}
        </CardWrapper>
    );
};
export default ForgotPasswordForm;
