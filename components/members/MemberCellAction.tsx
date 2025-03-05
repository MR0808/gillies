'use client';
import { Edit, MoreHorizontal, Trash, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { User } from '@prisma/client';
import { toast } from 'sonner';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import AlertModal from '@/components/modal/AlertModal';
import ResendModal from '@/components/modal/ResendModal';
import { Button } from '@/components/ui/button';
import { deleteMember, resendInvite } from '@/actions/members';

export type ResponseType = User;

const MemberCellAction = ({ data }: { data: ResponseType }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [openResend, setOpenResend] = useState(false);
    const router = useRouter();
    const [isPendingDelete, startTransitionDelete] = useTransition();
    const [isPendingResend, startTransitionResend] = useTransition();

    const onConfirmDelete = () => {
        startTransitionDelete(() => {
            deleteMember(data.id).then((data) => {
                if (data?.data) {
                    setOpenDelete(false);
                }
                if (data?.error) {
                    toast.error(data.error);
                }
            });
        });
    };

    const handleResend = () => {
        setOpenResend(true);
        startTransitionResend(() => {
            resendInvite(data.id).then((data) => {});
        });
    };

    return (
        <>
            <AlertModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={onConfirmDelete}
                loading={isPendingDelete}
            />
            <ResendModal
                isOpen={openResend}
                onClose={() => setOpenResend(false)}
                loading={isPendingResend}
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
                    {!data.registered && (
                        <DropdownMenuItem onClick={handleResend}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Resend Invite
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default MemberCellAction;
