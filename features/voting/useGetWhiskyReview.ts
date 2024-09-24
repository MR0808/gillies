import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetWhiskyReview = (whiskyid?: string) => {
    const query = useQuery({
        enabled: !!whiskyid,
        queryKey: ['whiskyvoting', { whiskyid }],
        queryFn: async () => {
            const response = await client.api.voting.vote[':whiskyid'].$get({
                param: { whiskyid }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch individual whisky');
            }

            const { data } = await response.json();
            return data;
        }
    });

    return query;
};