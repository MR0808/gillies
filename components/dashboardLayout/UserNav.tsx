'use client';

import { useEffect, useState } from 'react';
import { GlassWater, LogOut } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth-client';
import LogoutDialog from '@/components/portalLayout/LogoutDialog';
import { UserNavProps } from '@/types/layout';
import Link from 'next/link';

const UserNav = ({ userSession }: UserNavProps) => {
    const { data: currentUser, refetch } = useSession();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [user, setUser] = useState(userSession?.user);
    if (!userSession || !userSession.user || !user) return null;

    useEffect(() => {
        if (currentUser && currentUser.user) {
            setUser(currentUser?.user);
        }
    }, [currentUser]);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full cursor-pointer"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={user.image ?? ''}
                                alt={user.name ?? ''}
                            />
                            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {user.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer w-full">
                            <Link href="/" className="flex flex-row">
                                <GlassWater className="mr-2 h-4 w-4" />
                                Back to portal
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setIsDialogOpen(true)}
                        className="cursor-pointer"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <LogoutDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    );
};

export default UserNav;
