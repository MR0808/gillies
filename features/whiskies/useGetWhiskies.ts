import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetWhiskies = (meetingid?: string) => {
    const query = useQuery({
        enabled: !!meetingid,
        queryKey: ['whiskies'],
        queryFn: async () => {
            const response = await client.api.whiskies[':meetingid'].$get({
                param: { meetingid }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch meetings');
            }

            const { data } = await response.json();
            return data;
        }
    });

    return query;
};
