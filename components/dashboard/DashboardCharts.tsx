'use client';

import {
    Line,
    LineChart,
    Bar,
    BarChart,
    Pie,
    PieChart,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';
import { Users, Wine, Calendar, TrendingUp } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    CustomTooltipProps
} from '@/components/ui/chart';
import { DashboardOverviewProps } from '@/types/dashboard';

const DashboardCharts = ({ dashboardStats }: DashboardOverviewProps) => {
    const {
        meetingTrends,
        userRoleDistribution,
        votingActivity,
        meetingStats
    } = dashboardStats;

    const ROLE_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];
    const VOTING_COLORS = [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))',
        'hsl(var(--chart-5))'
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {/* Meeting Trends */}
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Meeting Activity Trends</CardTitle>
                    <CardDescription>
                        Monthly meeting attendance over the past year
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            attendees: {
                                label: 'Attendees',
                                color: 'hsl(var(--chart-1))'
                            }
                        }}
                        className="h-[300px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={meetingTrends}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    className="stroke-muted"
                                />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis />
                                <ChartTooltip
                                    cursor={false}
                                    content={(props: CustomTooltipProps) => (
                                        <ChartTooltipContent
                                            {...props}
                                            hideIndicator
                                            hideLabel
                                        />
                                    )}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="attendees"
                                    stroke="hsl(var(--chart-1))"
                                    strokeWidth={2}
                                    dot={{ fill: 'hsl(var(--chart-1))', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Meeting Statistics</CardTitle>
                    <CardDescription>
                        Key metrics about your meetings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span className="text-sm">Avg Attendees</span>
                            </div>
                            <div className="text-3xl font-bold text-blue-500">
                                {meetingStats.averageAttendees}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {meetingStats.totalAttendees} total attendees
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Wine className="h-4 w-4" />
                                <span className="text-sm">Avg Whiskies</span>
                            </div>
                            <div className="text-3xl font-bold text-amber-500">
                                {meetingStats.averageWhiskiesPerMeeting}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                per meeting
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2 pt-4 border-t">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Upcoming Meetings</span>
                        </div>
                        <div className="text-3xl font-bold text-emerald-500">
                            {meetingStats.upcomingMeetings}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            scheduled for the future
                        </p>
                    </div>
                    <div className="space-y-2 pt-4 border-t">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-sm">Engagement Rate</span>
                        </div>
                        <div className="text-3xl font-bold text-purple-500">
                            98%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            members actively voting
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* User Role Distribution */}
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>User Role Distribution</CardTitle>
                    <CardDescription>
                        Breakdown of admin vs regular users
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            users: {
                                label: 'Users',
                                color: 'hsl(var(--chart-1))'
                            },
                            admins: {
                                label: 'Admins',
                                color: 'hsl(var(--chart-2))'
                            }
                        }}
                        className="h-[250px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={userRoleDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ payload, percent }) =>
                                        `${payload?.role ?? ''}: ${Math.round(
                                            (percent ?? 0) * 100
                                        )}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {userRoleDistribution.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    ROLE_COLORS[
                                                        index %
                                                            ROLE_COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </Pie>
                                <ChartTooltip
                                    cursor={false}
                                    content={(props: CustomTooltipProps) => (
                                        <ChartTooltipContent
                                            {...props}
                                            hideIndicator
                                            hideLabel
                                        />
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Voting Activity Distribution */}
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Rating Distribution</CardTitle>
                    <CardDescription>
                        How users rate whiskies (0-10 scale)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            count: {
                                label: 'Votes',
                                color: 'hsl(var(--chart-1))'
                            }
                        }}
                        className="h-[250px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={votingActivity}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    className="stroke-muted"
                                />
                                <XAxis dataKey="range" />
                                <YAxis />
                                <ChartTooltip
                                    cursor={false}
                                    content={(props: CustomTooltipProps) => (
                                        <ChartTooltipContent
                                            {...props}
                                            hideIndicator
                                            hideLabel
                                        />
                                    )}
                                />
                                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                                    {votingActivity.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                VOTING_COLORS[
                                                    index % VOTING_COLORS.length
                                                ]
                                            }
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardCharts;
