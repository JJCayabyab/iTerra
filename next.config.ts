import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "7g16fpxbhl.ufs.sh",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;