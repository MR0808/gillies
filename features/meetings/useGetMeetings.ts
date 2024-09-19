import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetMeetings = () => {
    const query = useQuery({
        queryKey: ['meetings'],
        queryFn: async () => {
            const response = await client.api.meetings.$get();

            if (!response.ok) {
                throw new Error('Failed to fetch meetings');
            }

            const { data } = await response.json();
            return data;
        }
    });

    return query;
};
