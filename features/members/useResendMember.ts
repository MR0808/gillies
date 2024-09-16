import { client } from '@/lib/hono';
import { useMutation } from '@tanstack/react-query';
import { InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.members)['resend'][':id']['$post']
>;

export const useResendMember = (id?: string) => {
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.members['resend'][':id']['$post'](
                {
                    param: { id }
                }
            );
            return await response.json();
        },
        onError: () => {
            toast.error('Failed to resend invitation');
        }
    });

    return mutation;
};
