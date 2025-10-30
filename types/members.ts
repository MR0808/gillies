import { User } from '@/generated/prisma';

export type UsersTableProps = {
    users: User[];
};

export type MemberDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: User;
};
