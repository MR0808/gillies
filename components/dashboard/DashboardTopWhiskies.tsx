import { Trophy, Star, MessageSquare } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { DashboardOverviewProps } from '@/types/dashboard';

const DashboardTopWhiskies = ({ dashboardStats }: DashboardOverviewProps) => {
    const whiskies = dashboardStats.topWhiskiesData;

    const medals = ['🥇', '🥈', '🥉'];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Rated Whiskies</CardTitle>
                <CardDescription>
                    Highest rated across all meetings
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {whiskies.map((whisky, index) => (
                        <div
                            key={whisky.name}
                            className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                        >
                            <div className="text-2xl mt-1">
                                {medals[index] || (
                                    <Trophy className="h-5 w-5 text-muted-foreground" />
                                )}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="font-medium leading-none">
                                    {whisky.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {whisky.meeting}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                        <span className="text-sm font-medium">
                                            {whisky.averageRating.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {whisky.totalVotes} votes
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default DashboardTopWhiskies;
