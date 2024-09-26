import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetMeetingReviews = (meetingid?: string) => {
    const query = useQuery({
        enabled: !!meetingid,
        queryKey: ['meetingreviews', { meetingid }],
        queryFn: async () => {
            const response = await client.api.results[':meetingid'].$get({
                param: { meetingid }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch results');
            }

            const { data } = await response.json();
            return data;
        }
    });

    return query;
};
