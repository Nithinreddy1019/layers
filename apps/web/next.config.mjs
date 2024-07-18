/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui"],
    experimental: {
        appDir: true
    }
};

export default nextConfig;
