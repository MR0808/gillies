import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.whiskies)[':id']['$delete']
>;

export const useDeleteWhisky = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.whiskies[':id']['$delete']({
                param: { id }
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['whisky', { id }] });
            queryClient.invalidateQueries({ queryKey: ['whiskies'] });
            toast.success('Whisky deleted');
        },
        onError: () => {
            toast.error('Failed to delete whisky');
        }
    });

    return mutation;
};
