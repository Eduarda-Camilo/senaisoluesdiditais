import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Preserva URLs do site anterior
    return [
      // A página AWS voltou a existir (/aws, seção Parcerias — 25/09).
      { source: "/aws.html", destination: "/aws", permanent: true },
      { source: "/portfolio.html", destination: "/cases", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
