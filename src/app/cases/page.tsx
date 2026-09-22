import type { Metadata } from "next";
import { CasesExplorer } from "@/components/cases/CasesExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { cases } from "@/content/cases";

export const metadata: Metadata = {
  title: "Cases",
  description: `${cases.length} produtos digitais desenvolvidos pela SENAI Soluções Digitais: plataformas, IA aplicada, apps, dados e realidade virtual. Filtre por capacidade e segmento.`,
};

export default function CasesPage() {
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
      <CasesExplorer />
    </div>
  );
}
