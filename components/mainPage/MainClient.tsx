'use client';

import Link from 'next/link';
import { Meeting } from '@prisma/client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
const MainClient = ({ meetings }: { meetings: Meeting[] }) => {
    if (meetings.length === 0) {
        return <div>No meetings available</div>;
    }

    return (
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
                                    <Badge variant="success">Open</Badge>
                                ) : (
                                    <Badge variant="destructive">Closed</Badge>
                                )}
                            </TableCell>
                            <TableCell>
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
                                        View Results
                                    </Link>
                                )}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default MainClient;
