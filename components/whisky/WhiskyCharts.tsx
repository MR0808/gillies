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
import { WhiskyChartsProps } from '@/types/whisky';

const WhiskyCharts = ({ reviews }: WhiskyChartsProps) => {
    // Individual ratings over time (chronological)

    const scoreDistribution = [
        {
            range: '9-10',
            count: reviews.filter((r) => r.rating >= 9 && r.rating <= 10)
                .length,
            fill: 'hsl(var(--chart-1))'
        },
        {
            range: '8-9',
            count: reviews.filter((r) => r.rating >= 8 && r.rating < 9).length,
            fill: 'hsl(var(--chart-2))'
        },
        {
            range: '7-8',
            count: reviews.filter((r) => r.rating >= 7 && r.rating < 8).length,
            fill: 'hsl(var(--chart-3))'
        },
        {
            range: '6-7',
            count: reviews.filter((r) => r.rating >= 6 && r.rating < 7).length,
            fill: 'hsl(var(--chart-4))'
        },
        {
            range: '0-6',
            count: reviews.filter((r) => r.rating >= 0 && r.rating < 6).length,
            fill: 'hsl(var(--chart-5))'
        }
    ];
    const ratingsOverTime = reviews
        .map((review, index) => ({
            voter: `${review.user.name} ${review.user.lastName[0]}.`,
            rating: review.rating,
            order: index + 1
        }))
        .reverse(); // Show chronological order

    // Rating frequency (how many people gave each score)
    const ratingFrequency = Array.from({ length: 21 }, (_, i) => {
        const score = (i * 0.5).toFixed(1);
        return {
            score,
            count: reviews.filter((r) => r.rating.toFixed(1) === score).length
        };
    }).filter((item) => item.count > 0);

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Score Distribution</CardTitle>
                    <CardDescription>
                        Number of votes in each rating range
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
                        className="h-[300px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={scoreDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
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
                                    {scoreDistribution.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.fill}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Ratings Over Time</CardTitle>
                    <CardDescription>
                        Individual scores in chronological order
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            rating: {
                                label: 'Rating',
                                color: 'hsl(var(--chart-2))'
                            }
                        }}
                        className="h-[300px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ratingsOverTime}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="voter"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    interval={0}
                                    tick={{ fontSize: 10 }}
                                />
                                <YAxis domain={[0, 10]} />
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
                                <Bar
                                    dataKey="rating"
                                    fill="hsl(var(--chart-2))"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Rating Frequency</CardTitle>
                    <CardDescription>
                        How many voters gave each specific score
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            count: {
                                label: 'Count',
                                color: 'hsl(var(--chart-3))'
                            }
                        }}
                        className="h-[300px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ratingFrequency}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="score" />
                                <YAxis allowDecimals={false} />
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
                                <Bar
                                    dataKey="count"
                                    fill="hsl(var(--chart-3))"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default WhiskyCharts;
