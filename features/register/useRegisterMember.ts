import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
    (typeof client.api.credentials.register)[':token']['$patch']
>;
type RequestType = InferRequestType<
    (typeof client.api.credentials.register)[':token']['$patch']
>['json'];

export const useRegisterMember = (token?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.credentials.register[':token'][
                '$patch'
            ]({
                param: { token },
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
            queryClient.invalidateQueries({
                queryKey: ['register', { token }]
            });
        },
        onError: (error) => {
            return error;
        }
    });

    return mutation;
};
