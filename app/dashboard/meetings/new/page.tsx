import React from 'react';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import MeetingFormLayout from '@/components/meetings/MeetingFormLayout';
import PageContainer from '@/components/dashboardLayout/PageContainer';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Meetings', link: '/dashboard/meetings' },
    { title: 'Create Meeting', link: '/dashboard/meetings/new' }
];
export default function Page() {
    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <MeetingFormLayout edit={false} />
            </div>
        </PageContainer>
    );
}
