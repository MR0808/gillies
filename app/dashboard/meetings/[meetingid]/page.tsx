import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import MeetingFormLayout from '@/components/meetings/MeetingFormLayout';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { getMeeting } from '@/actions/meetings';
import { checkAuthenticated } from '@/lib/auth';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' },
    { title: 'Update Member', link: '/dashboard/member/new' }
];

const MeetingEditPage = async (props: {
    params: Promise<{ meetingid: string }>;
}) => {
    const user = await checkAuthenticated(true);
    if (!user) {
        redirect('/auth/login');
    }
    const params = await props.params;
    const meeting = await getMeeting(params.meetingid);

    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <Heading
                        title="Edit Member"
                        description="Edit the below meeting"
                    />
                </div>
                <Separator />
                <Suspense
                    fallback={
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    }
                >
                    <MeetingFormLayout meeting={meeting.data} />
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default MeetingEditPage;
