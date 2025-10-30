import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import ResultsClient from '@/components/results/ResultsClient';
import { getMeetingResults } from '@/actions/results';
import { authCheckAdmin } from '@/lib/authCheck';

const ResultsPage = async ({
    params
}: {
    params: Promise<{ meetingid: string }>;
}) => {
    const { meetingid } = await params;
    const userSession = await authCheckAdmin(`/dashboard/${meetingid}/results`);
    const results = await getMeetingResults(meetingid);
    console.log(results);

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
                    <Heading title={`Whiskies`} description="" />
                </div>
                <Separator />
                <Suspense
                    fallback={
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    }
                >
                    {!results.meeting ? (
                        <div>No meeting results found</div>
                    ) : (
                        // <ResultsClient results={results.data} />
                        <></>
                    )}
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default ResultsPage;
