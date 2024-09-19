'use client';
import { InferResponseType } from 'hono';
import { ColumnDef } from '@tanstack/react-table';
import { client } from '@/lib/hono';
import { ArrowUpDown } from 'lucide-react';

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
        accessorKey: 'whiskies',
        header: 'Whiskies',
        cell: ({ row }) => {
            row.original.whiskies.map((whisky) => {
                return <div key={whisky.id}>{whisky.name}</div>;
            });
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => <MeetingCellAction data={row.original} />
    }
];
