import type { Metadata } from 'next';

import Header from '@/components/dashboardLayout/Header';
import Sidebar from '@/components/dashboardLayout/Sidebar';

export const metadata: Metadata = {
    title: 'Gillies Voting System Admin',
    description: 'Gillies voting system admin'
};

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full flex-1 overflow-hidden">
                <Header />
                {children}
            </main>
        </div>
    );
}
