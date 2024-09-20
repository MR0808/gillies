import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.whiskies)[':meetingid']['$post']
>;
type RequestType = InferRequestType<
    (typeof client.api.whiskies)[':meetingid']['$post']
>['json'];

export const useCreateWhisky = (meetingid?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.whiskies[':meetingid']['$post']({
                param: { meetingid },
                json
            });
            const data = await response.json();
            if (!data.result) {
                const { message } = data;
                throw new Error(message);
            }
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['whiskies'] });
            toast.success('Whisky created');
        },
        onError: (error) => {
            toast.error(error.message);
            return error;
        }
    });

    return mutation;
};
