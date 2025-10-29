'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { SettingsTabsProps } from '@/types/settings';
import ProfilePictureForm from '@/components/settings/ProfilePictureForm';
import NameForm from '@/components/settings/NameForm';

const ProfileSettings = ({ userSession }: SettingsTabsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Update your profile picture and personal details
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ProfilePictureForm userSession={userSession} />
                <NameForm userSession={userSession} />
            </CardContent>
        </Card>
    );
};

export default ProfileSettings;
