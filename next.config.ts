import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // genkit packages are CJS, so we need to tell Next.js to not try to bundle them
  // and instead treat them as external packages
  // see: https://nextjs.org/docs/app/api-reference/next-config-js/serverComponentsExternalPackages
  serverComponentsExternalPackages: [
    '@genkit-ai/ai',
    '@genkit-ai/core',
    '@genkit-ai/googleai',
    'firebase-admin',
    'long',
    'protobufjs',
  ],
};

export default nextConfig;
