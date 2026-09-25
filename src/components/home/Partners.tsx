"use client";

import { useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Arrow } from "@/components/ui/Button";
import { ContactLink } from "@/components/ui/ContactLink";
import { Reveal } from "@/components/ui/Reveal";
import { openPartnership, partnersHome } from "@/content/partners";
import { applyJourney, AwsJourney } from "./AwsJourney";
import { GlobePartner } from "./GlobeTrack";

/**
 * Parcerias — logo depois de Serviços. Layout da equipe no Figma (204:569,
 * 25/09).
 *
 * À esquerda: "Parceria", "SENAI Soluções Digitais + AWS" (o "+ AWS" em laranja
 * SENAI) e o botão para /aws, distribuídos na altura da dobra. À direita: a
 * ilustração dos três planos (AwsJourney.tsx) e, embaixo dela, o texto da APN.
 * Depois, a faixa azul "Seja nosso parceiro", que leva ao Entre em contato com o
 * assunto "Proposta de parceria" marcado.
 *
 * A ilustração é construída pelo scroll, de cima para baixo. No desktop a dobra
 * é `sticky` e ganha um espaçador (`TRAVEL` telas), como o Sobre nós: é o trecho
 * em que ela fica presa e os planos são montados. O progresso começa quando a
 * base da ilustração chega a 95% da tela. Abaixo de `lg` não prende: a
 * ilustração se monta enquanto atravessa a tela. Com prefers-reduced-motion
 * aparece pronta.
 *
 * O globo 3D passa por esta seção (GlobeTrack): vindo de Serviços, pousa no
 * `GlobePartner`, embaixo à esquerda, atrás do título e sangrando pela borda —
 * a posição do Figma — e fica preso com a dobra. Por isso a seção não tem fundo
 * próprio; a faixa azul, que tem, passa por cima dele.
 */

/** Distância de scroll com a dobra presa, em alturas de tela. */
const TRAVEL = 1;

export function Partners() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const illoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    const spacer = spacerRef.current;
    const illo = illoRef.current;
    const root = illo?.querySelector<HTMLElement>("[data-journey]");
    if (!wrap || !frame || !spacer || !illo || !root) return;

    if (reduce) {
      applyJourney(root, 1);
      return;
    }

    const mq = window.matchMedia("(min-width: 64rem)");
    let raf = 0;
    let pinned = false;

    const render = () => {
      raf = 0;
      const vh = window.innerHeight;
      let p: number;
      if (pinned) {
        const top = Math.min(0, vh - frame.offsetHeight);
        frame.style.top = `${top}px`;
        const wr = wrap.getBoundingClientRect();
        // Começa quando a base da ilustração (a camada Migrar) chega a 95% da tela.
        const start = Math.max(vh * 0.95 - (root.getBoundingClientRect().bottom - wr.top), top);
        p = (start - wr.top) / (start - top + TRAVEL * vh);
      } else {
        // Sem prender: monta enquanto a ilustração sobe de 90% a 20% da tela.
        p = (vh * 0.9 - root.getBoundingClientRect().top) / (vh * 0.7);
      }
      applyJourney(root, Math.min(Math.max(p, 0), 1));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const sync = () => {
      pinned = mq.matches;
      if (pinned) {
        spacer.style.height = `${TRAVEL * window.innerHeight}px`;
        frame.style.position = "sticky";
      } else {
        spacer.style.height = "0px";
        frame.style.position = "";
        frame.style.top = "";
      }
      render();
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    mq.addEventListener("change", sync);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      mq.removeEventListener("change", sync);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section id="parcerias" aria-labelledby="parcerias-titulo" className="relative scroll-mt-16 pb-24 lg:pb-30">
      <div ref={wrapRef}>
        <div ref={frameRef} data-globe-frame>
          <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-12 pt-24 pb-16 lg:grid-cols-[minmax(0,546fr)_minmax(0,718fr)] lg:gap-x-20 lg:pt-30 lg:pb-20">
            <div className="relative flex flex-col items-start gap-8 lg:justify-between">
              {/* Onde o globo pousa (só no desktop, com a travessia ligada). */}
              <GlobePartner />
              <p className="relative font-mono text-base uppercase leading-[1.2] tracking-[0.08em]">Parceria</p>
              <h2
                id="parcerias-titulo"
                className="relative font-display font-extrabold text-[clamp(3rem,1rem+4.5vw,4.625rem)] leading-[1.07] tracking-[-0.025em]"
              >
                <span className="block">SENAI</span>
                <span className="block">Soluções</span>
                <span className="block">Digitais</span>
                <span className="block text-mark">+ AWS</span>
              </h2>
              <Link
                href="/aws"
                className="group relative inline-flex h-14 items-center gap-3 rounded-xs bg-accent px-6 text-lg font-medium tracking-wide text-fg transition-colors duration-fast hover:bg-accent-hover"
              >
                Conheça nossa atuação com AWS
                <Arrow className="transition-transform duration-base ease-out-quart group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div ref={illoRef} className="flex flex-col justify-center gap-8">
              <AwsJourney className="w-full" />
              <p className="text-lg leading-[1.625]">{partnersHome.intro}</p>
            </div>
          </div>
        </div>
        <div ref={spacerRef} aria-hidden="true" style={{ height: 0 }} />
      </div>

      {/* Seja nosso parceiro */}
      <div className="container-site">
        <Reveal className="flex flex-col gap-8 bg-accent p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:p-12">
          <div className="flex flex-col gap-5">
            <h3 className="font-display font-extrabold text-[clamp(1.75rem,1.2rem+1.2vw,2.25rem)] leading-[1.22] tracking-[-0.02em]">
              {openPartnership.title}
            </h3>
            <p className="max-w-[46rem] text-lg leading-[1.625]">{openPartnership.text}</p>
          </div>
          <ContactLink
            topic="parceria"
            className="group inline-flex h-14 w-fit shrink-0 items-center gap-3 rounded-xs bg-fg px-6 text-lg font-medium tracking-wide text-neutra-100 transition-colors duration-fast hover:bg-azul-conectado"
          >
            Contato
            <Arrow className="transition-transform duration-base ease-out-quart group-hover:translate-x-0.5" />
          </ContactLink>
        </Reveal>
      </div>
    </section>
  );
}
