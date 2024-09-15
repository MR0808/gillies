'use client';
import React from 'react';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

import ThemeProvider from '@/components/layout/ThemeToggle/ThemeProvider';
import { QueryProvider } from './QueryProvider';

const Providers = ({
    session,
    children
}: {
    session: SessionProviderProps['session'];
    children: React.ReactNode;
}) => {
    return (
        <>
            <QueryProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <SessionProvider session={session}>
                        {children}
                    </SessionProvider>
                </ThemeProvider>
            </QueryProvider>
        </>
    );
};

export default Providers;
