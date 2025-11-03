import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { format } from 'date-fns';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import { getMeetingResults } from '@/actions/results';
import { authCheckAdmin } from '@/lib/authCheck';
import { ResultsCharts } from '@/components/results/ResultsChart';
import { ResultsTable } from '@/components/results/ResultsTable';

const ResultsPage = async ({
    params
}: {
    params: Promise<{ meetingid: string }>;
}) => {
    const { meetingid } = await params;
    const userSession = await authCheckAdmin(`/dashboard/${meetingid}/results`);
    const results = await getMeetingResults(meetingid);

    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Meetings', link: '/dashboard/meetings' },
        { title: 'Meeting', link: `/dashboard/meetings/${meetingid}` },
        {
            title: 'Results',
            link: `/dashboard/meetings/${meetingid}/results/`
        }
    ];

    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex sm:flex-row flex-col items-start justify-between">
                    <Heading title={`Meeting Results`} description="" />
                </div>
                <Separator />
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
        </PageContainer>
    );
};

export default ResultsPage;
