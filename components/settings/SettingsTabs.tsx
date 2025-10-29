'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SettingsTabsProps } from '@/types/settings';
import ProfileSettings from '@/components/settings/ProfileSettings';
import EmailSettings from '@/components/settings/EmailSettings';
import PasswordSettings from '@/components/settings/PasswordSettings';

const SettingsTabs = ({ userSession }: SettingsTabsProps) => {
    return (
        <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
                <ProfileSettings userSession={userSession} />
            </TabsContent>

            <TabsContent value="email">
                <EmailSettings userSession={userSession} />
            </TabsContent>

            <TabsContent value="password">
                <PasswordSettings userSession={userSession} />
            </TabsContent>
        </Tabs>
    );
};

export default SettingsTabs;
