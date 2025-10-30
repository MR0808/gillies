import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import CalendarDateRangePicker from '@/components/global/DateRangePicker';
import PageContainer from '@/components/dashboardLayout/PageContainer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authCheckAdmin } from '@/lib/authCheck';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getDashboardStats } from '@/actions/dashboard';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import DashboardCharts from '@/components/dashboard/DashboardCharts';
import DashboardRecentActivity from '@/components/dashboard/DashboardRecentActivity';
import DashboardTopWhiskies from '@/components/dashboard/DashboardTopWhiskies';

const DashboardMainPage = async () => {
    const userSession = await authCheckAdmin('/dashboard');
    const dashboardStats = await getDashboardStats();

    return (
        <PageContainer scrollable={true}>
            <div className="space-y-6">
                <div className="flex flex-col justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Dashboard
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Overview of your whisky tasting management system
                    </p>
                </div>
                <Suspense
                    fallback={
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="h-32" />
                                ))}
                            </div>
                            <Skeleton className="h-[400px]" />
                        </div>
                    }
                >
                    <DashboardOverview dashboardStats={dashboardStats} />
                    <DashboardCharts dashboardStats={dashboardStats} />
                    <div className="grid gap-6 md:grid-cols-2">
                        <DashboardRecentActivity
                            dashboardStats={dashboardStats}
                        />
                        <DashboardTopWhiskies dashboardStats={dashboardStats} />
                    </div>
                </Suspense>
            </div>
        </PageContainer>
    );
};

export default DashboardMainPage;
