import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useGetMembers = () => {
    const query = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const response = await client.api.members.$get();

            if (!response.ok) {
                throw new Error('Failed to fetch members');
            }

            const { data } = await response.json();
            return data;
        }
    });

    return query;
};
