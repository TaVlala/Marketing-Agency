import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            // 1 week — increase to 31536000 (1 year) after confirming no issues
            value: 'max-age=604800',
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinary-loader.ts',
    // remotePatterns ensures next/image doesn't block external hostnames.
    // The custom loader bypasses Next.js optimisation, but these patterns
    // are still checked for URL validity when using <Image src="https://...">
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        // Payload Media uploads hosted on Railway
        protocol: 'https',
        hostname: '*.up.railway.app',
        pathname: '/media/**',
      },
    ],
  },
};

export default withPayload(nextConfig);
