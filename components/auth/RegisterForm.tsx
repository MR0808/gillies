'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useTransition, useState, useEffect, useCallback } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleHelp } from 'lucide-react';

import { RegisterSchema } from '@/schemas/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from '@/components/ui/form';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import CardWrapper from './CardWrapper';
import FormError from '@/components/form/FormError';
import FormSuccess from '@/components/form/FormSuccess';
import { verifyRegistration, register } from '@/actions/register';
import { cn } from '@/lib/utils';

const RegisterForm = () => {
    const [errorToken, setErrorToken] = useState<string | undefined>();
    const [successToken, setSuccessToken] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const onPageLoad = useCallback(() => {
        if (successToken || errorToken) return;

        if (!token) {
            setError('Missing token!');
            return;
        }

        verifyRegistration(token)
            .then((data) => {
                setSuccessToken(data.success);
                setErrorToken(data.error);
            })
            .catch(() => {
                setErrorToken('Something went wrong!');
            });
    }, [token, successToken, errorToken]);

    useEffect(() => {
        onPageLoad();
    }, [onPageLoad]);

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            register(values, token)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError('Something went wrong'));
        });
    };

    return (
        <CardWrapper
            headerLabel="Welcome to the Gillies Voting System"
            backButtonLabel="Already registered? Login"
            backButtonHref="/auth/login"
        >
            {successToken ? (
                success ? (
                    <div className="flex flex-col items-center w-full justify-center">
                        <FormSuccess message={success} />
                    </div>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <FormDescription>
                                    Thanks for confirming your registration.
                                    Please enter your email and create a
                                    password below.
                                </FormDescription>
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

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className={cn(
                                                    'flex flex-row gap-x-1'
                                                )}
                                            >
                                                Password
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <CircleHelp className="w-4 h-4" />
                                                        </TooltipTrigger>
                                                        <TooltipContent
                                                            className={cn(
                                                                'w-40'
                                                            )}
                                                        >
                                                            <p>
                                                                Password must be
                                                                at least 8
                                                                characters and
                                                                contain at least
                                                                one lowercase,
                                                                one uppercase,
                                                                one number and
                                                                one special
                                                                character
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="w-full"
                            >
                                Register
                            </Button>
                        </form>
                    </Form>
                )
            ) : (
                <div className="flex flex-col items-center w-full justify-center">
                    {!errorToken && <BeatLoader />}
                    {errorToken && <FormError message={errorToken} />}
                </div>
            )}
        </CardWrapper>
    );
};

export default RegisterForm;
