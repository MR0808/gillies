import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import MemberFormLayout from '@/components/members/MemberFormLayout';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { getMember } from '@/actions/members';
import { checkAuthenticated } from '@/lib/auth';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' },
    { title: 'Update Member', link: '/dashboard/member/new' }
];

const MemberEditPage = async (props: {
    params: Promise<{ memberid: string }>;
}) => {
    const user = await checkAuthenticated(true);
    if (!user) {
        redirect('/auth/login');
    }
    const params = await props.params;
    const member = await getMember(params.memberid);

    return (
        <PageContainer scrollable={true}>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-center justify-between">
                    <Heading
                        title="Edit Member"
                        description="Edit the below member"
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
