'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Meeting } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { MeetingsColumns } from './MeetingsColumns';
import { Separator } from '@/components/ui/separator';

const MeetingClient = ({ meetings }: { meetings: Meeting[] }) => {
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
            <DataTable
                searchKey="location"
                columns={MeetingsColumns}
                data={meetings}
            />
        </>
    );
};

export default MeetingClient;
