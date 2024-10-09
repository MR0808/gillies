'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ResultsWhiskies } from '@/types';

export const ResultsColumns: ColumnDef<ResultsWhiskies>[] = [
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
