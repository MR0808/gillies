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
import MeetingDetailsForm from '@/components/meetings/MeetingDetailsForm';
// import { WhiskiesManager } from '@/components/whiskies-manager';
// import { MembersManager } from '@/components/members-manager';
import { Meeting } from '@/types/meeting';

const MeetingManager = ({ meeting }: { meeting: Meeting }) => {
    const [activeTab, setActiveTab] = useState('whiskies');

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Meeting Details</CardTitle>
                    <CardDescription>
                        Update the meeting date and location
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <MeetingDetailsForm meeting={meeting} />
                </CardContent>
            </Card>

            {/* <Tabs
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
                    <WhiskiesManager meeting={meeting} />
                </TabsContent>

                <TabsContent value="members" className="space-y-4">
                    <MembersManager meeting={meeting} />
                </TabsContent>
            </Tabs> */}
        </div>
    );
};

export default MeetingManager;
