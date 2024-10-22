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
            allowedOrigins: ['localhost:3000', 'gillies.vercel.app', 'probable-happiness-gr6g5q7x5p39xvg-3000.app.github.dev']
        }
    }
};

export default nextConfig;
