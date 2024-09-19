'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { ReloadIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleHelp } from 'lucide-react';

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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

import FormError from '@/components/form/FormError';
import { ResetPasswordSchema } from '@/schemas/auth';
import { cn } from '@/lib/utils';

type FormValues = z.input<typeof ResetPasswordSchema>;

type Props = {
    onSubmit: (values: FormValues) => void;
    isPending: boolean;
    error: string | undefined;
};

const NewPasswordForm = ({ onSubmit, isPending, error }: Props) => {
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormError message={error} />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={cn('flex flex-row gap-x-1')}
                                >
                                    Password
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <CircleHelp className="w-4 h-4" />
                                            </TooltipTrigger>
                                            <TooltipContent
                                                className={cn('w-40')}
                                            >
                                                <p>
                                                    Password must be at least 8
                                                    characters and contain at
                                                    least one lowercase, one
                                                    uppercase, one number and
                                                    one special character
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
                                <FormLabel>Confirm Password</FormLabel>
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
                <Button disabled={isPending} type="submit" className="w-full">
                    {isPending ? (
                        <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                        </>
                    ) : (
                        <>Update</>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default NewPasswordForm;
