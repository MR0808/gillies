'use client';
import { InferResponseType } from 'hono';
import { ColumnDef } from '@tanstack/react-table';
import { client } from '@/lib/hono';

import { cn } from '@/lib/utils';

export type ResponseType = InferResponseType<
    (typeof client.api.results)[':meetingid']['$get'],
    200
>['data'][0];

export const ResultsColumns: ColumnDef<ResponseType>[] = [
    {
        accessorKey: 'name',
        header: 'Whisky'
    },
    {
        accessorKey: 'count',
        header: 'Total Votes'
    },
    {
        accessorKey: 'average',
        header: 'Average',
        cell: ({ row }) => `${row.original.average.toFixed(2)}`
    },
    {
        accessorKey: 'min',
        header: 'Min',
        cell: ({ row }) => `${row.original.min.toFixed(2)}`
    },
    {
        accessorKey: 'max',
        header: 'Max',
        cell: ({ row }) => `${row.original.max.toFixed(2)}`
    }
];
