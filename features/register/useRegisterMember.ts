import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
    (typeof client.api.register)[':token']['$patch']
>;
type RequestType = InferRequestType<
    (typeof client.api.register)[':token']['$patch']
>['json'];

export const useRegisterMember = (token?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.register[':token']['$patch']({
                param: { token },
                json
            });
            if (response.status == 422)
                throw new Error('Invalid email, try again');
            if (response.status == 421)
                throw new Error('Invalid token, try again');

            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['register', { token }]
            });
        }
    });

    return mutation;
};
