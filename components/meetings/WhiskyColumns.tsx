'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import WhiskyCellAction from './WhiskyCellAction';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MeetingWhiskies } from '@/types';

export const WhiskyColumns: ColumnDef<MeetingWhiskies>[] = [
    // {
    //     accessorKey: 'image',
    //     header: 'Image',
    //     cell: ({ row }) => {
    //         <Image
    //             src={row.original.image || whisky}
    //             alt={row.original.name}
    //             width={100}
    //             height={100}
    //         />;
    //     }
    // },
    {
        accessorKey: 'order',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    Order
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <>
                    <div>{row.original.name}</div>
                    {row.original.quaich && (
                        <Badge variant="success">Quaich</Badge>
                    )}
                </>
            );
        }
    },
    {
        accessorKey: 'description',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => <WhiskyCellAction data={row.original} />
    }
];
