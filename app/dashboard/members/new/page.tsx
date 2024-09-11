import React from 'react';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import MemberForm from '@/components/members/MemberForm';
import PageContainer from '@/components/layout/PageContainer';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' },
    { title: 'Create Member', link: '/dashboard/member/new' }
];
export default function Page() {
    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <MemberForm />
            </div>
        </PageContainer>
    );
}
