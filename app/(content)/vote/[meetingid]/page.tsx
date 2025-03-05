import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { redirect } from 'next/navigation';

import VotingClient from '@/components/voting/VotingClient';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { getMeetingWhiskiesByUser } from '@/actions/voting';
import { currentUser } from '@/lib/auth';

const VotePage = async (props: { params: Promise<{ meetingid: string }> }) => {
    const user = await currentUser();
    if (!user) {
        redirect('/auth/login');
    }
    const params = await props.params;
    const whiskies = await getMeetingWhiskiesByUser(params.meetingid);

    return (
        <Card className="w-[320px] sm:w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🥃 Gillies Voting System
                </p>
            </CardHeader>
            <CardContent>
                <Separator className="mb-4" />
                <Suspense
                    fallback={
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    }
                >
                    {!whiskies.data ? (
                        <div>No whiskies found</div>
                    ) : (
                        <VotingClient whiskies={whiskies.data} />
                    )}
                </Suspense>
            </CardContent>
        </Card>
    );
};

export default VotePage;
