import React from 'react';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import MemberFormLayout from '@/components/members/MemberFormLayout';
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
                <MemberFormLayout edit={false} />
            </div>
        </PageContainer>
    );
}
