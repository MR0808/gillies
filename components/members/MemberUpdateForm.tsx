'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '@prisma/client';

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

import { MemberUpdateSchema } from '@/schemas/members';
import { updateMember } from '@/actions/members';

const MemberUpdateForm = ({ member }: { member: User }) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState('');
    const router = useRouter();

    const form = useForm<z.infer<typeof MemberUpdateSchema>>({
        resolver: zodResolver(MemberUpdateSchema),
        defaultValues: {
            name: member.name || '',
            lastName: member.lastName || '',
            email: member.email || ''
        }
    });

    const onSubmit = (values: z.infer<typeof MemberUpdateSchema>) => {
        startTransition(async () => {
            const data = await updateMember(values, member?.id);
            console.log(data);
            if (data.data) {
                router.push(`/dashboard/members/`);
            }
            if (data.error) {
                setError(data.error);
            }
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-3/4 space-y-8"
            >
                {error && <div className="text-destructive">{error}</div>}
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
                    text="Update member"
                />
            </form>
        </Form>
    );
};

export default MemberUpdateForm;
