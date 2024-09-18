/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'akmdhfdeedpcwnlrmsiz.supabase.co'
            }
        ]
    },
    experimental: {
        serverSourceMaps: true,
        serverActions: {
            allowedOrigins: ['localhost:3000']
        }
    }
};

export default nextConfig;
