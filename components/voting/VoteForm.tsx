'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/form/Buttons';

import { VotingSchema } from '@/schemas/voting';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FormValues = z.input<typeof VotingSchema>;

type Props = {
    whiskyid: string;
    defaultValues?: FormValues;
    onSubmit: ({
        values,
        whiskyid
    }: {
        values: FormValues;
        whiskyid: string;
    }) => void;
    isPending: boolean;
    meetingid: string;
};

const VoteForm = ({
    whiskyid,
    defaultValues,
    onSubmit,
    isPending,
    meetingid
}: Props) => {
    const form = useForm<z.infer<typeof VotingSchema>>({
        resolver: zodResolver(VotingSchema),
        defaultValues
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit({ values, whiskyid });
    };

    const router = useRouter();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full space-y-6"
            >
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    placeholder="Rating"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comments</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Comments"
                                    className="resize-none"
                                    disabled={isPending}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton
                    isPending={isPending}
                    className="ml-auto"
                    text="Vote"
                />
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className={cn('ml-4')}
                    onClick={() => router.push(`/vote/${meetingid}`)}
                >
                    Cancel
                </Button>
            </form>
        </Form>
    );
};

export default VoteForm;
