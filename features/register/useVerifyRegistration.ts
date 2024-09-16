import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useVerifyRegistration = (token?: string) => {
    const query = useQuery({
        enabled: !!token,
        queryKey: ['register', { token }],
        queryFn: async () => {
            const response = await client.api.register[':token'].$get({
                param: { token }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch individual member');
            }

            const { data } = await response.json();
            return data;
        }
    });

    return query;
};
