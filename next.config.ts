import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // Add more later when you use real product images:
      // {
      //   protocol: "https",
      //   hostname: "your-cdn.com",
      // },
    ],
  },
};

export default nextConfig;
