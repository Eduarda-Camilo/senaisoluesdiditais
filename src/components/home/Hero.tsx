import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark3D } from "./LogoMark3D";

/**
 * Hero — layout do mockup da equipe (23/09/2026).
 *
 * Três colunas: o nome da marca à esquerda, o símbolo 3D no centro e a proposta
 * + os dois CTAs à direita. A coluna do meio tem largura fixa e as laterais
 * dividem o resto por igual, então o símbolo fica no centro exato da página,
 * como no mockup.
 *
 * O fundo é um arco: uma elipse laranja centrada na borda de baixo, escurecendo
 * para as laterais e para cima (`bg-arc`, em globals.css). A cena de cases
 * continua o arco com `bg-arc-tail` e desbota para o laranja chapado. A malha é
 * a mesma `grid-lines` da cena, ancorada embaixo à esquerda: assim a última linha
 * horizontal do Hero cai exatamente na borda e a primeira linha da cena continua
 * o desenho, e as verticais batem nas duas.
 */

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-arc"
    >
      <div
        aria-hidden="true"
        className="grid-lines bg-left-bottom absolute inset-0 text-fg/12 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 35%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 35%, black 100%)",
        }}
      />

      <div className="container-site relative grid items-center gap-y-10 pt-16 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)_minmax(0,1fr)] lg:pt-0 lg:pb-16 min-h-[calc(100svh-4rem)]">
        <Reveal>
          <h1 id="hero-title" className="font-display font-extrabold leading-[0.9] tracking-[-0.01em]">
            <span className="block text-[clamp(3rem,0.9rem+4.95vw,5.3125rem)]">SENAI</span>
            <span className="block mt-[0.45em] text-[clamp(2rem,0.6rem+3vw,3.25rem)] leading-[1.1]">
              Soluções
              <br />
              Digitais
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <LogoMark3D />
        </Reveal>

        <Reveal delay={0.25} className="lg:justify-self-end">
          <div className="flex flex-col gap-10 lg:items-end">
            <p className="text-[clamp(1.375rem,0.9rem+1.15vw,1.9375rem)] leading-[1.25] tracking-[-0.02em] max-w-[12em] lg:text-right">
              Produtos digitais que transformam a indústria, educação e negócios
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/#cases" arrow={false}>
                Ver os cases
              </ButtonLink>
              <ButtonLink href="/#servicos" variant="outline" arrow={false} className="border-fg/40">
                O que fazemos
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
