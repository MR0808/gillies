import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetMeeting = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['meeting', { id }],
        queryFn: async () => {
            const response = await client.api.meetings[':id'].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch individual meeting');
            }

            const { data } = await response.json();
            return data;
        }
    });

    return query;
};
