'use client';

import { useTransition } from 'react';
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
import { CloseMeetingDialogProps } from '@/types/meeting';
import { closeMeeting } from '@/actions/meetings';

const CloseMeetingDialog = ({
    open,
    onOpenChange,
    meetingId
}: CloseMeetingDialogProps) => {
    const [isPending, startTransition] = useTransition();

    async function handleConfirm() {
        startTransition(async () => {
            const data = await closeMeeting(meetingId);
            if (data.data) {
                onOpenChange(false);
                toast.success('Meeting closed');
            }
            if (data.error) {
                toast.error(data.error);
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-4/5">
                <DialogHeader>
                    <DialogTitle>Close Meeting</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to close the meeting? This cannot
                        be undone.
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
                            'Confirm'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default CloseMeetingDialog;
