'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { InferResponseType } from 'hono';
import { client } from '@/lib/hono';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import AlertModal from '@/components/modal/AlertModal';
import AddWhiskyModal from '@/components/modal/AddWhiskyModal';
import { Button } from '@/components/ui/button';
import { useDeleteWhisky } from '@/features/whiskies/useDeleteWhisky';

export type ResponseType = InferResponseType<
    (typeof client.api.whiskies)[':meetingid']['$get'],
    200
>['data'][0];

const WhiskyCellAction = ({ data }: { data: ResponseType }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const deleteMutation = useDeleteWhisky(data.id);

    const onConfirmDelete = () => {
        deleteMutation.mutate(undefined, {
            onSuccess: () => {
                setOpenDelete(false);
            }
        });
    };

    const defaultValues = {
        name: data.name,
        description: data.description || '',
        quaich: data.quaich
    };

    return (
        <>
            <AlertModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={onConfirmDelete}
                loading={deleteMutation.isPending}
            />
            <AddWhiskyModal
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                defaultValues={defaultValues}
                edit={true}
                mutation={{ meetingid: data.meetingId, id: data.id }}
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default WhiskyCellAction;
