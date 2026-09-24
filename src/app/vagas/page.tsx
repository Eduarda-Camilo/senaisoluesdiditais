import type { Metadata } from "next";
import { JobsExplorer } from "@/components/careers/JobsExplorer";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Vagas",
  description: "Vagas abertas na SENAI Soluções Digitais: desenvolvimento, design, dados, qualidade e gestão, em home-office.",
};

/** "Nossas vagas" — mockup da equipe (24/09). Chega pelo "Ver vagas abertas" do Trabalhe conosco. */
export default function VagasPage() {
  return (
    <div className="container-site pt-8 pb-20">
      <Reveal className="mb-12 flex flex-col gap-6">
        <p className="meta text-fg">trabalhe conosco</p>
        <h1 className="font-display font-extrabold text-[clamp(2.5rem,1.4rem+3.8vw,4.82rem)] leading-[0.9] tracking-[-0.03em]">
          Nossas vagas
        </h1>
      </Reveal>
      <JobsExplorer />
    </div>
  );
}
