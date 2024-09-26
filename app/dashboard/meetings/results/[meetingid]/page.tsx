import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import ResultsClient from '@/components/results/ResultsClient';

const ResultsPage = async ({ params }: { params: { meetingid: string } }) => {
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
                <ResultsClient meetingid={params.meetingid} />
            </div>
        </PageContainer>
    );
};

export default ResultsPage;
