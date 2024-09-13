'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { memberColumns } from './MemberColumns';

interface MembersClientProps {
    data: User[];
}

const MemberClient: React.FC<MembersClientProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Members (${data.length})`}
                    description="Manage members below"
                />
                <Button
                    className="text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/members/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                searchKey="lastName"
                columns={memberColumns}
                data={data}
            />
        </>
    );
};

export default MemberClient;
