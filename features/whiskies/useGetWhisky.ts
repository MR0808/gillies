import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetWhisky = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['whisky', { id }],
        queryFn: async () => {
            const response = await client.api.whiskies[':id'].$get({
                param: { id }
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
