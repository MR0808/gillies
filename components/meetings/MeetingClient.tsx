'use client';

import { Plus, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { MeetingsColumns } from './MeetingsColumns';
import { useGetMeetings } from '@/features/meetings/useGetMeetings';

const MeetingClient = () => {
    const meetingsQuery = useGetMeetings();
    const meetings = meetingsQuery.data || [];
    const isLoading = meetingsQuery.isLoading;

    const router = useRouter();

    return (
        <>
            <div className="flex sm:flex-row flex-col items-start justify-between">
                <Heading
                    title={`Meetings (${meetings.length})`}
                    description="Manage meetings below"
                />
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                        className="text-xs md:text-sm"
                        onClick={() => router.push(`/dashboard/meetings/new`)}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>
            </div>
            <Separator />
            {isLoading ? (
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            ) : (
                <DataTable
                    searchKey="lastName"
                    columns={MeetingsColumns}
                    data={meetings}
                />
            )}
        </>
    );
};

export default MeetingClient;
