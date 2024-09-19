import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import MeetingClient from '@/components/meetings/MeetingClient';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Meetings', link: '/dashboard/meetings' }
];

const MeetingsPage = async () => {
    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                <MeetingClient />
            </div>
        </PageContainer>
    );
};

export default MeetingsPage;
