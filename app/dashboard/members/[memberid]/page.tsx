import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import MemberFormLayout from '@/components/members/MemberFormLayout';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { getMember } from '@/actions/members';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' },
    { title: 'Update Member', link: '/dashboard/member/new' }
];

const MemberEditPage = async ({ params }: { params: { memberid: string } }) => {
    const member = await getMember(params.memberid);

    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <Heading
                        title="Add Member"
                        description="Create a new member"
                    />
                </div>
                <Separator />
                <Suspense
                    fallback={
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    }
                >
                    <MemberFormLayout member={member.data} />
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default MemberEditPage;
