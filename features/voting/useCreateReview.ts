import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.voting.vote)[':whiskyid']['$post']
>;
type RequestType = InferRequestType<
    (typeof client.api.voting.vote)[':whiskyid']['$post']
>['json'];

export const useCreateReview = (whiskyid?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.voting.vote[':whiskyid']['$post'](
                {
                    param: { whiskyid },
                    json
                }
            );
            const data = await response.json();
            if (!data.result) {
                const { message } = data;
                throw new Error(message);
            }
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['whiskyvoting', { whiskyid }]
            });
            queryClient.invalidateQueries({
                queryKey: ['meetingsWhiskies', { whiskyid }]
            });
            toast.success('Vote created');
        },
        onError: (error) => {
            toast.error(error.message);
            return error;
        }
    });

    return mutation;
};
