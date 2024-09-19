'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { MeetingSchema } from '@/schemas/meetings';
import { useCreateMeeting } from '@/features/meetings/useCreateMeeting';
import { useEditMeeting } from '@/features/meetings/useEditMeeting';
import { useGetMeeting } from '@/features/meetings/useGetMeeting';
import MeetingForm from './MeetingForm';

const MeetingFormLayout = ({ edit }: { edit: boolean }) => {
    const params = useParams<{ meetingid: string }>();
    const meetingid = params.meetingid;
    const meetingQuery = useGetMeeting(meetingid);
    const isLoading = meetingQuery.isLoading;

    const mutationCreate = useCreateMeeting();
    const mutationEdit = useEditMeeting(meetingid);

    const router = useRouter();

    const [isPending, setIsPending] = useState(false);

    const title = edit ? 'Update Member' : 'Add Member';
    const description = edit ? 'Update existing member' : 'Create a new member';
    const action = edit ? 'Update Member' : 'Create Member';

    const defaultValues = meetingQuery.data
        ? {
              location: meetingQuery.data.location || '',
              date: meetingQuery.data.date || ''
          }
        : {
              location: '',
              date: ''
          };

    const onSubmit = (values: z.infer<typeof MeetingSchema>) => {
        setIsPending(true);
        edit
            ? mutationEdit.mutate(values, {
                  onSuccess: () => {
                      //   router.push(`/dashboard/members/`);
                  },
                  onError: () => {
                      setIsPending(false);
                  }
              })
            : mutationCreate.mutate(values, {
                  onSuccess: () => {
                      //   router.push(`/dashboard/members/`);
                  },
                  onError: () => {
                      setIsPending(false);
                  }
              });
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
            </div>
            <Separator />
            {isLoading ? (
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            ) : (
                <MeetingForm
                    action={action}
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                    isPending={isPending}
                />
            )}
        </>
    );
};

export default MeetingFormLayout;
