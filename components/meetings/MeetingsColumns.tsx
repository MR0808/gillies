'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { Meeting } from '@prisma/client';

import MeetingCellAction from './MeetingCellAction';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const MeetingsColumns: ColumnDef<Meeting>[] = [
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
