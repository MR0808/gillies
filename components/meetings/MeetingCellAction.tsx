'use client';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
import { Button } from '@/components/ui/button';
import { useDeleteMember } from '@/features/members/useDeleteMember';

export type ResponseType = InferResponseType<
    typeof client.api.meetings.$get,
    200
>['data'][0];

const MeetingCellAction = ({ data }: { data: ResponseType }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const router = useRouter();

    const deleteMutation = useDeleteMember(data.id);

    const onConfirmDelete = () => {
        deleteMutation.mutate(undefined, {
            onSuccess: () => {
                setOpenDelete(false);
            }
        });
    };

    return (
        <>
            <AlertModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={onConfirmDelete}
                loading={deleteMutation.isPending}
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
                    <DropdownMenuItem
                        onClick={() =>
                            router.push(`/dashboard/members/${data.id}`)
                        }
                    >
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

export default MeetingCellAction;
