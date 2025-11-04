'use client';

import { useState } from 'react';
import { ArrowUpDown, Download } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { WhiskyVotesTableProps } from '@/types/whisky';

type SortColumn = 'name' | 'rating';
type SortConfig = {
    column: SortColumn;
    direction: 'asc' | 'desc';
};

function formatDate(date: Date): string {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    const month = months[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${year} ${hours}:${minutes}`;
}

const WhiskyVotesTable = ({ reviews, whiskyName }: WhiskyVotesTableProps) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        column: 'name',
        direction: 'asc'
    });

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortConfig.column === 'name') {
            const nameA = `${a.user.name} ${a.user.lastName}`.toLowerCase();
            const nameB = `${b.user.name} ${b.user.lastName}`.toLowerCase();
            return sortConfig.direction === 'asc'
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        } else {
            // Sort by rating
            return sortConfig.direction === 'asc'
                ? a.rating - b.rating
                : b.rating - a.rating;
        }
    });

    const toggleSort = (column: SortColumn) => {
        setSortConfig((prev) => ({
            column,
            direction:
                prev.column === column && prev.direction === 'asc'
                    ? 'desc'
                    : 'asc'
        }));
    };

    const exportToCSV = () => {
        const headers = ['Name', 'Rating', 'Comment', 'Date'];
        const rows = reviews.map((review) => [
            `${review.user.name} ${review.user.lastName}`,
            review.rating.toString(),
            `"${review.comment.replace(/"/g, '""')}"`, // Escape quotes in comments
            review.createdAt ? formatDate(new Date(review.createdAt)) : 'N/A'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map((row) => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], {
            type: 'text/csv;charset=utf-8;'
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute(
            'download',
            `${whiskyName.replace(/\s+/g, '_')}_votes.csv`
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>All Votes & Comments</CardTitle>
                        <CardDescription>
                            Complete list of all ratings and feedback from
                            voters
                        </CardDescription>
                    </div>
                    <Button onClick={exportToCSV} variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        onClick={() => toggleSort('name')}
                                        className="h-8 px-2"
                                    >
                                        Name
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead className="text-center">
                                    <Button
                                        variant="ghost"
                                        onClick={() => toggleSort('rating')}
                                        className="h-8 px-2"
                                    >
                                        Rating
                                        <ArrowUpDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead className="text-right">
                                    Date
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedReviews.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={
                                                        review.user.image ||
                                                        '/images/profile.jpg'
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {review.user.name[0]}
                                                    {review.user.lastName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">
                                                {review.user.name}{' '}
                                                {review.user.lastName}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            variant="outline"
                                            className="font-bold"
                                        >
                                            {review.rating.toFixed(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-md">
                                        <p className="text-sm">
                                            {review.comment}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">
                                        {review.createdAt
                                            ? formatDate(
                                                  new Date(review.createdAt)
                                              )
                                            : 'N/A'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default WhiskyVotesTable;
