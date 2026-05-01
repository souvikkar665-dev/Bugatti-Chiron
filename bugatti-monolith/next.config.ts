import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable strict mode to avoid double-initialization in dev
  images: {
    unoptimized: true,
  },
  experimental: {
    // Ensuring no weird caching behaviors in canary versions
  },
  // Force clean builds and avoid some common hydration issues
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
