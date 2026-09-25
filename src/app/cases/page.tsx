import type { Metadata } from "next";
import { CasesExplorer } from "@/components/cases/CasesExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { filterCapabilities } from "@/content/capabilities";
import { cases } from "@/content/cases";
import { segments } from "@/content/segments";
import type { CapabilitySlug, Segment } from "@/content/types";

export const metadata: Metadata = {
  title: "Cases",
  description: `${cases.length} produtos digitais desenvolvidos pela SENAI Soluções Digitais: plataformas, IA aplicada, apps, dados e realidade virtual. Filtre por capacidade e segmento.`,
};

export default async function CasesPage({ searchParams }: PageProps<"/cases">) {
  // ?capacidade=<slug> vem do CTA de cada capacidade; ?segmento=<slug>, dos chips
  // de setor na home.
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const initialCapability = filterCapabilities.find((c) => c.slug === one(sp.capacidade))?.slug as
    | CapabilitySlug
    | undefined;
  const initialSegment = segments.find((s) => s.value === one(sp.segmento))?.value as
    | Segment
    | undefined;

  // Design V3 (Figma "Portfólio (/cases) — 1442", node 125:317).
  return (
    <div className="container-site pt-8 pb-20">
      <Reveal className="mb-12 flex flex-col gap-6">
        <p className="meta text-fg">cases</p>
        <h1 className="font-display font-extrabold text-[clamp(2.5rem,1.4rem+3.8vw,4.82rem)] leading-[0.9] tracking-[-0.03em]">
          Nossos cases
        </h1>
      </Reveal>
      <CasesExplorer initialCapability={initialCapability} initialSegment={initialSegment} />
    </div>
  );
}
