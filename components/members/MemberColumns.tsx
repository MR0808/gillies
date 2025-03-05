'use client';
import { ColumnDef, FilterFn } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { User } from '@prisma/client';

import MemberCellAction from './MemberCellAction';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<ResponseType> = (
    row,
    columnId,
    filterValue
) => {
    // Concatenate the values from multiple columns into a single string
    const searchableRowContent = `${row.original.firstName} ${row.original.lastName} ${row.original.email}`;

    // Perform a case-insensitive comparison
    return searchableRowContent
        .toLowerCase()
        .includes(filterValue.toLowerCase());
};

export type ResponseType = User;

export const memberColumns: ColumnDef<ResponseType>[] = [
    {
        accessorKey: 'firstName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    First Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        filterFn: multiColumnFilterFn
    },
    {
        accessorKey: 'lastName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    Last Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        filterFn: multiColumnFilterFn
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        filterFn: multiColumnFilterFn
    },
    {
        accessorKey: 'role',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        }
    },
    {
        accessorKey: 'registered',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className={cn('pl-0')}
                >
                    Registered
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (row.getValue('registered') === true ? 'Yes' : 'No')
    },
    {
        id: 'actions',
        cell: ({ row }) => <MemberCellAction data={row.original} />
    }
];
