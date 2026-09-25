"use client";

import { useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { filterCapabilities as services } from "@/content/capabilities";
import { cases } from "@/content/cases";
import { cn } from "@/lib/cn";
import { GlobeAnchor } from "./GlobeTrack";

/**
 * Serviços.
 *
 * Lista de largura cheia, um serviço por linha, o scroll destacando um por vez.
 * O nome do serviço é o elemento tipográfico da seção — por isso ocupa a linha
 * inteira, sem índice numérico à esquerda e sem contador (ref studiors).
 *
 * O serviço em destaque mostra uma descrição curta do que ele entrega (de
 * `capabilities.ts`) e o CTA leva ao portfólio já filtrado.
 *
 * Cloud e DevOps na AWS saiu da lista (25/09): a AWS tem seção própria logo
 * abaixo (Parcerias) e a página /aws. A capacidade continua em `capabilities.ts`
 * e nos filtros de /cases.
 *
 * Os numerais `01`–`06` continuam existindo em `capabilities.ts` e aparecem em
 * /cases; aqui eles saíram porque disputavam atenção com o título.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const nodes = refs.current.filter((n): n is HTMLLIElement => n !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const i = nodes.indexOf(visible.target as HTMLLIElement);
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    for (const n of nodes) observer.observe(n);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="relative scroll-mt-16 py-20 lg:py-24">
      {/* O globo 3D parte daqui — ver GlobeTrack. */}
      <GlobeAnchor />
      <div className="container-site">
        {/* Mesmo estilo de título do Sobre nós, Trabalhe conosco e Fale conosco. */}
        <h2 id="servicos-titulo" className="font-display font-extrabold text-[clamp(3rem,1rem+4.5vw,4.625rem)] leading-[0.9]">
          Serviços
        </h2>

        <ol className="mt-14 lg:mt-20">
          {services.map((cap, i) => {
            const isActive = reduce || i === active;
            const count = cap.cases.filter((s) => cases.some((c) => c.slug === s)).length;
            return (
              <li
                key={cap.slug}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="py-8 lg:py-12"
              >
                <h3
                  className={cn(
                    "font-display font-bold text-display-md leading-tight transition-colors duration-base",
                    isActive ? "text-fg" : "text-fg-faint",
                  )}
                >
                  {cap.name}
                </h3>

                {/* O detalhe só aparece no serviço em destaque. */}
                <div
                  className={cn(
                    "grid transition-all duration-slow ease-out-expo motion-reduce:transition-none",
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0 pointer-events-none",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pt-6 flex flex-col gap-5">
                      <p className="text-fg-body text-base lg:text-lg leading-relaxed max-w-[52ch]">
                        {cap.description}
                      </p>
                      <Link
                        href={`/cases?capacidade=${cap.slug}`}
                        className="group inline-flex items-center gap-2 text-sm font-medium w-fit hover:text-accent-bright transition-colors duration-fast"
                      >
                        {count > 0 ? `Ver ${count} projetos` : "Ver o portfólio"}
                        <ArrowUpRight
                          size={16}
                          weight="bold"
                          aria-hidden="true"
                          className="transition-transform duration-base ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
