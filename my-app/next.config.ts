process.env.NEXT_DISABLE_TRACING = "1";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Provide a fallback for "webworker-threads" so that it won’t break the build.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "webworker-threads": false,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;