'use client';

import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import VoteForm from './VoteForm';
import { VotingSchema } from '@/schemas/voting';
import { Rating } from '@/types';
import { createVote, updateVote } from '@/actions/voting';

const VoteFormLayout = ({ rating }: { rating: Rating }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();

    const defaultValues = rating?.id
        ? {
              rating: (rating.rating as number) || 0,
              comment: rating.comment || ''
          }
        : {
              rating: 0,
              comment: ''
          };

    // const defaultValues = {
    //     rating: 0,
    //     comment: ''
    // };

    const onSubmit = ({ values }: { values: z.infer<typeof VotingSchema> }) => {
        startTransition(() => {
            if (rating.id) {
                updateVote(values, rating.id).then((data) => {
                    if (data?.success) {
                        router.push(`/vote/${rating?.whisky?.meetingId}`);
                    }
                    if (data?.error) {
                        setError(data.error);
                    }
                });
            } else {
                createVote(values, rating.whisky.id).then((data) => {
                    if (data?.success) {
                        router.push(`/vote/${rating?.whisky?.meetingId}`);
                    }
                    if (data?.error) {
                        setError(data.error);
                    }
                });
            }
        });
    };

    return (
        <>
            <div className="text-lg mb-4">{rating?.whisky.name}</div>
            <VoteForm
                whiskyid={rating.id}
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                isPending={isPending}
                meetingid={rating?.whisky?.meetingId || ''}
            />
        </>
    );
};

export default VoteFormLayout;
