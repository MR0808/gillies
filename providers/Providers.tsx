'use client';
import React from 'react';

import ThemeProvider from '@/components/dashboardLayout/ThemeToggle/ThemeProvider';
import { QueryProvider } from './QueryProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <QueryProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </QueryProvider>
        </>
    );
};

export default Providers;
