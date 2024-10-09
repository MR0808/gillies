import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import ResultsClient from '@/components/results/ResultsClient';
import { getMeetingResults } from '@/actions/results';

const ResultsPage = async ({ params }: { params: { meetingid: string } }) => {
    const results = await getMeetingResults(params.meetingid);

    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Meetings', link: '/dashboard/meetings' },
        {
            title: 'Results',
            link: `/dashboard/meetings/results/${params.meetingid}`
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
                    {!results.data ? (
                        <div>No meetings found</div>
                    ) : (
                        <ResultsClient results={results.data} />
                    )}
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default ResultsPage;
