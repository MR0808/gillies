'use client';

import * as z from 'zod';
import { Plus } from 'lucide-react';
import { InferResponseType } from 'hono';
import { client } from '@/lib/hono';
import { useState } from 'react';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { WhiskyColumns } from './WhiskyColumns';
import AddWhiskyModal from '@/components/modal/AddWhiskyModal';

export type ResponseType = InferResponseType<
    (typeof client.api.whiskies)[':meetingid']['$get'],
    200
>['data'];

const WhiskyClient = ({
    whiskies,
    meetingid
}: {
    whiskies: ResponseType;
    meetingid: string;
}) => {
    const [openEdit, setOpenEdit] = useState(false);

    const defaultValues = {
        name: '',
        description: '',
        quaich: false
    };

    return (
        <>
            <AddWhiskyModal
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                defaultValues={defaultValues}
                edit={false}
                mutation={{ meetingid }}
            />
            <div className="flex sm:flex-row flex-col items-start justify-between">
                <Heading
                    title={`Whiskies (${whiskies.length})`}
                    description=""
                />
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                        className="text-xs md:text-sm"
                        onClick={() => {
                            setOpenEdit(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>
            </div>
            <Separator />
            <DataTable
                searchKey="name"
                columns={WhiskyColumns}
                data={whiskies}
            />
        </>
    );
};

export default WhiskyClient;
