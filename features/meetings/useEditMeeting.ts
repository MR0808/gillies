import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.meetings)[':id']['$patch']
>;
type RequestType = InferRequestType<
    (typeof client.api.meetings)[':id']['$patch']
>['json'];

export const useEditMeeting = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.meetings[':id']['$patch']({
                param: { id },
                json
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meeting', { id }] });
            queryClient.invalidateQueries({ queryKey: ['meeting'] });
            toast.success('Meeting updated');
        },
        onError: () => {
            toast.error('Failed to update meeting');
        }
    });

    return mutation;
};
