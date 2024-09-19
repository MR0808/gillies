'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { MeetingSchemaSubmit } from '@/schemas/meetings';
import { useCreateMeeting } from '@/features/meetings/useCreateMeeting';
import { useEditMeeting } from '@/features/meetings/useEditMeeting';
import { useGetMeeting } from '@/features/meetings/useGetMeeting';
import { useGetWhiskies } from '@/features/whiskies/useGetWhiskies';
import MeetingForm from './MeetingForm';
import WhiskyClient from './WhiskyClient';

const MeetingFormLayout = ({ edit }: { edit: boolean }) => {
    const params = useParams<{ meetingid: string }>();
    const meetingid = params.meetingid;
    const meetingQuery = useGetMeeting(meetingid);
    const isLoading = meetingQuery.isLoading;

    const whiskiesQuery = useGetWhiskies(meetingid);
    const whiskies = whiskiesQuery.data || [];
    const isLoadingWhisky = whiskiesQuery.isLoading;

    const [isPending, setIsPending] = useState(false);

    const mutationCreate = useCreateMeeting();
    const mutationEdit = useEditMeeting(meetingid);

    const router = useRouter();

    const title = edit ? 'Update Meeting' : 'Add Meeting';
    const description = edit
        ? 'Update existing meeting'
        : 'Create a new meeting';
    const action = edit ? 'Update meeting' : 'Create meeting';

    const defaultValues = meetingQuery.data
        ? {
              location: meetingQuery.data.location || '',
              date: new Date(meetingQuery.data.date) || ''
          }
        : {
              location: '',
              date: new Date()
          };

    const onSubmit = (values: z.infer<typeof MeetingSchemaSubmit>) => {
        setIsPending(true);
        edit
            ? mutationEdit.mutate(values, {
                  onSuccess: () => {
                      setIsPending(false);
                  },
                  onError: () => {
                      setIsPending(false);
                  }
              })
            : mutationCreate.mutate(values, {
                  onSuccess: (data) => {
                      router.push(`/dashboard/meetings/${data.data.id}`);
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
            {isLoading || isLoadingWhisky ? (
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            ) : (
                <>
                    <MeetingForm
                        action={action}
                        defaultValues={defaultValues}
                        onSubmit={onSubmit}
                        isPending={isPending}
                    />
                    {edit && (
                        <>
                            <Separator />
                            <WhiskyClient whiskies={whiskies} />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default MeetingFormLayout;
