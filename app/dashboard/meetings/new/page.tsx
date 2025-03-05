import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import MeetingFormLayout from '@/components/meetings/MeetingFormLayout';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { checkAuthenticated } from '@/lib/auth';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Meetings', link: '/dashboard/meetings' },
    { title: 'Create Meeting', link: '/dashboard/meetings/new' }
];
const NewMeetingPage = async () => {
    const user = await checkAuthenticated(true);
    if (!user) {
        redirect('/auth/login');
    }
    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <Heading
                        title="Add Meeting"
                        description="Create a new meeting"
                    />
                </div>
                <Separator />
                <Suspense
                    fallback={
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    }
                >
                    <MeetingFormLayout />
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default NewMeetingPage;
