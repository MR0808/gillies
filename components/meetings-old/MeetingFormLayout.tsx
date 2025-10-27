'use client';

import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WhiskyClient from './WhiskyClient';
import MembersClient from './MembersClient';
import { cn } from '@/lib/utils';
import { Meeting } from '@/types/index';
import MeetingUpdateForm from '@/components/meetings-old/MeetingUpdateForm';

const MeetingFormLayout = ({ meeting }: { meeting: Meeting }) => {
    const whiskies = meeting?.whiskies || [];
    const members = meeting?.users || [];

    return (
        <>
            <MeetingUpdateForm meeting={meeting} />
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
