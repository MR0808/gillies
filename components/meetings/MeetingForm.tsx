'use client';

import * as z from 'zod';
import { format, sub, parseJSON } from 'date-fns';
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

import { MeetingSchema } from '@/schemas/meetings';
import { cn } from '@/lib/utils';

type FormValues = z.input<typeof MeetingSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    isPending: boolean;
    action: string;
};

const MeetingForm = ({
    id,
    defaultValues,
    onSubmit,
    isPending,
    action
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [stringDate, setStringDate] = useState<string | null>(
        defaultValues?.date || null
    );
    const [date, setDate] = useState<Date | null>(null);
    if (defaultValues) {
        const tempDate = parseJSON(defaultValues.date);
        setDate(tempDate);
    }

    const form = useForm<z.infer<typeof MeetingSchema>>({
        resolver: zodResolver(MeetingSchema),
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
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    placeholder="location"
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
                                                    'do MMMM, yyyy'
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
                                        captionLayout="dropdown"
                                        selected={
                                            date || parseJSON(field.value)
                                        }
                                        onSelect={(selectedDate) => {
                                            setDate(selectedDate!);
                                            field.onChange(selectedDate);
                                        }}
                                        onDayClick={() => setIsOpen(false)}
                                        fromYear={1900}
                                        toYear={sub(new Date(), {
                                            years: 18
                                        }).getFullYear()}
                                        disabled={(date) =>
                                            Number(date) >
                                            Number(
                                                sub(new Date(), {
                                                    years: 18
                                                })
                                            )
                                        }
                                        defaultMonth={
                                            date ||
                                            sub(new Date(), {
                                                years: 18
                                            })
                                        }
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

export default MeetingForm;
