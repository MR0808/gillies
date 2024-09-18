import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.settings)['name']['$patch']
>;
type RequestType = InferRequestType<
    (typeof client.api.settings)['name']['$patch']
>['json'];

export const useEditName = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.settings['name']['$patch']({
                json
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success('Name updated');
        },
        onError: () => {
            toast.error('Failed to update name');
        }
    });

    return mutation;
};
