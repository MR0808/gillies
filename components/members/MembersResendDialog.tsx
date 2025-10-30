'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MemberResendDialogProps } from '@/types/members';
import { resendInvite } from '@/actions/members';

const MemberResendDialog = ({
    open,
    onOpenChange,
    memberId
}: MemberResendDialogProps) => {
    const [isPending, startTransition] = useTransition();

    async function handleConfirm() {
        startTransition(async () => {
            const data = await resendInvite(memberId);
            if (data.error) {
                toast.error('There was an error resending, please try again');
            }
            if (data.success) {
                toast.success('Invite resent');
                onOpenChange(false);
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-4/5">
                <DialogHeader>
                    <DialogTitle>Resend Invite</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to resend the invite to the user?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={isPending}
                        className="cursor-pointer"
                    >
                        {isPending ? (
                            <>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </>
                        ) : (
                            'Resend'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default MemberResendDialog;
