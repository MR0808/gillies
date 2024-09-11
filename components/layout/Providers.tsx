'use client';
import React from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

import ThemeProvider from '@/components/layout/ThemeToggle/ThemeProvider';

const Providers = ({
    session,
    children
}: {
    session: SessionProviderProps['session'];
    children: React.ReactNode;
}) => {
    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <SessionProvider session={session}>{children}</SessionProvider>
            </ThemeProvider>
        </>
    );
};

export default Providers;
