import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export', // SSR için kaldırıldı
  trailingSlash: true,
  images: {
    // SSR ile Next.js Image Optimization kullanılabilir
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'etilerpethouse.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080', // API port
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Next.js dev port
      },
      {
        protocol: 'https',
        hostname: 'barklounge.com', // Production domain
      },
    ],
  },
  // ISR/SSR için revalidation süresi (saniye)
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
};

export default nextConfig;
