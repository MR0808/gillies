'use client';

import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

import { useGetUserMeetings } from '@/features/voting/useGetUserMeetings';
import { Separator } from '@radix-ui/react-dropdown-menu';

const MainClient = () => {
    const meetingsQuery = useGetUserMeetings();
    const meetings = meetingsQuery.data || [];
    const isLoading = meetingsQuery.isLoading;

    return (
        <>
            <Separator className="mb-4" />
            {isLoading ? (
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Meeting Date</TableHead>
                            <TableHead>Meeting Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {meetings.map((meeting) => {
                            return (
                                <TableRow key={meeting.id}>
                                    <TableCell className="font-medium">
                                        {meeting.date}
                                    </TableCell>
                                    <TableCell>{meeting.location}</TableCell>
                                    <TableCell>
                                        {meeting.status === 'OPEN' ? (
                                            <Badge variant="success">
                                                Open
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                Closed
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {meeting.status === 'OPEN' ? (
                                            <Link
                                                href={`/vote/${meeting.id}`}
                                                className="font-semibold hover:text-primary text-blue-600"
                                            >
                                                Vote
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`/results/${meeting.id}`}
                                                className="font-semibold hover:text-primary text-blue-600"
                                            >
                                                Vote
                                            </Link>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </>
    );
};

export default MainClient;
