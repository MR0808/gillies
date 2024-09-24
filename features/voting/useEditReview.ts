import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.voting.vote)[':whiskyid'][':id']['$patch']
>;
type RequestType = InferRequestType<
    (typeof client.api.voting.vote)[':whiskyid'][':id']['$patch']
>['json'];

export const useEditReview = ({
    whiskyid,
    id
}: {
    whiskyid: string;
    id?: string | undefined;
}) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.voting.vote[':whiskyid'][':id'][
                '$patch'
            ]({
                param: { id },
                json
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['whiskyvoting', { whiskyid }]
            });
            toast.success('Vote updated');
        },
        onError: () => {
            toast.error('Failed to update vote');
        }
    });

    return mutation;
};
