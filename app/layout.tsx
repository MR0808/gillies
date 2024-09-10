import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/layout/providers';
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
        <html lang="en">
            <body
                className={`${inter.className} overflow-hidden`}
                suppressHydrationWarning={true}
            >
                <NextTopLoader showSpinner={false} />
                <Providers session={session}>
                    <Toaster />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
