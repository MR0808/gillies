import { Users, Calendar, Wine, MessageSquare } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardOverviewProps } from '@/types/dashboard';

const DashboardOverview = ({ dashboardStats }: DashboardOverviewProps) => {
    const stats = dashboardStats.overview;

    const cards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: Users,
            description: `${stats.adminCount} admins, ${stats.verifiedUsers} verified`,
            color: 'text-blue-500'
        },
        {
            title: 'Total Meetings',
            value: stats.totalMeetings,
            icon: Calendar,
            description: `${stats.openMeetings} open, ${stats.closedMeetings} closed`,
            color: 'text-emerald-500'
        },
        {
            title: 'Total Whiskies',
            value: stats.totalWhiskies,
            icon: Wine,
            description: `${(stats.totalWhiskies / stats.totalMeetings).toFixed(1)} per meeting`,
            color: 'text-amber-500'
        },
        {
            title: 'Total Reviews',
            value: stats.totalReviews,
            icon: MessageSquare,
            description: `${(stats.totalReviews / stats.totalWhiskies).toFixed(1)} per whisky`,
            color: 'text-purple-500'
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {card.title}
                            </CardTitle>
                            <Icon className={`h-4 w-4 ${card.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {card.value}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {card.description}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default DashboardOverview;
