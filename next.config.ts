import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/generate-resume",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
