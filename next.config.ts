import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
  {
    hostname:"7g16fpxbhl.ufs.sh"
  }
    ]
  }
};

export default nextConfig;
