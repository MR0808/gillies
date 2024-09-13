import React from 'react';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import MemberForm from '@/components/members/MemberForm';
import PageContainer from '@/components/layout/PageContainer';
import { getUserById } from '@/data/user';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' },
    { title: 'Update Member', link: '/dashboard/member/new' }
];

const MemberEditPage = async ({ params }: { params: { memberid: string } }) => {
    const { memberid } = params;
    const member = await getUserById(memberid);
    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <MemberForm member={member!} />
            </div>
        </PageContainer>
    );
};

export default MemberEditPage;
