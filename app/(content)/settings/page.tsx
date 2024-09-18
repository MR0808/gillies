import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { auth } from '@/auth';
import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import ProfilePictureForm from '@/components/settings/ProfilePictureForm';
import NameForm from '@/components/settings/NameForm';
import { cn } from '@/lib/utils';

const SettingsPage = async () => {
    const user = await currentUser();
    if (!user) {
        return (
            <Card className="w-[320px] sm:w-[600px]">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">
                        ⚙️ Settings
                    </p>
                </CardHeader>
                <CardContent>No user found</CardContent>
            </Card>
        );
    }
    const session = await auth();
    const userDb = await getUserById(user.id!);

    return (
        <Card className="w-[320px] sm:w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    ⚙️ Settings
                </p>
            </CardHeader>
            <CardContent
                className={cn('p-0 flex flex-col justify-center items-center')}
            >
                <ProfilePictureForm session={session} />
                <NameForm session={session} />
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
