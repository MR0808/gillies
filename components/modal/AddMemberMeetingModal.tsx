'use client';

import * as z from 'zod';
import { useEffect, useState, useTransition } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { SubmitButton } from '@/components/form/Buttons';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { MeetingMemberSchema } from '@/schemas/meetings';
import { updateMeetingMembers } from '@/actions/meetings';
import kyInstance from '@/lib/ky';

type FormValues = z.input<typeof MeetingMemberSchema>;

interface AddMemberMeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultValues: FormValues;
    meetingid: string;
}

const AddMemberMeetingModal: React.FC<AddMemberMeetingModalProps> = ({
    isOpen,
    onClose,
    defaultValues,
    meetingid
}) => {
    const { data, status } = useQuery({
        queryKey: ['members'],
        queryFn: () => kyInstance.get(`/api/members`).json<User[]>()
    });

    const [isMounted, setIsMounted] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof MeetingMemberSchema>>({
        resolver: zodResolver(MeetingMemberSchema),
        defaultValues
    });

    const members = data || [];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const onSubmit = (values: z.infer<typeof MeetingMemberSchema>) => {
        startTransition(() => {
            updateMeetingMembers(values, meetingid).then((data) => {
                if (data?.data) {
                    form.reset();
                    onClose();
                }
            });
        });
    };

    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked);
        const allMembers = checked ? members.map((member) => member.id) : [];
        form.setValue('members', allMembers);
    };

    if (status === 'pending') {
        return (
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
        );
    }

    if (status === 'error') {
        return (
            <p className="text-center text-destructive">
                An error occurred while loading posts.
            </p>
        );
    }

    return (
        <Modal
            title="Update Members"
            description=""
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col w-full items-center justify-end space-x-2 gap-y-3">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-3/4 space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="members"
                            render={() => (
                                <FormItem className="flex flex-col items-start">
                                    <div className="space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={selectAll}
                                                onCheckedChange={
                                                    handleSelectAll
                                                }
                                            />
                                        </FormControl>
                                        <FormLabel className="text-sm font-bold">
                                            Select All
                                        </FormLabel>
                                    </div>
                                    <div className="grid grid-rows-10 grid-flow-col">
                                        {members.map((member) => (
                                            <FormField
                                                key={member.id}
                                                control={form.control}
                                                name="members"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={member.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(
                                                                        member.id
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) => {
                                                                        return checked
                                                                            ? field.onChange(
                                                                                  [
                                                                                      ...field.value,
                                                                                      member.id
                                                                                  ]
                                                                              )
                                                                            : field.onChange(
                                                                                  field.value?.filter(
                                                                                      (
                                                                                          value
                                                                                      ) =>
                                                                                          value !==
                                                                                          member.id
                                                                                  )
                                                                              );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal">
                                                                {`${member.firstName} ${member.lastName}`}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <SubmitButton
                                isPending={isPending}
                                className="ml-auto"
                                text="Update Members"
                            />
                            <Button
                                disabled={isPending}
                                onClick={onClose}
                                size="lg"
                                type="button"
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};

export default AddMemberMeetingModal;
