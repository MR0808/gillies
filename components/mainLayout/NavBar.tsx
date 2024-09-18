'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/mainLayout/UserButton';

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[320px] sm:w-[600px] shadow-sm">
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
            </div>
            <UserButton />
        </nav>
    );
};
