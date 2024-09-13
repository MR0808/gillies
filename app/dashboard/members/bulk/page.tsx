import Breadcrumbs from '@/components/global/Breadcrumbs';
import PageContainer from '@/components/layout/PageContainer';
import MembersBulkUpload from '@/components/members/MembersBulkUpload';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Members', link: '/dashboard/members' },
    { title: 'Bulk Upload Members', link: '/dashboard/members/bulk' }
];

const BulkUploadMembersPage = async () => {
    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                <MembersBulkUpload />
            </div>
        </PageContainer>
    );
};

export default BulkUploadMembersPage;
