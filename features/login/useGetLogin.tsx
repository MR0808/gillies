import { client } from '@/lib/hono';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
    typeof client.api.credentials.login.$post
>;
type RequestType = InferRequestType<
    typeof client.api.credentials.login.$post
>['json'];

export const useGetLogin = () => {
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.credentials.login.$post({ json });
            const data = await response.json();
            if (!data.result) {
                const { message } = data;
                throw new Error(message);
            }

            return data;
        },
        onError: (error) => {
            return error;
        }
    });

    return mutation;
};
