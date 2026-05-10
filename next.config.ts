import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  reactStrictMode: false,
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
