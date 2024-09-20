'use client';

import * as z from 'zod';
import { format, add } from 'date-fns';
import { enAU } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';

import { SubmitButton } from '../form/Buttons';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import { WhiskySchema, WhiskySchemaForm } from '@/schemas/whisky';
import { cn } from '@/lib/utils';

type FormValues = z.input<typeof WhiskySchemaForm>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    isPending: boolean;
    action: string;
};

const WhiskyForm = ({
    id,
    defaultValues,
    onSubmit,
    isPending,
    action
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof WhiskySchemaForm>>({
        resolver: zodResolver(WhiskySchemaForm),
        defaultValues
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-3/4 space-y-8"
            >
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    placeholder="Location"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel>Meeting Date</FormLabel>
                            <Popover open={isOpen} onOpenChange={setIsOpen}>
                                <PopoverTrigger asChild className="h-12">
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full font-normal',
                                                !field.value &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            {field.value ? (
                                                `${format(
                                                    field.value,
                                                    'yyyy-MM-dd'
                                                )}`
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        locale={enAU}
                                        captionLayout="dropdown"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        onDayClick={() => setIsOpen(false)}
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />
                <SubmitButton
                    isPending={isPending}
                    className="ml-auto"
                    text={action}
                />
            </form>
        </Form>
    );
};

export default WhiskyForm;
