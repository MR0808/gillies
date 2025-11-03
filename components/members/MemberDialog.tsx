'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { MemberSchema, type MemberFormData } from '@/schemas/members';
// import { createUser, updateUser } from '@/app/admin/users/actions';
import { MemberDialogProps } from '@/types/members';
import { createMember, updateMember } from '@/actions/members';

const MemberDialog = ({ open, onOpenChange, user }: MemberDialogProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<MemberFormData>({
        resolver: zodResolver(MemberSchema),
        defaultValues: user
            ? {
                  id: user.id,
                  name: user.name,
                  lastName: user.lastName,
                  email: user.email,
                  role: user.role
              }
            : {
                  name: '',
                  lastName: '',
                  email: '',
                  role: 'USER'
              }
    });

    useEffect(() => {
        if (open) {
            if (user) {
                form.reset({
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                });
            } else {
                form.reset({
                    name: '',
                    lastName: '',
                    email: '',
                    role: 'USER'
                });
            }
        }
    }, [open, user, form.reset]);

    const onSubmit = async (data: MemberFormData) => {
        setIsSubmitting(true);
        try {
            const result = user
                ? await updateMember(data, user.id)
                : await createMember(data);
            if (result.data) {
                toast.success(
                    user
                        ? 'User updated successfully'
                        : 'User created successfully'
                );
                form.reset();
                onOpenChange(false);
            } else {
                toast.error(result.error.toString() || 'Failed to save user');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError: SubmitErrorHandler<MemberFormData> = (errors) => {
        const firstError = Object.values(errors)[0] as { message?: string };
        toast.error('Invalid rating', {
            description: firstError?.message ?? 'Please check your inputs.'
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {user ? 'Edit User' : 'Add New User'}
                    </DialogTitle>
                    <DialogDescription>
                        {user
                            ? 'Update user information and permissions'
                            : 'Create a new user account. They will receive a registration email.'}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    {...field}
                                                    placeholder="John"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    {...field}
                                                    placeholder="Doe"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                {...field}
                                                placeholder="john@example.com"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="USER">
                                                        User
                                                    </SelectItem>
                                                    <SelectItem value="ADMIN">
                                                        Admin
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting
                                    ? 'Saving...'
                                    : user
                                      ? 'Update User'
                                      : 'Create User'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default MemberDialog;
