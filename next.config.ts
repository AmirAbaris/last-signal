import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true, // god help us on this feat!
};

export default nextConfig;
