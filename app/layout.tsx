import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from '@/components/ui/sonner';

import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/providers/Providers';

const inter = Inter({ subsets: ['latin'], preload: true });

export const metadata: Metadata = {
    title: 'Gillies Voting System',
    description: 'Vote for your favourites'
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} overflow-auto`}
                suppressHydrationWarning={true}
            >
                <NextTopLoader showSpinner={false} />
                <Providers>
                    {children}
                    <Toaster richColors />
                    <SpeedInsights />
                </Providers>
            </body>
        </html>
    );
}
