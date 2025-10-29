import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

import Breadcrumbs from '@/components/global/Breadcrumbs';
import MemberForm from '@/components/members/MemberForm';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { authCheckAdmin } from '@/lib/authCheck';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' },
    { title: 'Create Member', link: '/dashboard/member/new' }
];
const NewMemberPage = async () => {
    const userSession = await authCheckAdmin('/dashboard/members/new');

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
                    <MemberForm />
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default NewMemberPage;
