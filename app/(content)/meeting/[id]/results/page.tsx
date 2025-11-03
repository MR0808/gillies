import { authCheck } from '@/lib/authCheck';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { format } from 'date-fns';
import { unstable_cache } from 'next/cache';

import PortalLayout from '@/components/portalLayout/PortalLayout';
import { Button } from '@/components/ui/button';
import { ResultsCharts } from '@/components/results/ResultsChart';
import { ResultsTable } from '@/components/results/ResultsTable';
import { getMeetingResults } from '@/actions/results';

export default async function MeetingVotingPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const userSession = await authCheck(`/meetings/${id}`);
    const results = await getMeetingResults(id);

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
                            Whisky Results
                        </h1>
                    </div>
                </div>
                <Suspense
                    fallback={
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    }
                >
                    {!results.data ? (
                        <div>No meeting results found</div>
                    ) : (
                        <>
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-muted-foreground mt-2">
                                        {results.data.meetingName} •{' '}
                                        {format(
                                            new Date(results.data.meetingDate),
                                            'MMMM dd, yyyy'
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <ResultsCharts
                                    whiskies={results.data.whiskies}
                                />
                                <ResultsTable
                                    whiskies={results.data.whiskies}
                                    quaichId={results.data.meetingQuaich}
                                />
                            </div>
                        </>
                    )}
                </Suspense>
            </div>
        </PortalLayout>
    );
}
