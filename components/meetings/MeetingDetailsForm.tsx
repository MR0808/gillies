'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    updateMeetingSchema,
    type UpdateMeetingInput
} from '@/schemas/meetings';
// import { updateMeeting } from '@/app/meetings/[id]/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type Meeting = {
    id: string;
    date: string;
    location: string;
};

const MeetingDetailsForm = ({ meeting }: { meeting: Meeting }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<UpdateMeetingInput>({
        resolver: zodResolver(updateMeetingSchema),
        defaultValues: {
            date: meeting.date,
            location: meeting.location
        }
    });

    const onSubmit = async (data: UpdateMeetingInput) => {
        // try {
        //     await updateMeeting(meeting.id, data);
        //     toast.success('Meeting details updated successfully');
        // } catch (error) {
        //     toast.error('Failed to update meeting details');
        // }
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

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
        </form>
    );
};

export default MeetingDetailsForm;
