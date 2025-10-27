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
        startTransitionDelete(async () => {
            const result = await deleteMember(data.id);
            if (result.data) {
                setOpenDelete(false);
            }
            if (result.error) {
                toast.error(result.error);
            }
        });
    };

    const handleResend = () => {
        setOpenResend(true);
        startTransitionResend(async () => {
            await resendInvite(data.id);
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
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 cursor-pointer"
                    >
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
                        className="cursor-pointer"
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    {data.role === 'USER' && (
                        <DropdownMenuItem
                            onClick={() => setOpenDelete(true)}
                            className="cursor-pointer"
                        >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    )}
                    {!data.registered && (
                        <DropdownMenuItem
                            onClick={handleResend}
                            className="cursor-pointer"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" /> Resend Invite
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default MemberCellAction;
