'use client';

import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useGetWhiskyReview } from '@/features/voting/useGetWhiskyReview';
import { Separator } from '@radix-ui/react-dropdown-menu';
import VoteForm from './VoteForm';
import { VotingSchema } from '@/schemas/voting';
import { useCreateReview } from '@/features/voting/useCreateReview';
import { useEditReview } from '@/features/voting/useEditReview';

const VoteFormLayout = () => {
    const params = useParams<{ whiskyid: string }>();
    const whiskyid = params.whiskyid;

    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const ratingQuery = useGetWhiskyReview(whiskyid);
    const rating = ratingQuery.data;
    const isLoading = ratingQuery.isLoading;

    const mutationCreate = useCreateReview(whiskyid);
    const mutationEdit = useEditReview({ whiskyid, id: rating?.id });

    const defaultValues = rating?.id
        ? {
              rating: (rating.rating as number) || 0,
              comment: rating.comment || ''
          }
        : {
              rating: 0,
              comment: ''
          };

    const onSubmit = ({
        values,
        whiskyid
    }: {
        values: z.infer<typeof VotingSchema>;
        whiskyid: string;
    }) => {
        setIsPending(true);
        rating?.id
            ? mutationEdit.mutate(values, {
                  onSuccess: () => {
                      setIsPending(false);
                      router.push(`/vote/${rating?.whisky?.meetingId}`);
                  },
                  onError: () => {
                      setIsPending(false);
                  }
              })
            : mutationCreate.mutate(values, {
                  onSuccess: (data) => {
                      router.push(`/vote/${rating?.whisky?.meetingId}`);
                  },
                  onError: () => {
                      setIsPending(false);
                  }
              });
    };

    return (
        <>
            <Separator className="mb-4" />
            {isLoading ? (
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            ) : (
                <>
                    <div className="text-lg mb-4">{rating?.whisky.name}</div>
                    <VoteForm
                        whiskyid={whiskyid}
                        defaultValues={defaultValues}
                        onSubmit={onSubmit}
                        isPending={isPending}
                        meetingid={rating?.whisky?.meetingId || ''}
                    />
                </>
            )}
        </>
    );
};

export default VoteFormLayout;
