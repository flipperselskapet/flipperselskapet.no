import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/xmas/admin",
        destination: "/admin/xmas",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
