import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Avoid broken barrel-import chunks from lucide-react optimization
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;