import { client } from '@/lib/hono';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<typeof client.api.login.$post>;
type RequestType = InferRequestType<typeof client.api.login.$post>['json'];

export const useGetLogin = () => {
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.login.$post({ json });
            const data = await response.json();
            if (!data.data) {
                const { error } = data;
                throw new Error(error);
            }

            return data;
        },
        onError: (error) => {
            return error;
        }
    });

    return mutation;
};
