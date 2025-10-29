'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitErrorHandler } from 'react-hook-form';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SessionProps } from '@/types/session';
import { UpdatePasswordSchema } from '@/schemas/settings';
import { useSession, authClient } from '@/lib/auth-client';
import { sendPasswordResetNotificationEmail } from '@/lib/mail';
import { cn } from '@/lib/utils';

const PasswordSettings = ({ userSession }: SessionProps) => {
    const { refetch } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
        resolver: zodResolver(UpdatePasswordSchema),
        defaultValues: {
            currentPassword: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
        startTransition(async () => {
            await authClient.changePassword({
                newPassword: values.password,
                currentPassword: values.currentPassword,
                revokeOtherSessions: true,
                fetchOptions: {
                    onError: (ctx) => {
                        toast.dismiss();
                        toast.error('Current password is incorrect');
                    },
                    onSuccess: async () => {
                        if (userSession && userSession.user) {
                            await sendPasswordResetNotificationEmail({
                                email: userSession.user.email,
                                name: userSession.user.name
                            });
                        }
                        toast.dismiss();
                        refetch();
                        toast.success('Password successfully updated');
                        form.reset(values);
                    }
                }
            });
        });
    };

    const onError: SubmitErrorHandler<z.infer<typeof UpdatePasswordSchema>> = (
        errors
    ) => {
        const errorMessages = Object.entries(errors).map(([field, error]) => (
            <li key={field}>{error.message || `Invalid ${field}`}</li>
        ));

        toast.dismiss();

        toast.error('Please fix the following errors:', {
            description: (
                <ul className="list-disc ml-4 space-y-1">{errorMessages}</ul>
            ),
            closeButton: true,
            duration: Infinity
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                    Change your password to keep your account secure
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem
                                        className={cn('w-full md:w-1/5 mb-5')}
                                    >
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="Current Password"
                                                disabled={isPending}
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
                                    <FormItem
                                        className={cn('w-full md:w-1/5 mb-5')}
                                    >
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="New Password"
                                                disabled={isPending}
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
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem
                                        className={cn('w-full md:w-1/5 mb-5')}
                                    >
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="Confirm Password"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Update password'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default PasswordSettings;
