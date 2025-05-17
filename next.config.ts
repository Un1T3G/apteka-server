import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CLIENT_URL: process.env.CLIENT_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
