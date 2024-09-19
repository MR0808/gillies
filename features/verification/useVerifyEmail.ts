import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useVerifyEmail = (token?: string) => {
    const query = useQuery({
        enabled: !!token,
        queryKey: ['verifyemail', { token }],
        queryFn: async () => {
            const response = await client.api.credentials.verification[
                ':token'
            ].$get({
                param: { token }
            });
            const data = await response.json();

            if (!data.result) {
                throw new Error(data.message);
            }

            return data;
        }
    });

    return query;
};
