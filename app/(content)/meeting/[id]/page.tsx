import { authCheck } from '@/lib/authCheck';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import PortalLayout from '@/components/portalLayout/PortalLayout';
import WhiskyVoting from '@/components/voting/WhiskyVoting';
import { Button } from '@/components/ui/button';
import { getMeetingWhiskies } from '@/actions/voting';

export default async function MeetingVotingPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const userSession = await authCheck(`/meetings/${id}`);
    const whiskies = await getMeetingWhiskies(id);

    return (
        <PortalLayout userSession={userSession}>
            <div className="space-y-6 mx-auto">
                <div className="flex gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/portal">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Vote on Whiskies
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Rate each whisky from 0-10 and leave your thoughts
                        </p>
                    </div>
                </div>

                <WhiskyVoting whiskies={whiskies.data || []} />
            </div>
        </PortalLayout>
    );
}
