'use client';

import { Plus } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { User } from '@/constants/data';
import { memberColumns } from './MemberColumns';
import FormSuccess from '../form/FormSuccess';

interface ProductsClientProps {
    data: User[];
}

const MemberClient: React.FC<ProductsClientProps> = ({ data }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const created = searchParams.get('created');

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Users (${data.length})`}
                    description="Manage users (Client side table functionalities.)"
                />
                <Button
                    className="text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/members/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={memberColumns} data={data} />
        </>
    );
};

export default MemberClient;
