import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import "./globals.css";

// Fontes via next/font: baixadas no build e servidas do próprio domínio (sem request ao Google).
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SENAI Soluções Digitais — Sistemas, IA e produtos digitais para educação e indústria",
    template: "%s — SENAI Soluções Digitais",
  },
  description:
    "Área de tecnologia do SENAI-SC e braço da FIESC. Projetamos, construímos e operamos plataformas com centenas de milhares de usuários, IA aplicada, simuladores em realidade virtual e soluções de dados. Parceiro AWS.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-accent focus:text-fg focus:px-4 focus:py-2"
        >
          Ir para o conteúdo
        </a>
        <Nav />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
