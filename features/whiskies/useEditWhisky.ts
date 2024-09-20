import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.whiskies)[':meetingid'][':id']['$patch']
>;
type RequestType = InferRequestType<
    (typeof client.api.whiskies)[':meetingid'][':id']['$patch']
>['json'];

export const useEditWhisky = (meetingid?: string, id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.whiskies[':meetingid'][':id'][
                '$patch'
            ]({
                param: { meetingid, id },
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
            queryClient.invalidateQueries({ queryKey: ['whisky', { id }] });
            queryClient.invalidateQueries({ queryKey: ['whiskies'] });
            toast.success('Meeting updated');
        },
        onError: (error) => {
            toast.error(error.message);
            return error;
        }
    });

    return mutation;
};
