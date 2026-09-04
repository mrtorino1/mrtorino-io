import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      // The BSE client site launched at bigskyexploration.com (2026-09-04);
      // the old /bse staging routes forward permanently.
      {
        source: "/bse",
        destination: "https://bigskyexploration.com",
        permanent: true,
      },
      {
        source: "/bse/:path*",
        destination: "https://bigskyexploration.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
