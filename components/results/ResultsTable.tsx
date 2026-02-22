'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Trophy, TrendingUp, TrendingDown, Users } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from '@/components/ui/hover-card';
import { Review, ResultsTableProps } from '@/types/results';

export function ResultsTable({
    whiskies,
    quaichId,
    meetingId
}: ResultsTableProps) {
    const [sortMode, setSortMode] = useState<'rank' | 'order'>('rank');
    const calculateStats = (reviews: Review[]) => {
        if (reviews.length === 0)
            return { avg: 0, min: 0, max: 0, stdDev: 0, count: 0 };

        const ratings = reviews.map((r) => r.rating);
        const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
        const min = Math.min(...ratings);
        const max = Math.max(...ratings);
        const variance =
            ratings.reduce((sum, rating) => sum + (rating - avg) ** 2, 0) /
            ratings.length;
        const stdDev = Math.sqrt(variance);

        return { avg, min, max, stdDev, count: reviews.length };
    };

    // Sort whiskies by average rating (descending)
    const rankedWhiskies = [...whiskies].sort((a, b) => {
        const avgA = calculateStats(a.reviewers).avg;
        const avgB = calculateStats(b.reviewers).avg;
        return avgB - avgA;
    });

    const rankMap = new Map(
        rankedWhiskies.map((whisky, index) => [whisky.id, index + 1])
    );

    const sortedWhiskies =
        sortMode === 'rank'
            ? rankedWhiskies
            : [...whiskies].sort((a, b) => a.order - b.order);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Switch
                        id="sort-mode"
                        checked={sortMode === 'order'}
                        onCheckedChange={(checked) =>
                            setSortMode(checked ? 'order' : 'rank')
                        }
                    />
                    <Label htmlFor="sort-mode" className="cursor-pointer">
                        Sort by {sortMode === 'rank' ? 'Rank' : 'Order'}
                    </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                    {sortMode === 'rank'
                        ? 'Sorted by average rating'
                        : 'Sorted by tasting order'}
                </p>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Rank</TableHead>
                            <TableHead className="w-[50px]">Order</TableHead>
                            <TableHead>Whisky</TableHead>
                            <TableHead className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <Users className="h-4 w-4" />
                                    Votes
                                </div>
                            </TableHead>
                            <TableHead className="text-center">
                                Avg Score
                            </TableHead>
                            <TableHead className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <TrendingUp className="h-4 w-4" />
                                    High
                                </div>
                            </TableHead>
                            <TableHead className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <TrendingDown className="h-4 w-4" />
                                    Low
                                </div>
                            </TableHead>
                            <TableHead className="text-center">Range</TableHead>
                            <TableHead className="text-center">
                                Std Dev
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedWhiskies.map((whisky) => {
                            const stats = calculateStats(whisky.reviewers);
                            const isQuaich = whisky.id === quaichId;
                            const rank = rankMap.get(whisky.id) || 0;

                            return (
                                <TableRow
                                    key={whisky.id}
                                    className={
                                        isQuaich
                                            ? 'bg-amber-50 dark:bg-amber-950/20'
                                            : ''
                                    }
                                >
                                    <TableCell className="font-bold text-center">
                                        {rank === 1 ? (
                                            <Trophy className="h-5 w-5 text-amber-500 mx-auto" />
                                        ) : rank === 2 ? (
                                            <Trophy className="h-5 w-5 text-gray-400 mx-auto" />
                                        ) : rank === 3 ? (
                                            <Trophy className="h-5 w-5 text-amber-700 mx-auto" />
                                        ) : (
                                            <span className="text-muted-foreground">
                                                #{rank}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className="text-muted-foreground">
                                            {whisky.order}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={
                                                    whisky.image ||
                                                    '/placeholder.svg'
                                                }
                                                alt={whisky.name}
                                                className="h-12 w-12 rounded object-cover"
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/dashboard/meetings/${meetingId}/whiskies/${whisky.id}`}
                                                        className="font-medium"
                                                    >
                                                        {whisky.name}
                                                    </Link>
                                                    {isQuaich && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100"
                                                        >
                                                            <Trophy className="h-3 w-3 mr-1" />
                                                            Quaich
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {whisky.description}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <button className="font-medium hover:underline">
                                                    {stats.count}
                                                </button>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-80">
                                                <div className="space-y-2">
                                                    <h4 className="font-semibold">
                                                        Individual Votes
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {whisky.reviewers.map(
                                                            (review) => (
                                                                <div
                                                                    key={
                                                                        review.id
                                                                    }
                                                                    className="flex items-start gap-2 text-sm"
                                                                >
                                                                    <Avatar className="h-6 w-6">
                                                                        <AvatarFallback className="text-xs">
                                                                            {
                                                                                review
                                                                                    .user
                                                                                    .name[0]
                                                                            }
                                                                            {
                                                                                review
                                                                                    .user
                                                                                    .lastName[0]
                                                                            }
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="font-medium">
                                                                                {
                                                                                    review
                                                                                        .user
                                                                                        .name
                                                                                }{' '}
                                                                                {
                                                                                    review
                                                                                        .user
                                                                                        .lastName
                                                                                }
                                                                            </span>
                                                                            <Badge variant="outline">
                                                                                {
                                                                                    review.rating
                                                                                }
                                                                            </Badge>
                                                                        </div>
                                                                        <p className="text-muted-foreground text-xs">
                                                                            {
                                                                                review.comment
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className="font-bold text-lg">
                                            {stats.avg.toFixed(2)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            variant="outline"
                                            className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                                        >
                                            {stats.max.toFixed(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            variant="outline"
                                            className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                                        >
                                            {stats.min.toFixed(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className="text-muted-foreground">
                                            {(stats.max - stats.min).toFixed(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className="text-muted-foreground">
                                            {stats.stdDev.toFixed(2)}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
