'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { deleteMember } from '@/actions/members';
import { MemberDeleteDialogProps } from '@/types/members';

const MemberDeleteDialog = ({
    open,
    onOpenChange,
    user
}: MemberDeleteDialogProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!user) return;

        setIsDeleting(true);
        try {
            const result = await deleteMember(user.id);

            if (result.data) {
                toast.success('User deleted successfully');
                onOpenChange(false);
            } else {
                toast.error(result.error || 'Failed to delete user');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsDeleting(false);
        }
    };

    if (!user) return null;

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the user account for{' '}
                        <span className="font-semibold">
                            {user.name} {user.lastName}
                        </span>{' '}
                        ({user.email}). This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isDeleting}
                        className=" cursor-pointer"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="hover:bg-destructive/30 cursor-pointer"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete User'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default MemberDeleteDialog;
