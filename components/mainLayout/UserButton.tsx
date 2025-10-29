'use client';

import { User } from 'lucide-react';
import { ExitIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSession } from '@/lib/auth-client';
import LogoutDialog from '@/components/mainLayout/LogoutDialog';

export const UserButton = () => {
    const { data: userSession } = useSession();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage
                            src={userSession?.user.image || ''}
                            className="cursor-pointer"
                        />
                        <AvatarFallback className="bg-sky-500">
                            <User className="text-white" />
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuItem
                        onClick={() => setIsDialogOpen(true)}
                        className="cursor-pointer"
                    >
                        <ExitIcon className="h-4 w-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <LogoutDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    );
};
