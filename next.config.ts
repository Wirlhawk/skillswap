import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // config options here
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during 'next build'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deifkwefumgah.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '0xctge55estdjuk2.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
