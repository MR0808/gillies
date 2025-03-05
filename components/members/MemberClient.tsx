'use client';

import * as z from 'zod';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { User } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { memberColumns } from './MemberColumns';
import UploadButton from './UploadButton';
import ImportCard from './ImportCard';
import { MemberImportSchema } from '@/schemas/members';
import { createMembers } from '@/actions/members';

enum VARIANT {
    LIST = 'LIST',
    IMPORT = 'IMPORT'
}

const INITIAL_IMPORT_RESULTS = {
    data: [],
    error: [],
    meta: {}
};

const MemberClient = ({ members }: { members: User[] }) => {
    const router = useRouter();
    const [variant, setVariant] = useState<VARIANT>(VARIANT.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);
    const [isPending, startTransition] = useTransition();

    const onUpload = async (results: typeof INITIAL_IMPORT_RESULTS) => {
        setVariant(VARIANT.IMPORT);
        setImportResults(results);
    };

    const onCancelImport = () => {
        setVariant(VARIANT.LIST);
        setImportResults(INITIAL_IMPORT_RESULTS);
    };

    const onSubmitImport = async (
        values: z.infer<typeof MemberImportSchema>
    ) => {
        startTransition(() => {
            createMembers(values).then((data) => {
                if (data?.data) {
                    onCancelImport();
                }
            });
        });
    };

    if (variant === VARIANT.IMPORT) {
        return (
            <>
                <ImportCard
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={onSubmitImport}
                    isPending={isPending}
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
