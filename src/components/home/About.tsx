"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { about } from "@/content/site";
import { cn } from "@/lib/cn";
import { GlobeSlot } from "./GlobeTrack";

/**
 * Sobre nós — layout do mockup da equipe (23/09/2026).
 *
 * Título e globo à esquerda, três cartões brancos à direita (Origem, Ecossistema,
 * Propósito). Comportamento da referência em vídeo (Pinnacl, "principles"): a
 * seção prende na tela com os três cartões abertos e, conforme o scroll avança,
 * o primeiro encolhe até sobrar só o cabeçalho, depois o segundo; o terceiro fica
 * aberto. Aí a seção solta e segue.
 *
 * Mecânica: o quadro é `sticky` e ganha um espaçador embaixo (`TRAVEL`) — é a
 * distância de scroll em que ele fica preso. O progresso nesse trecho vira a altura
 * de cada cartão, escrita direto no DOM a cada quadro (sem setState no laço, mesmo
 * padrão da cena de cases). O corpo do cartão é ancorado no topo e cortado por
 * `overflow-hidden`, então some por baixo, como na referência, e desbota junto.
 *
 * A coluna dos cartões guarda a altura aberta (`minHeight`): a pilha encolhe, a
 * linha da grade não — a página não muda de altura durante o scroll.
 *
 * O `top` do quadro é `min(0, altura da tela − altura do quadro)`: em telas baixas
 * ele prende mostrando a base (os cartões), não o topo.
 *
 * Abaixo de `lg`, ou com prefers-reduced-motion, os cartões ficam abertos e a
 * seção rola normalmente.
 *
 * No lugar da foto da equipe fica o globo 3D, que chega de Serviços com o
 * scroll (referência de 24/09) — ver GlobeTrack.
 */

/** Distância de scroll com o quadro preso, em alturas de tela. */
const TRAVEL = 1;

/** Trecho do progresso (0–1) em que cada cartão encolhe. O último não encolhe. */
const COLLAPSE = [
  [0.05, 0.5],
  [0.5, 0.95],
] as const;

function smoothstep(t: number) {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
}

export function About() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const headRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const spacer = spacerRef.current;
    const column = columnRef.current;
    if (!section || !frame || !spacer || !column) return;

    const mq = window.matchMedia("(min-width: 64rem)");
    let raf = 0;
    let openH = 0;
    let headH: number[] = [];

    const reset = () => {
      frame.style.position = "";
      frame.style.top = "";
      spacer.style.height = "0px";
      column.style.minHeight = "";
      cardRefs.current.forEach((c, i) => {
        if (c) c.style.height = "";
        const b = bodyRefs.current[i];
        if (b) b.style.opacity = "";
      });
    };

    const measure = () => {
      // + a borda de cima do cartão (hairline entre eles), senão o fechado corta 1px.
      headH = headRefs.current.map((h, i) => {
        const card = cardRefs.current[i];
        return (h?.offsetHeight ?? 0) + (card ? card.offsetHeight - card.clientHeight : 0);
      });
      // Cartões abertos têm a mesma altura — a do mais alto —, como no mockup.
      openH = Math.max(
        ...headRefs.current.map((h, i) => (h?.offsetHeight ?? 0) + (bodyRefs.current[i]?.offsetHeight ?? 0)),
      );
      column.style.minHeight = `${openH * cardRefs.current.length}px`;
      spacer.style.height = `${TRAVEL * window.innerHeight}px`;
      frame.style.position = "sticky";
    };

    const render = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = Math.min(0, vh - frame.offsetHeight);
      frame.style.top = `${top}px`;

      const travel = TRAVEL * vh;
      const p = Math.min(Math.max((top - section.getBoundingClientRect().top) / travel, 0), 1);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const range = COLLAPSE[i];
        const k = range ? smoothstep((p - range[0]) / (range[1] - range[0])) : 0;
        card.style.height = `${openH - (openH - headH[i]) * k}px`;
        const body = bodyRefs.current[i];
        // O texto desbota enquanto é cortado e termina de sumir antes do fim.
        if (body) body.style.opacity = String(1 - smoothstep(k / 0.8));
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    let active = false;
    const sync = () => {
      const want = mq.matches && !reduce;
      if (want) {
        measure();
        render();
        if (!active) {
          window.addEventListener("scroll", onScroll, { passive: true });
          active = true;
        }
      } else {
        if (active) window.removeEventListener("scroll", onScroll);
        active = false;
        reset();
      }
    };

    sync();
    // Fontes carregando mudam a altura do texto: remede quando terminarem.
    document.fonts?.ready.then(sync);
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
    <section ref={sectionRef} id="sobre" aria-labelledby="sobre-titulo" className="relative scroll-mt-16 text-fg">
      {/* Sem fundo próprio: o globo (camada atrás, GlobeTrack) precisa aparecer. */}
      <div ref={frameRef} data-globe-frame>
        <div className="container-site py-20 lg:py-24 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,591fr)_minmax(0,661fr)] lg:gap-x-20">
          <div className="flex flex-col gap-10 lg:justify-between">
            <h2 id="sobre-titulo" className="font-display font-extrabold text-[clamp(3rem,1rem+4.5vw,4.625rem)] leading-[0.9]">
              Sobre nós
            </h2>
            {/* Sem globo no celular (feedback de 25/09): o slot só existe a partir de lg. */}
            <GlobeSlot className="hidden lg:block lg:w-(--globe) lg:-ml-12" />
          </div>

          <div ref={columnRef}>
            <div className="flex flex-col bg-white text-neutra-100">
              {about.pillars.map((p, i) => (
                <article
                  key={p.title}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={cn("overflow-hidden", i > 0 && "border-t border-neutra-300")}
                >
                  <div
                    ref={(el) => {
                      headRefs.current[i] = el;
                    }}
                    className="flex items-baseline justify-between gap-4 px-5 sm:px-6 pt-6 pb-5"
                  >
                    <h3 className="min-w-0 font-display font-extrabold uppercase text-[clamp(1.25rem,0.6rem+2.4vw,2.25rem)] leading-none">
                      {p.title}
                    </h3>
                    <span aria-hidden="true" className="font-display font-extrabold text-[clamp(1.25rem,1rem+0.6vw,1.875rem)] leading-none tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    ref={(el) => {
                      bodyRefs.current[i] = el;
                    }}
                    className="px-5 sm:px-6 pb-3"
                  >
                    <p className="font-display font-medium text-lg lg:text-[1.3125rem] leading-7">{p.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div ref={spacerRef} aria-hidden="true" style={{ height: 0 }} />
    </section>
  );
}
