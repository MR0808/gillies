'use client';

import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Wine } from 'lucide-react';
import { format } from 'date-fns';
import { Meetings, MeetingSelectorProps } from '@/types/main';

export function MeetingSelector({ meetings }: MeetingSelectorProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {meetings ? (
                meetings.map((meeting) => (
                    <Card key={meeting.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-lg">
                                    {meeting.location}
                                </CardTitle>
                                <Badge
                                    variant={
                                        meeting.status === 'OPEN'
                                            ? 'default'
                                            : 'secondary'
                                    }
                                >
                                    {meeting.status}
                                </Badge>
                            </div>
                            <CardDescription className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {format(new Date(meeting.date), 'PPP')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4 flex-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Wine className="h-4 w-4" />
                                {meeting.whiskies.length} whiskies to taste
                            </div>

                            {meeting.status === 'OPEN' ? (
                                <Button asChild className="mt-auto">
                                    <Link href={`/meeting/${meeting.id}`}>
                                        Vote on whiskies
                                    </Link>
                                </Button>
                            ) : (
                                <Button asChild className="mt-auto">
                                    <Link
                                        href={`/meeting/${meeting.id}/results`}
                                    >
                                        View Results
                                    </Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Card className="col-span-full">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Wine className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium">
                            No meetings available
                        </p>
                        <p className="text-sm text-muted-foreground">
                            You haven't been added to any meetings yet
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
