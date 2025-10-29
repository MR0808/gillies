import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { Separator } from '@radix-ui/react-dropdown-menu';

import VotingClient from '@/components/voting/VotingClient';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { getMeetingWhiskiesByUser } from '@/actions/voting';
import { authCheck } from '@/lib/authCheck';

const VotePage = async (props: { params: Promise<{ meetingid: string }> }) => {
    const params = await props.params;
    const session = await authCheck(`/vote/${params.meetingid}`);

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
