import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Preserva URLs do site anterior
    return [
      // A seção virou "Nossos serviços"; o destino é o portfólio filtrado por cloud.
      { source: "/aws", destination: "/cases?capacidade=cloud", permanent: true },
      { source: "/aws.html", destination: "/cases?capacidade=cloud", permanent: true },
      { source: "/portfolio.html", destination: "/cases", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
