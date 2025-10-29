'use client';

import { useState } from 'react';
import { UserPlus, UserMinus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MemberManagerProps } from '@/types/meeting';
import { Member } from '@/types/meeting';
import {
    addMemberToMeeting,
    removeMemberFromMeeting
} from '@/actions/meetings';

const MemberManager = ({ meeting, members }: MemberManagerProps) => {
    const [allUsers, setAllUsers] = useState<Member[]>(members);

    const handleAddMember = async (userId: string) => {
        try {
            await addMemberToMeeting(meeting.id, userId);
            toast.success('Member added successfully');
        } catch (error) {
            toast.error('Failed to add member');
        }
    };

    const handleRemoveMember = async (userId: string) => {
        try {
            await removeMemberFromMeeting(meeting.id, userId);

            toast.success('Member removed successfully');
        } catch (error) {
            toast.error('Failed to remove member');
        }
    };

    const getUserInitials = (user: Member) => {
        const first = user.name?.[0] || '';
        const last = user.lastName?.[0] || '';
        return (
            (first + last).toUpperCase() ||
            user.email?.[0]?.toUpperCase() ||
            '?'
        );
    };

    const getUserName = (user: Member) => {
        if (user.name || user.lastName) {
            return `${user.name || ''} ${user.lastName || ''}`.trim();
        }
        return user.email || 'Unknown User';
    };

    const isMemberAdded = (userId: string) => {
        return meeting.users.some((u) => u.id === userId);
    };

    const addedUsers = allUsers.filter((user) => isMemberAdded(user.id));
    const availableUsers = allUsers.filter((user) => !isMemberAdded(user.id));

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Current Members</CardTitle>
                    <CardDescription>
                        Members attending this meeting
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {addedUsers.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No members added yet. Add members from the list
                            below.
                        </div>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2">
                            {addedUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Avatar>
                                            <AvatarImage
                                                src={user.image || undefined}
                                            />
                                            <AvatarFallback>
                                                {getUserInitials(user)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-medium truncate">
                                                {getUserName(user)}
                                            </span>
                                            {user.email && (
                                                <span className="text-sm text-muted-foreground truncate">
                                                    {user.email}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            handleRemoveMember(user.id)
                                        }
                                        className="shrink-0 cursor-pointer"
                                    >
                                        <UserMinus className="h-4 w-4 mr-1" />
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Available Members</CardTitle>
                    <CardDescription>
                        Click to add members to this meeting
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {availableUsers.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            All users have been added to this meeting.
                        </div>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {availableUsers.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => handleAddMember(user.id)}
                                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent hover:border-primary transition-all text-left group cursor-pointer"
                                >
                                    <Avatar>
                                        <AvatarImage
                                            src={user.image || undefined}
                                        />
                                        <AvatarFallback>
                                            {getUserInitials(user)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className="font-medium truncate">
                                            {getUserName(user)}
                                        </span>
                                        {user.email && (
                                            <span className="text-sm text-muted-foreground truncate">
                                                {user.email}
                                            </span>
                                        )}
                                    </div>
                                    <UserPlus className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
                                </button>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default MemberManager;
