import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetUserMeetings = (meetingid?: string) => {
    const query = useQuery({
        enabled: !!meetingid,
        queryKey: ['userMeetings'],
        queryFn: async () => {
            const response = await client.api.voting.meetings.$get({
                param: { meetingid }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch meetings');
            }

            const { data } = await response.json();
            return data.meetings;
        }
    });

    return query;
};
