import { client } from '@/lib/hono';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
    (typeof client.api.credentials)['reset']['$post']
>;
type RequestType = InferRequestType<
    (typeof client.api.credentials)['reset']['$post']
>['json'];

export const useForgotPassword = () => {
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.credentials.reset.$post({ json });
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
