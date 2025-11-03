'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { PortalLayoutProps } from '@/types/layout';
import LogoutDialog from '@/components/portalLayout/LogoutDialog';
import { useSession } from '@/lib/auth-client';
import { PortalThemeToggle } from '@/components/portalLayout/PortalThemeToggle';

const PortalLayout = ({ userSession, children }: PortalLayoutProps) => {
    const { data: currentUser, refetch } = useSession();
    const [user, setUser] = useState(userSession?.user);
    if (!userSession || !userSession.user || !user) return null;

    useEffect(() => {
        if (currentUser && currentUser.user) {
            setUser(currentUser?.user);
        }
    }, [currentUser]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const initials =
        `${user.name?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() ||
        'U';

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="text-xl font-bold">
                        Whisky Portal
                    </Link>

                    <div className="flex items-center gap-2">
                        <PortalThemeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-10 w-10 rounded-full cursor-pointer"
                                >
                                    <Avatar>
                                        <AvatarImage
                                            src={user.image || undefined}
                                            alt={user.name || 'User'}
                                        />
                                        <AvatarFallback>
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {user.name} {user.lastName}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/settings"
                                        className="cursor-pointer"
                                    >
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                {user.role === 'ADMIN' && (
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/dashboard"
                                            className="cursor-pointer"
                                        >
                                            <Shield className="mr-2 h-4 w-4" />
                                            Admin Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setIsDialogOpen(true)}
                                    className="cursor-pointer text-destructive"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <LogoutDialog
                            open={isDialogOpen}
                            onOpenChange={setIsDialogOpen}
                        />
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-8 px-4">{children}</main>
        </div>
    );
};

export default PortalLayout;
