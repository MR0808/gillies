import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';

import MainClient from '@/components/mainPage/MainClient';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { getUserMeetings } from '@/actions/voting';
import { currentUser } from '@/lib/auth';

const SettingsPage = async () => {
    const user = await currentUser();
    if (!user) {
        redirect('/auth/login');
    }
    const meetings = await getUserMeetings();

    return (
        <Card className="w-[320px] sm:w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🥃 Gillies Voting System
                </p>
            </CardHeader>
            <CardContent>
                Welcome to the Gillies Voting System. Please choose your meeting
                to review or vote for.
                <Separator className="mb-4" />
                <Suspense
                    fallback={
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    }
                >
                    {!meetings.data ? (
                        <div>No meetings found</div>
                    ) : (
                        <MainClient meetings={meetings.data} />
                    )}
                </Suspense>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
