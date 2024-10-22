'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MeetingSchemaSubmit } from '@/schemas/meetings';
import MeetingForm from './MeetingForm';
import WhiskyClient from './WhiskyClient';
import MembersClient from './MembersClient';
import { cn } from '@/lib/utils';
import { Meeting } from '@/types/index';
import { updateMeeting, createMeeting } from '@/actions/meetings';

const MeetingFormLayout = ({ meeting }: { meeting?: Meeting }) => {
    const [isPending, startTransition] = useTransition();

    const whiskies = meeting?.whiskies || [];
    const members = meeting?.users || [];

    const router = useRouter();

    const action = meeting ? 'Update meeting' : 'Create meeting';

    const defaultValues = meeting
        ? {
              location: meeting.location || '',
              date: new Date(meeting.date) || ''
          }
        : {
              location: '',
              date: new Date()
          };

    const onSubmit = (values: z.infer<typeof MeetingSchemaSubmit>) => {
        startTransition(() => {
            if (meeting) {
                updateMeeting(values, meeting?.id).then((data) => {
                    if (data?.data) {
                        router.push(`/dashboard/meetings/${data.data.id}`);
                    }
                });
            } else {
                createMeeting(values).then((data) => {
                    if (data?.data) {
                        router.push(`/dashboard/meetings/${data.data.id}`);
                    }
                });
            }
        });
    };

    return (
        <>
            <MeetingForm
                action={action}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                isPending={isPending}
            />
            {meeting && (
                <>
                    <Separator />
                    <Tabs defaultValue="whiskies" className="w-full">
                        <TabsList className={cn('mb-4')}>
                            <TabsTrigger value="whiskies">Whiskies</TabsTrigger>
                            <TabsTrigger value="members">Members</TabsTrigger>
                        </TabsList>
                        <TabsContent value="whiskies">
                            <WhiskyClient
                                whiskies={whiskies}
                                meetingid={meeting.id}
                            />
                        </TabsContent>
                        <TabsContent value="members">
                            <MembersClient
                                members={members}
                                meetingid={meeting.id}
                            />
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </>
    );
};

export default MeetingFormLayout;
