import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { getMeeting } from '@/actions/meetings';
import { checkAuthenticated } from '@/lib/auth';
import MeetingManager from '@/components/meetings/view/MeetingManager';
import { getMembersFirstName } from '@/actions/members';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Meetings', link: '/dashboard/meetings' },
    { title: 'Update Meeting', link: '/dashboard/member/new' }
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
    const allMembers = await getMembersFirstName();

    if (!allMembers.data) {
        return (
            <PageContainer scrollable={true}>
                <div className="space-y-4">
                    <Breadcrumbs items={breadcrumbItems} />
                    <div className="flex items-center justify-between">
                        <Heading
                            title="Edit Meeting"
                            description="Edit the below meeting"
                        />
                    </div>
                    <Separator />
                    <Suspense
                        fallback={
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        }
                    >
                        <div>No members found</div>
                    </Suspense>
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <Heading
                        title="Edit Meeting"
                        description="Edit the below meeting"
                    />
                </div>
                <Separator />
                <Suspense
                    fallback={
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    }
                >
                    {meeting.data ? (
                        <MeetingManager
                            meeting={meeting.data}
                            members={allMembers.data}
                        />
                    ) : (
                        <div>No meeting found</div>
                    )}
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default MeetingEditPage;
