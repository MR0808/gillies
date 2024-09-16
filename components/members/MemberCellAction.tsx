'use client';
import { Edit, MoreHorizontal, Trash, RefreshCw } from 'lucide-react';
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
import ResendModal from '@/components/modal/ResendModal';
import { Button } from '@/components/ui/button';
import { useResendMember } from '@/features/members/useResendMember';

export type ResponseType = InferResponseType<
    typeof client.api.members.$get,
    200
>['data'][0];

const MemberCellAction = ({ data }: { data: ResponseType }) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [openResend, setOpenResend] = useState(false);
    const router = useRouter();

    const resendMutation = useResendMember(data.id);

    const onConfirmDelete = () => {
        // deleteMember(data.id)
        //     .then(() => setOpenDelete(false))
        //     .catch((error) => console.log(error));
    };

    const handleResend = () => {
        setOpenResend(true);
        resendMutation.mutate(undefined);
    };

    return (
        <>
            <AlertModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={onConfirmDelete}
                loading={false}
            />
            <ResendModal
                isOpen={openResend}
                onClose={() => setOpenResend(false)}
                loading={resendMutation.isPending}
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
