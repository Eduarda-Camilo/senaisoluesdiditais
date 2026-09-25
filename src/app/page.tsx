import { About } from "@/components/home/About";
import { Careers } from "@/components/home/Careers";
import { CasesScene } from "@/components/home/CasesScene";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { GlobeTrack } from "@/components/home/GlobeTrack";
import { Services } from "@/components/home/Services";

/**
 * Ordem da home.
 *
 * Cases e Escala eram duas seções contando a mesma coisa — os números grandes já
 * eram dos cases. Viraram uma só, em laranja, logo depois do Hero. Depois vêm
 * serviços e sobre.
 *
 * A navegação vertical deixou de ser global: agora vive dentro da cena de cases
 * (CaseRail) e lista os projetos, não as seções da página.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CasesScene />
      {/* O globo atravessa as seções e termina no Trabalhe conosco. Parcerias
          fica logo depois de Serviços (25/09) e, com fundo próprio, cobre o
          globo enquanto passa. */}
      <GlobeTrack>
        <Services />
        <Partners />
        <About />
        <Careers />
      </GlobeTrack>
      <Contact />
    </>
  );
}
