"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "@/components/ui/icons";
import { careers } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Fotos da equipe no Trabalhe conosco — troca sozinha a cada INTERVAL.
 *
 * O temporizador é a animação de preenchimento do indicador ativo
 * (`carousel-fill`, globals.css): quando ela termina, a foto avança. Pausar é só
 * pausar a animação, e o indicador mostra exatamente quanto falta.
 *
 * Escolher uma foto num indicador — inclusive a que já está ativa — reinicia o
 * preenchimento do zero e a contagem segue correndo (pedido de 24/09). Por isso
 * não há pausa por hover nem por foco: para clicar num indicador o ponteiro está
 * em cima e o botão fica focado, e a barra nova ficava parada no zero.
 *
 * Pausa fora da tela e pelo botão (WCAG 2.2.2: conteúdo que se move sozinho
 * precisa de controle). Com prefers-reduced-motion não avança sozinho — os
 * indicadores continuam trocando a foto.
 *
 * Troca: a foto nova entra por cima com fade enquanto a anterior fica opaca
 * embaixo (sem o "vale" escuro de duas fotos a 50%). A foto ativa também
 * desliza de 106% para 100% durante o intervalo.
 */

const INTERVAL = 6000;

export function CareersCarousel() {
  const photos = careers.photos;
  // `run` conta cada troca e é a `key` do preenchimento: muda sempre, então a
  // animação recomeça do zero mesmo quando a foto escolhida é a atual.
  const [{ index, prev, run }, setState] = useState({ index: 0, prev: -1, run: 0 });
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i: number) =>
    setState((s) => ({
      index: i,
      prev: i === s.index ? s.prev : s.index,
      run: s.run + 1,
    }));

  const auto = !reduce;
  const running = auto && !paused && visible;

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos da equipe"
      className="min-w-0"
    >
      <div className="bleed-right relative aspect-[881/544] lg:max-h-[34rem] overflow-hidden bg-surface-2">
        {photos.map((p, i) => {
          const active = i === index;
          return (
            <div
              key={p.src}
              aria-hidden={!active}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1200ms] ease-out-quart motion-reduce:duration-slow",
                active ? "z-10 opacity-100" : i === prev ? "z-0 opacity-100" : "z-0 opacity-0",
              )}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 90rem) 55vw, (min-width: 64rem) 50vw, 100vw"
                style={"position" in p ? { objectPosition: p.position } : undefined}
                className={cn(
                  "object-cover transition-transform motion-reduce:transition-none motion-reduce:scale-100",
                  // A ativa desliza devagar; as outras voltam a 106% só depois de sumir.
                  active
                    ? "scale-100 duration-[7000ms] delay-0 ease-out"
                    : "scale-[1.06] duration-0 delay-[1200ms]",
                )}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {photos.map((p, i) => {
            const active = i === index;
            return (
              <button
                key={p.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Mostrar foto ${i + 1} de ${photos.length}`}
                aria-current={active || undefined}
                className="group py-3 -my-3 cursor-pointer"
              >
                <span
                  className={cn(
                    "relative block h-1.5 overflow-hidden bg-fg-faint transition-[width,background-color] duration-slow ease-out-expo",
                    active ? "w-24 sm:w-[11.25rem]" : "w-8 sm:w-12 group-hover:bg-fg-muted",
                  )}
                >
                  {active && (
                    <span
                      key={run}
                      aria-hidden="true"
                      className="absolute inset-0 origin-left bg-mark"
                      style={
                        auto
                          ? {
                              animation: `carousel-fill ${INTERVAL}ms linear forwards`,
                              animationPlayState: running ? "running" : "paused",
                            }
                          : undefined
                      }
                      onAnimationEnd={() => go((index + 1) % photos.length)}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {auto && (
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Retomar a troca de fotos" : "Pausar a troca de fotos"}
            className="inline-flex size-8 items-center justify-center text-fg-muted hover:text-fg transition-colors duration-fast cursor-pointer"
          >
            {paused ? (
              <Play size={16} weight="fill" aria-hidden="true" />
            ) : (
              <Pause size={16} weight="fill" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
