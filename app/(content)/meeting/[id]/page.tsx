import { authCheck } from '@/lib/authCheck';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import PortalLayout from '@/components/portalLayout/PortalLayout';
import WhiskyVoting from '@/components/voting/WhiskyVoting';
import { Button } from '@/components/ui/button';
import { getMeetingWhiskies } from '@/actions/voting';
import { getAllMeetings } from '@/actions/meetings';

export const revalidate = 60;

export async function generateStaticParams() {
    const meetings = await getAllMeetings();

    return meetings.map((w) => ({
        id: w.id
    }));
}

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
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="shrink-0"
                    >
                        <Link href="/">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Rate Whiskies
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Swipe through and rate each whisky
                        </p>
                    </div>
                </div>

                <WhiskyVoting whiskies={whiskies.data || []} />
            </div>
        </PortalLayout>
    );
}
