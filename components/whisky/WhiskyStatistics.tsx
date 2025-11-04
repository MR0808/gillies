import {
    TrendingUp,
    TrendingDown,
    Users,
    BarChart3,
    Target,
    Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WhiskyStatisticsProps } from '@/types/whisky';

const WhiskyStatistics = ({ stats }: WhiskyStatisticsProps) => {
    // const calculateStats = () => {
    //     if (reviews.length === 0) {
    //         return {
    //             average: 0,
    //             high: 0,
    //             low: 0,
    //             range: 0,
    //             count: 0,
    //             median: 0,
    //             standardDeviation: 0
    //         };
    //     }

    //     const ratings = reviews.map((r) => r.rating).sort((a, b) => a - b);
    //     const sum = ratings.reduce((acc, r) => acc + r, 0);
    //     const average = sum / ratings.length;
    //     const high = Math.max(...ratings);
    //     const low = Math.min(...ratings);
    //     const range = high - low;

    //     // Calculate median
    //     const mid = Math.floor(ratings.length / 2);
    //     const median =
    //         ratings.length % 2 === 0
    //             ? (ratings[mid - 1] + ratings[mid]) / 2
    //             : ratings[mid];

    //     // Calculate standard deviation
    //     const squaredDiffs = ratings.map((r) => Math.pow(r - average, 2));
    //     const variance =
    //         squaredDiffs.reduce((acc, d) => acc + d, 0) / ratings.length;
    //     const standardDeviation = Math.sqrt(variance);

    //     return {
    //         average,
    //         high,
    //         low,
    //         range,
    //         count: reviews.length,
    //         median,
    //         standardDeviation
    //     };
    // };

    // const stats = calculateStats();

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Average Score
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                        {stats.average.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">Out of 10.0</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Highest Score
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                        {stats.max.toFixed(1)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Maximum rating received
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Lowest Score
                    </CardTitle>
                    <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-red-600">
                        {stats.min.toFixed(1)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Minimum rating received
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Votes
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{stats.count}</div>
                    <p className="text-xs text-muted-foreground">
                        Number of reviews
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Score Range
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                        {stats.range.toFixed(1)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Difference between high and low
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Median Score
                    </CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                        {stats.median.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Middle value of all ratings
                    </p>
                </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Standard Deviation
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                        {stats.standardDeviation.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Measures how spread out the ratings are. Lower values
                        indicate more consensus among voters.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default WhiskyStatistics;
