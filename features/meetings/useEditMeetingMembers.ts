import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

type ResponseType = InferResponseType<
    (typeof client.api.meetings)['members'][':meetingid']['$patch']
>;
type RequestType = InferRequestType<
    (typeof client.api.meetings)['members'][':meetingid']['$patch']
>['json'];

export const useEditMeetingMembers = (meetingid?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.meetings['members'][':meetingid'][
                '$patch'
            ]({
                param: { meetingid },
                json
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['meeting', { id: meetingid }]
            });
            queryClient.invalidateQueries({ queryKey: ['meeting'] });
            toast.success('Meeting members updated');
        },
        onError: () => {
            toast.error('Failed to update meeting');
        }
    });

    return mutation;
};
