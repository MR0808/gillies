'use client';

import { Loader2 } from 'lucide-react';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { ResultsColumns } from './ResultsColumns';
import { useGetMeetingReviews } from '@/features/results/useGetMeetingReviews';

const ResultsClient = ({ meetingid }: { meetingid: string }) => {
    const resultsQuery = useGetMeetingReviews(meetingid);
    const results = resultsQuery.data || [];
    const isLoading = resultsQuery.isLoading;

    console.log(results);

    return (
        <>
            <div className="flex sm:flex-row flex-col items-start justify-between">
                <Heading title={`Whiskies`} description="" />
            </div>
            <Separator />
            {isLoading ? (
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            ) : (
                <DataTable
                    searchKey="name"
                    columns={ResultsColumns}
                    data={results}
                />
            )}
        </>
    );
};

export default ResultsClient;
