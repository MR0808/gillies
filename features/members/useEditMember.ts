import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.members)[':id']['$patch']
>;
type RequestType = InferRequestType<
    (typeof client.api.members)[':id']['$patch']
>['json'];

export const useEditMember = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.members[':id']['$patch']({
                param: { id },
                json
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['member', { id }] });
            queryClient.invalidateQueries({ queryKey: ['members'] });
            toast.success('Member updated');
        },
        onError: () => {
            toast.error('Failed to update member');
        }
    });

    return mutation;
};
