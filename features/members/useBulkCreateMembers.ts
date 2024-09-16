import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
    (typeof client.api.members)['bulk-create']['$post']
>;
type RequestType = InferRequestType<
    (typeof client.api.members)['bulk-create']['$post']
>['json'];

export const useBulkCreateMembers = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.members['bulk-create'].$post({
                json
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
            toast.success('Members imported and emailed');
        },
        onError: () => {
            toast.error('Failed to import members');
        }
    });

    return mutation;
};
