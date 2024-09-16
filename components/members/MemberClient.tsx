'use client';

import * as z from 'zod';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { memberColumns } from './MemberColumns';
import UploadButton from './UploadButton';
import ImportCard from './ImportCard';
import { MemberUploadSchema } from '@/schemas/members';
import { useGetMembers } from '@/features/members/useGetMembers';

enum VARIANT {
    LIST = 'LIST',
    IMPORT = 'IMPORT'
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    error: [],
    meta: {}
};

const MemberClient = () => {
    const membersQuery = useGetMembers();
    const members = membersQuery.data || [];

    const router = useRouter();
    const [variant, setVariant] = useState<VARIANT>(VARIANT.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setVariant(VARIANT.IMPORT);
        setImportResults(results);
    };

    const onCancelImport = () => {
        setVariant(VARIANT.LIST);
        setImportResults(INITIAL_IMPORT_RESULTS);
    };

    const onSubmitImport = async (
        values: z.infer<typeof MemberUploadSchema>
    ) => {
        console.log(values);
    };

    if (variant === VARIANT.IMPORT) {
        return (
            <>
                <ImportCard
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={onSubmitImport}
                />
            </>
        );
    }

    return (
        <>
            <div className="flex sm:flex-row flex-col items-start justify-between">
                <Heading
                    title={`Members (${members.length})`}
                    description="Manage members below"
                />
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                        className="text-xs md:text-sm"
                        onClick={() => router.push(`/dashboard/members/new`)}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                    <UploadButton onUpload={onUpload} />
                </div>
            </div>
            <Separator />
            <DataTable
                searchKey="lastName"
                columns={memberColumns}
                data={members}
            />
        </>
    );
};

export default MemberClient;
