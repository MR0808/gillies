'use client';
import React from 'react';

import ThemeProvider from '@/components/dashboardLayout/ThemeToggle/ThemeProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </>
    );
};

export default Providers;
