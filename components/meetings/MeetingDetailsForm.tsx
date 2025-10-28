'use client';

import * as z from 'zod';
import { add } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useTransition } from 'react';

import {
    updateMeetingSchema,
    type UpdateMeetingInput
} from '@/schemas/meetings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Meeting } from '@/types/meeting';
import { updateMeeting } from '@/actions/meetings';

const MeetingDetailsForm = ({ meeting }: { meeting: Meeting }) => {
    const [isPending, startTransition] = useTransition();

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

    const onSubmit = (values: z.infer<typeof updateMeetingSchema>) => {
        // const newDate = add(values.date, { days: 1 });
        // const newValues = {
        //     ...values,
        //     date: newDate.toISOString().substring(0, 10)
        // };
        startTransition(async () => {
            const data = await updateMeeting(values, meeting.id);
            if (data.data) {
                toast.success('Meeting updated');
            }
            if (data.error) {
                toast.error(data.error);
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

            <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
            >
                {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
        </form>
    );
};

export default MeetingDetailsForm;
