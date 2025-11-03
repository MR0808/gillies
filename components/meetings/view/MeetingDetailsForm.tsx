'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTransition, useState } from 'react';

import {
    UpdateMeetingSchema,
    type UpdateMeetingInput
} from '@/schemas/meetings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Meeting } from '@/types/meeting';
import { updateMeeting } from '@/actions/meetings';
import Link from 'next/link';
import CloseMeetingDialog from '@/components/meetings/view/CloseMeetingDialog';

const MeetingDetailsForm = ({ meeting }: { meeting: Meeting }) => {
    const [isPending, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<UpdateMeetingInput>({
        resolver: zodResolver(UpdateMeetingSchema),
        defaultValues: {
            date: meeting.date,
            location: meeting.location
        }
    });

    const onSubmit = (values: z.infer<typeof UpdateMeetingSchema>) => {
        startTransition(async () => {
            const data = await updateMeeting(values, meeting.id);
            if (data.data) {
                toast.success('Meeting updated');
            }
            if (data.error) {
                toast.error(data.error.toString());
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    type="date"
                    {...register('date')}
                    aria-invalid={errors.date ? 'true' : 'false'}
                />
                {errors.date && (
                    <p className="text-sm text-destructive">
                        {errors.date.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    {...register('location')}
                    placeholder="Enter meeting location"
                    aria-invalid={errors.location ? 'true' : 'false'}
                />
                {errors.location && (
                    <p className="text-sm text-destructive">
                        {errors.location.message}
                    </p>
                )}
            </div>

            <div className="flex flex-row gap-5">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer"
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
                <Link href={`/dashboard/meetings/${meeting.id}/results`}>
                    <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                    >
                        View Results
                    </Button>
                </Link>
                {meeting.status === 'OPEN' && (
                    <Button
                        type="button"
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Close Meeting
                    </Button>
                )}
            </div>
            <CloseMeetingDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                meetingId={meeting.id}
            />
        </form>
    );
};

export default MeetingDetailsForm;
