'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { User } from '@prisma/client';

import { SubmitButton } from '../form/Buttons';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { MemberSchema } from '@/schemas/members';
import { createMember, updateMember } from '@/actions/members';
import FormError from '../form/FormError';

const MemberForm = ({ member }: { member?: User }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const title = member ? 'Update Member' : 'Add Member';
    const description = member
        ? 'Update existing member'
        : 'Create a new member';
    const action = member ? 'Update Member' : 'Create Member';

    const form = useForm<z.infer<typeof MemberSchema>>({
        resolver: zodResolver(MemberSchema),
        defaultValues: {
            email: member?.email || '',
            firstName: member?.firstName || '',
            lastName: member?.lastName || ''
        }
    });

    const onSubmit = (values: z.infer<typeof MemberSchema>) => {
        startTransition(() => {
            member
                ? updateMember(values, member.id)
                      .then((data) => {
                          if (data?.error) {
                              setError(data.error);
                          }
                          if (data?.success) {
                              router.refresh();
                              router.push(`/dashboard/members/`);
                              toast.success('Member updated');
                          }
                      })
                      .catch(() => setError('Something went wrong'))
                : createMember(values)
                      .then((data) => {
                          if (data?.error) {
                              setError(data.error);
                          }
                          if (data?.success) {
                              router.refresh();
                              router.push(`/dashboard/members/`);
                              toast.success('Member created');
                          }
                      })
                      .catch(() => setError('Something went wrong'));
        });
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
            </div>
            <Separator />
            <Form {...form}>
                <FormError message={error} />
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-3/4 space-y-8"
                >
                    <div className="gap-8 md:grid md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="firstName"
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
                        className="ml-auto"
                        text={action}
                    />
                </form>
            </Form>
        </>
    );
};

export default MemberForm;
