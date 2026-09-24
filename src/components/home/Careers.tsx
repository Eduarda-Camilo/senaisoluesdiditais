import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import {
  ArrowUpRight,
  Compass,
  GlobeHemisphereWest,
  RocketLaunch,
  TrendUp,
} from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { careers, site } from "@/content/site";
import { CareersCarousel } from "./CareersCarousel";
import { GlobeEnd } from "./GlobeTrack";

/**
 * Trabalhe conosco — mockup da equipe (24/09).
 *
 * Duas faixas. Em cima, no preto: título, texto, botão para o Pandapé e o
 * carrossel de fotos da equipe sangrando pela direita. Embaixo, no branco:
 * "Como é trabalhar no SD" em quatro cartões laranja e as redes.
 *
 * Os cartões têm ícone porque o mockup tem — é a exceção registrada à regra de
 * "ícone é só chrome". Cada ícone segue o texto do cartão: de onde quiser
 * (globo), projetos que decolam (foguete — também o da camiseta da equipe),
 * você escolhe o rumo (bússola), crescimento (tendência de alta).
 *
 * As cinco áreas em texto da versão anterior saíram: não estão no mockup.
 */
const perkIcons = [GlobeHemisphereWest, RocketLaunch, Compass, TrendUp];

export function Careers() {
  return (
    <section id="carreiras" aria-labelledby="carreiras-titulo" className="scroll-mt-16 overflow-clip">
      {/* Sem fundo próprio (o do body é preto): o globo 3D passa por trás — ver GlobeTrack. */}
      <div data-globe-band className="text-fg pt-24">
        <div className="container-site grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,692fr)_minmax(0,586fr)] lg:gap-x-16">
          <div>
            <h2
              id="carreiras-titulo"
              className="font-display font-extrabold text-[clamp(2.5rem,0.9rem+4.9vw,4.625rem)] leading-[0.92]"
            >
              {/* Mínimo menor que o do Fale conosco: "Trabalhe" a 48px não cabe em 312px. */}
              Trabalhe
              <br />
              conosco
            </h2>
            <p className="mt-10 lg:mt-16 max-w-[31em] text-lg lg:text-[1.375rem] leading-[1.55] text-fg">
              {careers.intro}
            </p>
            {/* Vai para a página de vagas do site (não mais direto para o Pandapé). */}
            <Link
              href="/vagas"
              className="group mt-8 inline-flex h-14 lg:h-16 items-center gap-3 rounded-xs bg-accent px-6 lg:px-7 text-lg font-medium tracking-wide text-fg transition-colors duration-fast hover:bg-accent-hover"
            >
              Ver vagas abertas
              <Arrow className="transition-transform duration-base ease-out-quart group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="min-w-0">
            <CareersCarousel />
            {/* Fim da travessia do globo: a cúpula e o "Vem ser FIESC", cortados
                pela faixa branca (referência de 24/09). */}
            <div className="bleed-right relative mt-11 h-[calc(var(--globe-end)*0.19)] overflow-hidden [--globe-end:90vw] lg:[--globe-end:min(52.5vw,47.3rem)]">
              <GlobeEnd className="absolute top-0 left-1/2 w-(--globe-end) -translate-x-1/2" />
              <p className="absolute bottom-0 left-0 translate-y-[18%] whitespace-nowrap font-display font-extrabold uppercase leading-none tracking-[-0.045em] text-[clamp(2rem,3.9vw,3.5rem)]">
                Vem ser FIESC
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-fg text-neutra-100 pt-16 pb-20 lg:pt-20 lg:pb-24">
        <div className="container-site">
          <h3 className="font-display font-bold text-[clamp(2rem,1rem+2.1vw,2.875rem)] leading-[1.05] tracking-[-0.01em]">
            Como é trabalhar no SD
          </h3>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {careers.perks.map((perk, i) => {
              const Icon = perkIcons[i];
              return (
                <Reveal
                  as="li"
                  key={perk.title}
                  delay={i * 0.06}
                  className="flex flex-col bg-mark p-7 pb-10 lg:p-8 lg:pb-12 xl:min-h-[26.5rem] shadow-[0_12px_32px_-12px_rgb(0_0_0/0.35)]"
                >
                  <span className="grid size-14 place-items-center bg-[#eef3f9]">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h4 className="mt-6 font-display font-bold text-[1.625rem] xl:text-[1.75rem] leading-[1.15] tracking-[-0.01em]">
                    {perk.title}
                  </h4>
                  <p className="mt-4 text-lg xl:text-[1.3125rem] leading-[1.6]">{perk.text}</p>
                </Reveal>
              );
            })}
          </ul>

          <div className="mt-14 lg:mt-16 flex flex-wrap items-center gap-x-10 gap-y-4">
            <p className="font-display font-bold text-2xl lg:text-[1.75rem]">Acompanhe nas redes:</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {site.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-xl transition-colors duration-fast hover:text-accent focus-visible:outline-accent"
                  >
                    {s.name}
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-base ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
