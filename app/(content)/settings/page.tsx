import { redirect } from 'next/navigation';

import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { auth } from '@/auth';
import { currentUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import ProfilePictureForm from '@/components/settings/ProfilePictureForm';
import NameForm from '@/components/settings/NameForm';
import PasswordForm from '@/components/settings/PasswordForm';
import EmailForm from '@/components/settings/EmailForm';

const SettingsPage = async () => {
    const user = await currentUser();
    if (!user) {
        redirect('/auth/login');
    }
    // if (!user) {
    //     return (
    //         <Card className="w-[320px] sm:w-[600px]">
    //             <CardHeader>
    //                 <p className="text-2xl font-semibold text-center">
    //                     ⚙️ Settings
    //                 </p>
    //             </CardHeader>
    //             <CardContent>No user found</CardContent>
    //         </Card>
    //     );
    // }
    const session = await auth();

    return (
        <Card className="w-[320px] sm:w-[600px] mb-8">
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
                <PasswordForm session={session} />
                <EmailForm session={session} />
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
