import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, MapPin, Users } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DashboardOverviewProps } from '@/types/dashboard';

const DashboardRecentActivity = ({
    dashboardStats
}: DashboardOverviewProps) => {
    const meetings = dashboardStats.recentMeetings;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Meetings</CardTitle>
                <CardDescription>Latest whisky tasting events</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {meetings.map((meeting) => (
                        <div
                            key={meeting.id}
                            className="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
                        >
                            <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm font-medium">
                                        {format(
                                            new Date(meeting.date),
                                            'MMM dd, yyyy'
                                        )}
                                    </p>
                                    <Badge
                                        variant={
                                            meeting.status === 'OPEN'
                                                ? 'default'
                                                : 'secondary'
                                        }
                                        className="text-xs"
                                    >
                                        {meeting.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        {meeting.location}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        {meeting._count.users} attendees
                                    </p>
                                </div>
                            </div>
                            <Button asChild variant="ghost" size="sm">
                                <Link
                                    href={`/dashboard/meetings/${meeting.id}`}
                                >
                                    View
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default DashboardRecentActivity;
