import React from 'react';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import MeetingFormLayout from '@/components/meetings/MeetingFormLayout';
import PageContainer from '@/components/dashboardLayout/PageContainer';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' },
    { title: 'Update Member', link: '/dashboard/member/new' }
];

const MeetingEditPage = () => {
    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <MeetingFormLayout edit={true} />
            </div>
        </PageContainer>
    );
};

export default MeetingEditPage;
