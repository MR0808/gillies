import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/layout/PageContainer';
import MemberClient from '@/components/members/MemberClient';
import { users } from '@/constants/data';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' }
];
export default function page() {
    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                <MemberClient data={users} />
            </div>
        </PageContainer>
    );
}
