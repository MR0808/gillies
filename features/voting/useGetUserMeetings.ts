import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetUserMeetings = () => {
    const query = useQuery({
        queryKey: ['userMeetings'],
        queryFn: async () => {
            const response = await client.api.voting.meetings.$get();

            if (!response.ok) {
                throw new Error('Failed to fetch meetings');
            }

            const { data } = await response.json();
            return data.meetings;
        }
    });

    return query;
};
