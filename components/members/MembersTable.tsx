'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    UserPlus,
    Pencil,
    Trash2,
    Filter
} from 'lucide-react';
import { User } from '@/generated/prisma';

import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MemberDialog from '@/components/members/MemberDialog';
// import { DeleteUserDialog } from '@/components/delete-user-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UsersTableProps } from '@/types/members';

const MembersTable = ({ users }: UsersTableProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<'ALL' | 'ADMIN' | 'USER'>(
        'ALL'
    );
    const [emailVerifiedFilter, setEmailVerifiedFilter] = useState<
        'all' | 'true' | 'false'
    >('all');
    const [pageSize, setPageSize] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    // Filter users based on search query and filters
    const filteredUsers = useMemo(() => {
        let filtered = users;

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (user) =>
                    user.name.toLowerCase().includes(query) ||
                    user.lastName.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query)
            );
        }

        // Role filter
        if (roleFilter !== 'ALL') {
            filtered = filtered.filter((user) => user.role === roleFilter);
        }

        // Email verified filter
        if (emailVerifiedFilter !== 'all') {
            const isVerified = emailVerifiedFilter === 'true';
            filtered = filtered.filter(
                (user) => user.emailVerified === isVerified
            );
        }

        return filtered;
    }, [users, searchQuery, roleFilter, emailVerifiedFilter]);

    // Calculate pagination
    const totalPages =
        pageSize === -1 ? 1 : Math.ceil(filteredUsers.length / pageSize);
    const startIndex = pageSize === -1 ? 0 : (currentPage - 1) * pageSize;
    const endIndex =
        pageSize === -1 ? filteredUsers.length : startIndex + pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handlePageSizeChange = (value: string) => {
        setPageSize(value === 'all' ? -1 : Number.parseInt(value));
        setCurrentPage(1);
    };

    const handleRoleFilterChange = (role: 'ALL' | 'ADMIN' | 'USER') => {
        setRoleFilter(role);
        setCurrentPage(1);
    };

    const handleEmailVerifiedFilterChange = (
        verified: 'all' | 'true' | 'false'
    ) => {
        setEmailVerifiedFilter(verified);
        setCurrentPage(1);
    };

    const activeFiltersCount = [
        roleFilter !== 'ALL',
        emailVerifiedFilter !== 'all'
    ].filter(Boolean).length;

    return (
        <div className="space-y-4">
            {/* Search, Filters, and Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative bg-transparent"
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                                {activeFiltersCount > 0 && (
                                    <Badge
                                        variant="secondary"
                                        className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                                    >
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            <DropdownMenuLabel>Role</DropdownMenuLabel>
                            <DropdownMenuCheckboxItem
                                checked={roleFilter === 'ALL'}
                                onCheckedChange={() =>
                                    handleRoleFilterChange('ALL')
                                }
                            >
                                All Roles
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={roleFilter === 'ADMIN'}
                                onCheckedChange={() =>
                                    handleRoleFilterChange('ADMIN')
                                }
                            >
                                Admin
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={roleFilter === 'USER'}
                                onCheckedChange={() =>
                                    handleRoleFilterChange('USER')
                                }
                            >
                                User
                            </DropdownMenuCheckboxItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuLabel>
                                Email Verified
                            </DropdownMenuLabel>
                            <DropdownMenuCheckboxItem
                                checked={emailVerifiedFilter === 'all'}
                                onCheckedChange={() =>
                                    handleEmailVerifiedFilterChange('all')
                                }
                            >
                                All
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={emailVerifiedFilter === 'true'}
                                onCheckedChange={() =>
                                    handleEmailVerifiedFilterChange('true')
                                }
                            >
                                Verified
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={emailVerifiedFilter === 'false'}
                                onCheckedChange={() =>
                                    handleEmailVerifiedFilterChange('false')
                                }
                            >
                                Not Verified
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                            Show:
                        </span>
                        <Select
                            value={
                                pageSize === -1 ? 'all' : pageSize.toString()
                            }
                            onValueChange={handlePageSizeChange}
                        >
                            <SelectTrigger className="w-24">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="all">All</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Email Verified</TableHead>
                            <TableHead className="w-[120px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedUsers.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-8"
                                >
                                    <p className="text-muted-foreground">
                                        {searchQuery || activeFiltersCount > 0
                                            ? 'No users found matching your criteria'
                                            : 'No users found'}
                                    </p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        {user.name}
                                    </TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.role === 'ADMIN'
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.emailVerified
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                        >
                                            {user.emailVerified
                                                ? 'Verified'
                                                : 'Not Verified'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    setEditingUser(user)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    setDeletingUser(user)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            {pageSize !== -1 && filteredUsers.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to{' '}
                        {Math.min(endIndex, filteredUsers.length)} of{' '}
                        {filteredUsers.length} users
                    </p>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage === 1}
                            className="cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((page) => {
                                    return (
                                        page === 1 ||
                                        page === totalPages ||
                                        Math.abs(page - currentPage) <= 1
                                    );
                                })
                                .map((page, index, array) => {
                                    const prevPage = array[index - 1];
                                    const showEllipsis =
                                        prevPage && page - prevPage > 1;

                                    return (
                                        <div
                                            key={page}
                                            className="flex items-center gap-1"
                                        >
                                            {showEllipsis && (
                                                <span className="px-2 text-muted-foreground">
                                                    ...
                                                </span>
                                            )}
                                            <Button
                                                variant={
                                                    currentPage === page
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                                className="w-9 cursor-pointer"
                                            >
                                                {page}
                                            </Button>
                                        </div>
                                    );
                                })}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="cursor-pointer"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Dialogs */}
            <MemberDialog
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
            />
            <MemberDialog
                open={!!editingUser}
                onOpenChange={(open) => !open && setEditingUser(null)}
                user={editingUser || undefined}
            />
            {/*  <DeleteUserDialog
                open={!!deletingUser}
                onOpenChange={(open) => !open && setDeletingUser(null)}
                user={deletingUser || undefined}
            /> */}
        </div>
    );
};

export default MembersTable;
