import { getDashboardStats } from '@/actions/dashboard';

export type OverviewStats = Awaited<ReturnType<typeof getDashboardStats>>;

export type DashboardOverviewProps = {
    dashboardStats: OverviewStats;
};
