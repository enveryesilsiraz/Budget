import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add fallback for `fs` to false
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Disable `fs` module
    };

    return config;
  },
};

export default nextConfig;
