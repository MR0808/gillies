'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MeetingsTableProps } from '@/types/meeting';

const MeetingsList = ({ meetings }: MeetingsTableProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter meetings based on search query
    const filteredMeetings = useMemo(() => {
        if (!searchQuery) return meetings;

        const query = searchQuery.toLowerCase();
        return meetings.filter(
            (meeting) =>
                meeting.location.toLowerCase().includes(query) ||
                meeting.date.includes(query) ||
                meeting.status.toLowerCase().includes(query)
        );
    }, [meetings, searchQuery]);

    // Calculate pagination
    const totalPages =
        pageSize === -1 ? 1 : Math.ceil(filteredMeetings.length / pageSize);
    const startIndex = pageSize === -1 ? 0 : (currentPage - 1) * pageSize;
    const endIndex =
        pageSize === -1 ? filteredMeetings.length : startIndex + pageSize;
    const paginatedMeetings = filteredMeetings.slice(startIndex, endIndex);

    // Reset to page 1 when search query or page size changes
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handlePageSizeChange = (value: string) => {
        setPageSize(value === 'all' ? -1 : Number.parseInt(value));
        setCurrentPage(1);
    };

    return (
        <div className="space-y-4">
            {/* Search and Page Size Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by location, date, or status..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                        Show:
                    </span>
                    <Select
                        value={pageSize === -1 ? 'all' : pageSize.toString()}
                        onValueChange={handlePageSizeChange}
                    >
                        <SelectTrigger className="w-24">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Guests</TableHead>
                            <TableHead className="text-right">
                                Whiskies
                            </TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedMeetings.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-8"
                                >
                                    <p className="text-muted-foreground">
                                        {searchQuery
                                            ? 'No meetings found matching your search'
                                            : 'No meetings found'}
                                    </p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedMeetings.map((meeting) => (
                                <TableRow key={meeting.id}>
                                    <TableCell className="font-medium">
                                        {format(
                                            new Date(meeting.date),
                                            'dd MMM, yyyy'
                                        )}
                                    </TableCell>
                                    <TableCell>{meeting.location}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                meeting.status === 'OPEN'
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {meeting.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {meeting.users.length}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {meeting.whiskies.length}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            asChild
                                            variant="ghost"
                                            size="sm"
                                        >
                                            <Link
                                                href={`/dashboard/meetings/${meeting.id}`}
                                            >
                                                View
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            {pageSize !== -1 && filteredMeetings.length > 0 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to{' '}
                        {Math.min(endIndex, filteredMeetings.length)} of{' '}
                        {filteredMeetings.length} meetings
                    </p>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((page) => {
                                    // Show first page, last page, current page, and pages around current
                                    return (
                                        page === 1 ||
                                        page === totalPages ||
                                        Math.abs(page - currentPage) <= 1
                                    );
                                })
                                .map((page, index, array) => {
                                    // Add ellipsis if there's a gap
                                    const prevPage = array[index - 1];
                                    const showEllipsis =
                                        prevPage && page - prevPage > 1;

                                    return (
                                        <div
                                            key={page}
                                            className="flex items-center gap-1"
                                        >
                                            {showEllipsis && (
                                                <span className="px-2 text-muted-foreground">
                                                    ...
                                                </span>
                                            )}
                                            <Button
                                                variant={
                                                    currentPage === page
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                                className="w-9"
                                            >
                                                {page}
                                            </Button>
                                        </div>
                                    );
                                })}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1)
                                )
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingsList;
