import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import { getMeetings } from '@/actions/meetings';
import { authCheckAdmin } from '@/lib/authCheck';
import MeetingsList from '@/components/meetings/list/MeetingsList';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Meetings', link: '/dashboard/meetings' }
];

const MeetingsPage = async () => {
    const userSession = await authCheckAdmin('/dashboard/meetings');
    const meetings = await getMeetings();
    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                <Suspense
                    fallback={
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-[400px] w-full" />
                        </div>
                    }
                >
                    {!meetings.data ? (
                        <div>No meetings found</div>
                    ) : (
                        <MeetingsList meetings={meetings.data} />
                    )}
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default MeetingsPage;
