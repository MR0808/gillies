import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/layout/PageContainer';
import MemberClient from '@/components/members/MemberClient';
import { fetchAllMembers } from '@/actions/members';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' }
];

const MembersPage = async () => {
    // const users = await fetchAllMembers();
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
