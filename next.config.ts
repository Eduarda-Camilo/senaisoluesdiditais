import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Preserva URLs do site anterior
    return [
      { source: "/aws", destination: "/#cap-cloud", permanent: true },
      { source: "/aws.html", destination: "/#cap-cloud", permanent: true },
      { source: "/portfolio.html", destination: "/cases", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
