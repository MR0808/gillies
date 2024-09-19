import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

export const useVerifyRegistration = (token?: string) => {
    const query = useQuery({
        enabled: !!token,
        queryKey: ['register', { token }],
        queryFn: async () => {
            const response = await client.api.credentials.register[
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
