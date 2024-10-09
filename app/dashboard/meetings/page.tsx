import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import MeetingClient from '@/components/meetings/MeetingClient';
import { getMeetings } from '@/actions/meetings';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Meetings', link: '/dashboard/meetings' }
];

const MeetingsPage = async () => {
    const meetings = await getMeetings();
    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                <Suspense
                    fallback={
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    }
                >
                    {!meetings.data ? (
                        <div>No meetings found</div>
                    ) : (
                        <MeetingClient meetings={meetings.data} />
                    )}
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default MeetingsPage;
