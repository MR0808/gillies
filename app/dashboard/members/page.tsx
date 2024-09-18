import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import MemberClient from '@/components/members/MemberClient';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' }
];

const MembersPage = async () => {
    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                <MemberClient />
            </div>
        </PageContainer>
    );
};

export default MembersPage;
