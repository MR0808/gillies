import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from '@/components/ui/sonner';

import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/providers/Providers';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Gillies Voting System',
    description: 'Vote for your favourites'
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.className} overflow-hidden`}
                suppressHydrationWarning={true}
            >
                <NextTopLoader showSpinner={false} />
                <Providers session={session}>
                    {children}
                    <Toaster richColors />
                    {/* <SpeedInsights /> */}
                </Providers>
            </body>
        </html>
    );
}
