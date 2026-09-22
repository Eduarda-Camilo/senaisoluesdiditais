import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { headlineNumbers, site } from "@/content/site";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10" />

      <div className="container-site grid gap-12 lg:grid-cols-12 pt-16 pb-12 lg:pt-24 lg:pb-16 min-h-[calc(100svh-4rem)] items-end">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <Reveal>
            <p className="tag-mark">
              {site.shortName} · desde {site.since}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 id="hero-title" className="font-display font-bold text-display-xl max-w-[18ch]">
              Software que opera a educação profissional e a indústria.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lead text-fg-muted font-light max-w-[42ch]">
              {site.affiliation}. Projetamos, construímos e operamos plataformas com centenas de
              milhares de usuários, IA aplicada, simuladores em realidade virtual e soluções de dados.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/#cases">Ver os cases</ButtonLink>
              <ButtonLink href="/#capacidades" variant="outline" arrow={false}>
                O que fazemos
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Protagonista: produto real (AVA SENAI), sem moldura decorativa */}
        <Reveal delay={0.2} className="lg:col-span-5 relative">
          <Link href="/cases/ava-senai" className="group block" aria-label="Abrir o case AVA SENAI">
            <figure className="relative">
              <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-xs border border-line bg-surface">
                <Image
                  src="/cases/ava-senai/cover.png"
                  alt="Telas do AVA SENAI, plataforma de ensino com mais de 230 mil usuários ativos"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top scale-[1.15] group-hover:scale-[1.12] transition-transform duration-slow ease-out-expo motion-reduce:transition-none"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-xs text-fg-muted">
                <span>
                  <span className="text-mark">01</span> AVA SENAI — redesign 2025
                </span>
                <span className="group-hover:text-fg transition-colors">Abrir case →</span>
              </figcaption>
            </figure>
          </Link>
        </Reveal>
      </div>

      {/* Faixa de números reais, cada um com origem rastreável */}
      <div className="border-y border-line">
        <dl className="container-site grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-line">
          {headlineNumbers.map((n, i) => (
            <Reveal key={n.label} delay={0.3 + i * 0.06} className="py-7 lg:py-8 lg:pr-8 lg:[&:not(:first-child)]:pl-8 flex flex-col gap-2">
              <dt className="order-2 text-sm text-fg-muted leading-snug">{n.label}</dt>
              <dd className="order-1 font-display font-bold text-display-sm tabular leading-none">
                <Counter value={n.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
