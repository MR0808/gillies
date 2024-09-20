'use client';
import { InferResponseType } from 'hono';
import { ColumnDef } from '@tanstack/react-table';
import { client } from '@/lib/hono';
import { ArrowUpDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import WhiskyCellAction from './WhiskyCellAction';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ResponseType = InferResponseType<
    (typeof client.api.whiskies)[':meetingid']['$get'],
    200
>['data'][0];

export const WhiskyColumns: ColumnDef<ResponseType>[] = [
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
