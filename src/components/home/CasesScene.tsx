"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { cases } from "@/content/cases";
import { caseScenes } from "@/content/scenes";
import { cn } from "@/lib/cn";
import { useLiquidEntrance } from "./useLiquidEntrance";

/**
 * Nossos cases — cena única em laranja, a segunda seção da home.
 *
 * Cada projeto ocupa a tela inteira: logotipo → número grande → resumo → CTA à
 * esquerda, mosaico de telas à direita. O scroll troca o projeto. O título
 * "Nossos cases" e o botão "Ver todos" ficam fixos no quadro, fora dos slides.
 *
 * O mosaico é desenhado no tamanho natural e **sangra** pelas bordas da seção: é
 * posicionado a partir da esquerda, com altura maior que a tela, e o que passa do
 * quadro é cortado. Esticar a imagem até a largura toda (o que `object-cover`
 * fazia) achatava a inclinação e matava o efeito.
 *
 * A transição é **contínua, não um corte**: o progresso do scroll vira um número
 * fracionário e a opacidade e o deslocamento de cada slide saem dele, quadro a
 * quadro. Não há `setState` no laço — os estilos são escritos direto no DOM, e o
 * React só re-renderiza quando o índice ativo (usado pela barra de progresso)
 * muda de fato.
 *
 * Barra de progresso (25/09, no lugar da navegação vertical): o mesmo indicador
 * do carrossel do Trabalhe conosco — um traço por projeto, o ativo mais largo e
 * se enchendo de branco conforme o scroll avança dentro dele. Clicar num traço
 * rola até o projeto. Não tem botão de pausa: aqui quem avança é o scroll.
 *
 * Sem JS ou com prefers-reduced-motion, cai para uma lista estática equivalente.
 *
 * CONTRASTE: o texto é branco sobre o laranja SENAI por decisão da equipe (23/09).
 * Medido: 3,91:1 — passa AA para texto grande (logotipo, número), fica abaixo do
 * mínimo para o resumo e os rótulos mono. Em preto era 5,37:1.
 */

/** Fração do passo reservada à transição: os últimos 30% do scroll de cada slide. */
const BLEND = 0.3;

function smoothstep(t: number) {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
}

export function CasesScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const entranceRef = useLiquidEntrance(sectionRef, reduce);
  const n = caseScenes.length;

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    let lastActive = -1;

    const render = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const travel = height - window.innerHeight;
      if (travel <= 0) return;

      // Progresso contínuo dentro da seção, medido em slides: 0 → n.
      const p = Math.min(Math.max(-top / travel, 0), 0.9999) * n;

      let top1 = -1;
      let topOpacity = -1;

      slideRefs.current.forEach((slide, i) => {
        if (!slide) return;
        const last = i === n - 1;
        const d = p - i;
        let opacity: number;
        if (d <= -BLEND) opacity = 0;
        else if (d < 0) opacity = smoothstep((d + BLEND) / BLEND);
        // O último slide não desbota no fim da seção: fica até sair da tela.
        else if (last || d <= 1 - BLEND) opacity = 1;
        else if (d < 1) opacity = 1 - smoothstep((d - (1 - BLEND)) / BLEND);
        else opacity = 0;

        slide.style.opacity = String(opacity);
        slide.style.transform = `translate3d(0, ${-Math.min(Math.max(d, -1), 1) * 24}px, 0)`;
        slide.style.visibility = opacity < 0.004 ? "hidden" : "visible";

        if (opacity > topOpacity) {
          topOpacity = opacity;
          top1 = i;
        }
      });

      // A barra segue o slide que está de fato dominando a tela, não floor(p) —
      // senão ela troca depois da transição já ter acontecido.
      if (top1 >= 0 && top1 !== lastActive) {
        lastActive = top1;
        setActive(top1);
      }
      if (fillRef.current && top1 >= 0) {
        fillRef.current.style.transform = `scaleX(${Math.min(Math.max(p - top1, 0), 1).toFixed(4)})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, n]);

  const pick = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.01) / n) * travel });
  };

  if (reduce) return <StaticList />;

  return (
    <section
      ref={sectionRef}
      id="cases"
      aria-labelledby="cases-titulo"
      className="relative z-10 text-fg"
      style={{ height: `${n * 100}svh` }}
    >

      <div ref={entranceRef} className="sticky top-0 h-svh overflow-hidden bg-mark" style={{ willChange: "clip-path" }}>
        {/* Malha suave (12%): textura, não grade de planilha — pedido de 23/09. */}
        <div
          aria-hidden="true"
          className="grid-lines absolute inset-0 text-fg/12 pointer-events-none"
        />

        {/* Título da seção, fixo no alto do quadro — não troca com os slides, e
            fica longe do logotipo do projeto (pedido de 23/09). Abaixo da barra
            de navegação flutuante (8px + 58px). */}
        <div className="container-site absolute inset-x-0 top-24 xl:pl-24 pointer-events-none">
          <h2 id="cases-titulo" className="meta-lg">
            Nossos cases
          </h2>
        </div>

        {caseScenes.map((s, i) => (
          <div
            key={s.slug}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
            aria-hidden={i !== active}
          >
            {/* Mosaico de telas, no tamanho natural, sangrando pelas bordas.
                `max-w-none` desfaz o `max-width: 100%` do preflight do Tailwind —
                sem isso a imagem é espremida na largura do quadro.
                A caixa passa 2rem da tela em cima e embaixo: o slide inteiro desliza
                até 24px na transição, e com `inset-0` o mosaico subia junto e
                deixava uma faixa laranja na base. Assim quem corta é o quadro fixo
                (a borda da tela), nunca a caixa. */}
            <div className="absolute inset-x-0 -inset-y-8 hidden lg:block overflow-hidden pointer-events-none">
              <Image
                src={s.scene.src}
                alt={s.scene.alt}
                width={s.scene.width}
                height={s.scene.height}
                // A imagem é desenhada pela altura e transborda a largura da
                // tela: `sizes` precisa sair da proporção dela, senão o Next serve
                // uma variante pequena e o mosaico fica borrado.
                sizes={`${Math.round((92 * s.scene.zoom * s.scene.width) / s.scene.height)}vw`}
                style={{
                  height: `${s.scene.zoom * 100}%`,
                  ...(s.scene.left && { left: s.scene.left }),
                  ...(s.scene.top && { top: s.scene.top }),
                }}
                className={cn(
                  "absolute left-[50%] xl:left-[46%] w-auto max-w-none",
                  !s.scene.top && "top-1/2 -translate-y-1/2",
                )}
                // Os slides inativos ficam em `visibility: hidden`; com carregamento
                // preguiçoso o mosaico poderia aparecer só depois da transição. Em
                // telas pequenas a imagem é `display: none`, então nada é baixado.
                {...(i === 0 ? { priority: true } : { loading: "eager" as const })}
              />
            </div>

            {/* `pt`/`pb` reservam o título fixo em cima e o botão embaixo: o
                conteúdo centraliza no espaço que sobra entre os dois. */}
            <div className="container-site relative h-full flex items-center pt-36 pb-52 xl:pl-24">
              {/* Coluna estreita de propósito: o mosaico começa em 46% e o texto
                  não pode encostar nele. */}
              <div className="flex flex-col gap-7 max-w-[26rem]">
                {/* `unoptimized`: são logotipos pequenos, e o otimizador do Next
                    engasgava ao ampliar o do AVA (402px de origem para 640). */}
                <Image
                  src={s.wordmark.src}
                  alt={s.short}
                  width={s.wordmark.width}
                  height={s.wordmark.height}
                  unoptimized
                  priority
                  className="w-auto h-auto max-h-[4.5rem] max-w-[20rem] object-contain object-left"
                />

                <BigNumber value={s.metric.value} label={s.metric.label} />

                <p className="text-base lg:text-lg font-medium leading-relaxed">{s.summary}</p>

                <Link
                  href={`/cases/${s.slug}`}
                  className="group inline-flex items-center gap-2 meta font-medium w-fit border-b border-fg/50 pb-1.5 transition-colors duration-fast hover:border-fg"
                >
                  ver o case
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-base ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Constante entre os slides — fica fora deles para não piscar na transição.
            Sólido branco com texto preto: é a saída principal da seção (pedido de
            23/09). Preto sobre branco em vez de laranja: 21:1 contra 3,9:1. */}
        <div className="container-site absolute inset-x-0 bottom-14 xl:pl-24">
          <Link
            href="/cases"
            className="group inline-flex items-center gap-3 whitespace-nowrap meta-lg font-medium bg-fg text-bg px-5 sm:px-7 py-5 transition-colors duration-fast hover:bg-azul-conectado"
          >
            Ver todos os {cases.length} cases
            <ArrowUpRight
              size={20}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-base ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <CaseBar active={active} fillRef={fillRef} onPick={pick} />
      </div>
    </section>
  );
}

/**
 * Progresso da cena — o indicador do carrossel do Trabalhe conosco (ver
 * CareersCarousel.tsx), em branco sobre o laranja. O preenchimento do ativo é
 * escrito direto no DOM pelo laço de scroll (`fillRef`).
 */
function CaseBar({
  active,
  fillRef,
  onPick,
}: {
  active: number;
  fillRef: React.RefObject<HTMLSpanElement | null>;
  onPick: (i: number) => void;
}) {
  return (
    <div className="container-site absolute inset-x-0 bottom-[11.5rem] xl:pl-24">
      <div role="group" aria-label="Projetos em destaque" className="flex items-center gap-2">
        {caseScenes.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => onPick(i)}
              aria-label={`Ir para ${s.short} (${i + 1} de ${caseScenes.length})`}
              aria-current={on || undefined}
              className="group -my-3 cursor-pointer py-3"
            >
              <span
                className={cn(
                  "relative block h-1.5 overflow-hidden bg-fg/35 transition-[width,background-color] duration-slow ease-out-expo",
                  on ? "w-24 sm:w-[11.25rem]" : "w-8 sm:w-12 group-hover:bg-fg/60",
                )}
              >
                {on && (
                  <span
                    ref={fillRef}
                    aria-hidden="true"
                    className="absolute inset-0 origin-left bg-fg"
                    style={{ transform: "scaleX(0)" }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Número grande, limitado a 3 linhas.
 *
 * Reduz a fonte em passos até caber. Escreve `fontSize` direto no elemento em vez
 * de guardar em estado — é sincronização com o DOM, e evita um render a mais.
 */
function BigNumber({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = "";
      const base = parseFloat(getComputedStyle(el).fontSize);
      let scale = 1;
      // 10 passos de 14% chegam a ~22% do tamanho base — margem suficiente para
      // um rótulo longo caber em 3 linhas sem virar texto ilegível.
      for (let i = 0; i < 10; i++) {
        el.style.fontSize = `${base * scale}px`;
        const lh = parseFloat(getComputedStyle(el).lineHeight) || base;
        const lines = Math.round(el.getBoundingClientRect().height / lh);
        // Largura também: "matrículas" em 61px é mais largo que a coluna e
        // vazava por baixo do mosaico, porque palavra não quebra no meio.
        const fits = el.scrollWidth <= el.clientWidth + 1;
        if (lines <= 3 && fits) return;
        scale *= 0.86;
      }
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [value, label]);

  return (
    <p ref={ref} className="font-display font-extrabold text-display-xl leading-[0.9] tabular">
      <span className="block whitespace-nowrap">{value}</span>
      <span className="block">{label}</span>
    </p>
  );
}

/** Versão sem movimento: mesma informação, empilhada. */
function StaticList() {
  return (
    <section id="cases" aria-labelledby="cases-titulo" className="bg-mark text-fg">
      <div className="container-site py-20 flex flex-col gap-20">
        <h2 id="cases-titulo" className="meta-lg">
          nossos cases
        </h2>
        {caseScenes.map((s) => (
          <article key={s.slug} className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <Image
                src={s.wordmark.src}
                alt={s.short}
                width={s.wordmark.width}
                height={s.wordmark.height}
                unoptimized
                className="w-auto h-auto max-h-16 max-w-[18rem] object-contain object-left"
              />
              <p className="font-display font-extrabold text-display-lg leading-[0.9] tabular">
                <span className="block whitespace-nowrap">{s.metric.value}</span>
                <span className="block">{s.metric.label}</span>
              </p>
              <p className="text-base font-medium leading-relaxed">{s.summary}</p>
              <Link
                href={`/cases/${s.slug}`}
                className="meta font-medium w-fit border-b border-fg/50 pb-1.5"
              >
                ver o case ↗
              </Link>
            </div>
            <Image
              src={s.scene.src}
              alt={s.scene.alt}
              width={s.scene.width}
              height={s.scene.height}
              sizes="50vw"
              className="w-full h-auto"
            />
          </article>
        ))}
        <Link href="/cases" className="meta-lg font-medium bg-fg text-bg px-7 py-5 w-fit">
          Ver todos os {cases.length} cases ↗
        </Link>
        <p className="sr-only">{cases.length} produtos no portfólio completo.</p>
      </div>
    </section>
  );
}
