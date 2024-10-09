'use client';

import { Edit, MoreHorizontal, Lock } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Meeting } from '@prisma/client';
import { toast } from 'sonner';

import { closeMeeting } from '@/actions/meetings';
import AlertModal from '@/components/modal/AlertModal';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

const MeetingCellAction = ({ data }: { data: Meeting }) => {
    const [openCloseMeeting, setOpenCloseMeeting] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const onConfirmClose = () => {
        startTransition(() => {
            closeMeeting(data.id).then((data) => {
                if (data?.data) {
                    setOpenCloseMeeting(false);
                }
                if (data?.error) {
                    toast.error(data.error);
                }
            });
        });
    };

    return (
        <>
            <AlertModal
                isOpen={openCloseMeeting}
                onClose={() => setOpenCloseMeeting(false)}
                onConfirm={onConfirmClose}
                loading={isPending}
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
                            router.push(`/dashboard/meetings/${data.id}`)
                        }
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenCloseMeeting(true)}>
                        <Lock className="mr-2 h-4 w-4" /> Close
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default MeetingCellAction;
