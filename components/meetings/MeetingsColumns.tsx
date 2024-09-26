'use client';
import { InferResponseType } from 'hono';
import { ColumnDef } from '@tanstack/react-table';
import { client } from '@/lib/hono';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

import MeetingCellAction from './MeetingCellAction';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ResponseType = InferResponseType<
    typeof client.api.meetings.$get,
    200
>['data'][0];

export const MeetingsColumns: ColumnDef<ResponseType>[] = [
    {
        accessorKey: 'location',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    Location
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: 'date',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    },
    {
        id: 'results',
        header: 'Results',
        cell: ({ row }) => {
            return (
                <Link href={`/dashboard/meetings/results/${row.original.id}`}>
                    View Results
                </Link>
            );
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => <MeetingCellAction data={row.original} />
    }
];
