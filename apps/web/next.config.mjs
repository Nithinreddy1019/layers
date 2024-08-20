/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui"],
    experimental: {
        appDir: true
    },
    images: {
        domains: ["blinde-s3-bucket.s3.ap-south-1.amazonaws.com"]
    }
};

export default nextConfig;
