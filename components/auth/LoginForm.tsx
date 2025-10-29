'use client';

import * as z from 'zod';
import { useForm, SubmitErrorHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2 } from 'lucide-react';

import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoginSchema } from '@/schemas/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { login } from '@/actions/login';
import { cn } from '@/lib/utils';

const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callbackURL') || '/';
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: true
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(async () => {
            const data = await login(values);
            const { error, emailVerified } = data;
            if (error) {
                toast.error(error, { position: 'top-center' });
            } else {
                toast.success('Log in successful', { position: 'top-center' });
                if (!emailVerified) {
                    router.push('/auth/verify-email');
                } else if (emailVerified) {
                    router.push(callbackURL);
                }
            }
        });
    };

    const onError: SubmitErrorHandler<z.infer<typeof LoginSchema>> = (
        errors
    ) => {
        const errorMessages = Object.entries(errors).map(([field, error]) => (
            <li key={field}>{error.message || `Invalid ${field}`}</li>
        ));

        toast.dismiss();

        toast.error('There were errors in your login', {
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
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel>Password</FormLabel>
                                    <Link
                                        href="/auth/forgot-password"
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="******"
                                        type="password"
                                        autoComplete="on"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem
                                className={cn(
                                    'flex flex-row items-center space-x-2'
                                )}
                            >
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="my-auto peer rounded border-gray-300 dark:border-gray-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500"
                                    />
                                </FormControl>
                                <FormLabel
                                    className={cn(
                                        'flex cursor-pointer items-center gap-2 text-xs font-medium leading-none text-gray-700 dark:text-gray-200'
                                    )}
                                >
                                    Keep me signed in
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={isPending} type="submit" className="w-full">
                    {isPending ? (
                        <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                        </>
                    ) : (
                        'Login'
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
