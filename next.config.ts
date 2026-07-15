import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    qualities: [75],
  },
  experimental: {
    // Enable PPR for better performance
  },
};

export default nextConfig;
