import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import MemberClient from '@/components/members/MemberClient';
import { getMembers } from '@/actions/members';
import { checkAuthenticated } from '@/lib/auth';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' }
];

const MembersPage = async () => {
    const user = await checkAuthenticated(true);
    if (!user) {
        redirect('/auth/login');
    }
    const members = await getMembers();
    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                <Suspense
                    fallback={
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    }
                >
                    {!members.data ? (
                        <div>No meetings found</div>
                    ) : (
                        <MemberClient members={members.data} />
                    )}
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default MembersPage;
