'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import MeetingDetailsForm from '@/components/meetings/view/MeetingDetailsForm';
import WhiskyManager from '@/components/meetings/view/whiskies/WhiskyManager';
import { MeeetingManagerProps } from '@/types/meeting';
import MemberManager from '@/components/meetings/view/members/MemberManager';
import { Badge } from '@/components/ui/badge';

const MeetingManager = ({ meeting, members }: MeeetingManagerProps) => {
    const [activeTab, setActiveTab] = useState('whiskies');

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Meeting Details{' '}
                        <Badge
                            variant={
                                meeting.status === 'OPEN'
                                    ? 'default'
                                    : 'secondary'
                            }
                        >
                            {meeting.status}
                        </Badge>
                    </CardTitle>
                    <CardDescription>
                        Update the meeting date and location
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <MeetingDetailsForm meeting={meeting} />
                </CardContent>
            </Card>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="whiskies">
                        Whiskies ({meeting.whiskies.length})
                    </TabsTrigger>
                    <TabsTrigger value="members">
                        Members ({meeting.users.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="whiskies" className="space-y-4">
                    <WhiskyManager meeting={meeting} />
                </TabsContent>

                <TabsContent value="members" className="space-y-4">
                    <MemberManager meeting={meeting} members={members} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MeetingManager;
