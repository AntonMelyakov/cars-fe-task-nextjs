/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_FRONTEND_GRAPTHQL_ENDPOINT: process.env.NEXT_PUBLIC_FRONTEND_GRAPTHQL_ENDPOINT,
        NEXT_PUBLIC_SERVER_SIDE_GRAPTHQL_ENDPOINT: process.env.NEXT_PUBLIC_SERVER_SIDE_GRAPTHQL_ENDPOINT,
    },
};

export default nextConfig;
