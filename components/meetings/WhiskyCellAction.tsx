'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

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
import { MeetingWhiskies } from '@/types';
import { deleteWhisky } from '@/actions/whiskies';

const WhiskyCellAction = ({ data }: { data: MeetingWhiskies }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [isPending, startTransition] = useTransition();

    const onConfirmDelete = () => {
        startTransition(() => {
            deleteWhisky(data.id).then((data) => {
                if (data?.data) {
                    setOpenDelete(false);
                }
                if (data?.error) {
                    toast.error(data.error);
                }
            });
        });
    };

    const defaultValues = {
        name: data.name,
        description: data.description || '',
        quaich: data.quaich,
        order: data.order || 0,
        image: [],
        imageUrl: data.image || ''
    };

    return (
        <>
            <AlertModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={onConfirmDelete}
                loading={isPending}
            />
            <AddWhiskyModal
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                defaultValues={defaultValues}
                meetingid={data.meetingId}
                id={data.id}
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
