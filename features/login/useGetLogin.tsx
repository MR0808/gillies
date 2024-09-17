import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<typeof client.api.login.$post>;
type RequestType = InferRequestType<typeof client.api.login.$post>['json'];

export const useCreateMember = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.login.$post({ json });
            
            const data = await response.json();
            if (!data.data){
                const {error} = data as {data: boolean, error: string}
                throw new Error(error)
            }
            return data
        }
    });

    return mutation;
};
