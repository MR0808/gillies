import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { redirect } from 'next/navigation';

import VoteFormLayout from '@/components/voting/VoteFormLayout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { getWhiskyForVoting } from '@/actions/voting';
import { currentUser } from '@/lib/auth';

const VotePage = async (props: { params: Promise<{ whiskyid: string }> }) => {
    const user = await currentUser();
    if (!user) {
        redirect('/auth/login');
    }
    const params = await props.params;
    const review = await getWhiskyForVoting(params.whiskyid);

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
                    {!review.data ? (
                        <div>No whisky found</div>
                    ) : (
                        <VoteFormLayout rating={review.data} />
                    )}
                </Suspense>
            </CardContent>
        </Card>
    );
};

export default VotePage;
