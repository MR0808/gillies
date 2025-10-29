'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { SubmitButton } from '@/components/form/Buttons';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MemberSchema } from '@/schemas/members';
import { createMember } from '@/actions/members';

const MemberForm = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof MemberSchema>>({
        resolver: zodResolver(MemberSchema),
        defaultValues: {
            name: '',
            lastName: '',
            email: ''
        }
    });

    const onSubmit = (values: z.infer<typeof MemberSchema>) => {
        startTransition(async () => {
            const data = await createMember(values);
            if (data?.data) {
                router.push(`/dashboard/members/`);
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-3/4 space-y-8"
            >
                <div className="gap-8 md:grid md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder="First Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        placeholder="Last Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        disabled={isPending}
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <SubmitButton
                    isPending={isPending}
                    className="ml-auto cursor-pointer"
                    text="Create Member"
                />
            </form>
        </Form>
    );
};

export default MemberForm;
