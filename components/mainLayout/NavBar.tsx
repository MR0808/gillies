'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/mainLayout/UserButton';
import { useSession } from '@/lib/auth-client';

export const Navbar = () => {
    const pathname = usePathname();
    const { data: userSession } = useSession();

    const role = userSession?.user?.role;

    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[320px] sm:w-[600px] shadow-xs">
            <div className="flex gap-x-2">
                <Button
                    asChild
                    variant={pathname === '/' ? 'default' : 'outline'}
                >
                    <Link href="/">Home</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === '/settings' ? 'default' : 'outline'}
                >
                    <Link href="/settings">Settings</Link>
                </Button>
                {role === 'ADMIN' && (
                    <Button
                        asChild
                        variant="outline"
                        className="cursor-pointer"
                    >
                        <Link href="/dashboard">Admin</Link>
                    </Button>
                )}
            </div>
            <UserButton />
        </nav>
    );
};
