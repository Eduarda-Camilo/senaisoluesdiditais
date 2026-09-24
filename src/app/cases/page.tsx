import type { Metadata } from "next";
import { CasesExplorer } from "@/components/cases/CasesExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/content/capabilities";
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
  const initialCapability = capabilities.find((c) => c.slug === one(sp.capacidade))?.slug as
    | CapabilitySlug
    | undefined;
  const initialSegment = segments.find((s) => s.value === one(sp.segmento))?.value as
    | Segment
    | undefined;

  return (
    <div className="container-site pt-12 pb-24 lg:pt-20">
      <Reveal className="mb-14 lg:mb-20 flex flex-col gap-5 max-w-3xl">
        <p className="tag-mark">cases · índice completo</p>
        <h1 className="font-display font-bold text-display-lg">
          {cases.length} produtos, seis capacidades, um critério: o que aconteceu depois.
        </h1>
        <p className="text-lead text-fg-muted font-light">
          Todos os produtos documentados, com números quando existem e sem números quando não existem.
        </p>
      </Reveal>
      <CasesExplorer initialCapability={initialCapability} initialSegment={initialSegment} />
    </div>
  );
}
