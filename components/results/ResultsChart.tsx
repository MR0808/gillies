'use client';

import {
    Bar,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { Trophy, TrendingUp, Award } from 'lucide-react';

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
import { ResultsChartsProps, Review } from '@/types/results';

export function ResultsCharts({ whiskies }: ResultsChartsProps) {
    const calculateAverage = (reviews: Review[]) => {
        if (reviews.length === 0) return 0;
        return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    };

    const chartData = whiskies
        .map((whisky) => ({
            name: whisky.name,
            average: calculateAverage(whisky.reviews),
            votes: whisky.reviews.length
        }))
        .sort((a, b) => b.average - a.average);

    const overallStats = {
        totalVotes: whiskies.reduce((sum, w) => sum + w.reviews.length, 0),
        averageRating: (
            whiskies.reduce((sum, w) => sum + calculateAverage(w.reviews), 0) /
            whiskies.length
        ).toFixed(1),
        topRated: chartData[0]
    };

    const COLORS = [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))',
        'hsl(var(--chart-4))',
        'hsl(var(--chart-5))'
    ];

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Votes
                    </CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {overallStats.totalVotes}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Across {whiskies.length} whiskies
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Average Rating
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {overallStats.averageRating}
                    </div>
                    <p className="text-xs text-muted-foreground">Out of 10.0</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Top Rated
                    </CardTitle>
                    <Trophy className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {overallStats.topRated.average.toFixed(1)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {overallStats.topRated.name}
                    </p>
                </CardContent>
            </Card>

            <Card className="md:col-span-3 p-5">
                <CardHeader>
                    <CardTitle>Average Ratings by Whisky</CardTitle>
                    <CardDescription>
                        Comparison of all whiskies tasted at this meeting
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            average: {
                                label: 'Average Rating',
                                color: 'hsl(var(--chart-1))'
                            }
                        }}
                        className="h-[400px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 80
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={100}
                                    interval={0}
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis
                                    domain={[
                                        0,
                                        Math.ceil(chartData[0].average)
                                    ]}
                                />
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
                                <Bar dataKey="average" radius={[8, 8, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
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
}
