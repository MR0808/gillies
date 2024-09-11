import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/layout/PageContainer';
import { UserClient } from '@/components/tables/user-tables/client';
import { users } from '@/constants/data';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'User', link: '/dashboard/user' }
];
export default function page() {
    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                <UserClient data={users} />
            </div>
        </PageContainer>
    );
}
