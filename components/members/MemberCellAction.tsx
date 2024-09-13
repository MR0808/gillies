'use client';
import { Edit, MoreHorizontal, Trash, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

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
import { MemberCellActionProps } from '@/types';
import { resendInvite, deleteMember } from '@/actions/members';

const MemberCellAction: React.FC<MemberCellActionProps> = ({ data }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [isPendingDelete, startTransitionDelete] = useTransition();
    const [isPendingResend, startTransitionResend] = useTransition();
    const [openResend, setOpenResend] = useState(false);
    const router = useRouter();

    const onConfirmDelete = () => {
        deleteMember(data.id)
            .then(() => setOpenDelete(false))
            .catch((error) => console.log(error));
    };
    const handleResend = () => {
        startTransitionResend(() => {
            setOpenResend(true);
            resendInvite(data.email!).catch((error) => console.log(error));
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
