import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<typeof client.api.meetings.$post>;
type RequestType = InferRequestType<typeof client.api.meetings.$post>['json'];

export const useCreateMeeting = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.meetings.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
            toast.success('Meeting created');
        },
        onError: () => {
            toast.error('Failed to create meeting');
        }
    });

    return mutation;
};
