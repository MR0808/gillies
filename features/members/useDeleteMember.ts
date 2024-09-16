import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.members)[':id']['$delete']
>;

export const useDeleteMember = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.members[':id']['$delete']({
                param: { id }
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['member', { id }] });
            queryClient.invalidateQueries({ queryKey: ['members'] });
            toast.success('Member deleted');
        },
        onError: () => {
            toast.error('Failed to delete member');
        }
    });

    return mutation;
};
