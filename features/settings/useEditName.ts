import { client } from '@/lib/hono';
import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.settings)['name']['$patch']
>;
type RequestType = InferRequestType<
    (typeof client.api.settings)['name']['$patch']
>['json'];

export const useEditName = () => {
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.settings['name']['$patch']({
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
            toast.success('Name updated');
        },
        onError: (error) => {
            return error;
        }
    });

    return mutation;
};
