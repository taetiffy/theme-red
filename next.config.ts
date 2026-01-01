import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    eslint: {
        ignoreDuringBuilds: true, // ปิด eslint check on build prod
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "d1h28837i689xj.cloudfront.net",
            },
            {
                protocol: "https",
                hostname: "superapi-products.s3-ap-southeast-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "play97.app",
            },
            {
                protocol: "https",
                hostname: "d3v6iwqdidgccc.cloudfront.net",
            }
        ],
    },
};

export default nextConfig;
