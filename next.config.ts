import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_OMISE_PUBLIC_KEY: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
    NEXT_PUBLIC_OMISE_SECRET_KEY: process.env.NEXT_PUBLIC_OMISE_SECRET_KEY,
    NEXT_PUBLIC_OMISE_API_VERSION: process.env.NEXT_PUBLIC_OMISE_API_VERSION,
  },
};

export default nextConfig;
