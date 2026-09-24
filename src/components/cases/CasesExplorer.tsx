"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { capabilities } from "@/content/capabilities";
import { caseCard, cases, casesInOrder } from "@/content/cases";
import { segments } from "@/content/segments";
import type { Case, CapabilitySlug, Segment } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Filtros + lista de cases — design V3 (Figma "Portfólio (/cases) — 1442",
 * node 125:317; estado filtrado em 108:2446).
 *
 * Filtro ativo fica Azul Digital com texto preto, como no design. "Limpar
 * filtros" aparece embaixo dos serviços só quando há filtro.
 */

const filterCls =
  "rounded-xs border border-fg px-[0.9375rem] py-2 text-left text-sm leading-5 text-fg-body cursor-pointer select-none transition-colors duration-fast hover:bg-fg/10 data-pressed:border-azul-digital data-pressed:bg-azul-digital data-pressed:text-neutra-100";

const headingCls =
  "font-display font-bold text-[1.81rem] leading-[1.1] tracking-[-0.015em] text-accent-bright";

export function CasesExplorer({
  initialCapability,
  initialSegment,
}: {
  initialCapability?: CapabilitySlug;
  initialSegment?: Segment;
}) {
  // Chega pré-filtrado quando o visitante vem do CTA de uma capacidade ou de um
  // chip de setor na home.
  const [cap, setCap] = useState<CapabilitySlug[]>(initialCapability ? [initialCapability] : []);
  const [seg, setSeg] = useState<Segment[]>(initialSegment ? [initialSegment] : []);
  const filtered = cap.length > 0 || seg.length > 0;

  const list = useMemo(
    () =>
      casesInOrder.filter(
        (c) =>
          (cap.length === 0 || cap.some((s) => c.capabilities.includes(s))) &&
          (seg.length === 0 || seg.includes(c.segment)),
      ),
    [cap, seg],
  );

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[16.75rem_minmax(0,1fr)] lg:gap-x-20">
      {/* Filtros */}
      <div className="flex flex-col gap-[1.875rem] lg:sticky lg:top-24 lg:self-start">
        <fieldset>
          <legend className={cn(headingCls, "mb-6")}>Serviços</legend>
          <ToggleGroup
            multiple
            value={cap}
            onValueChange={(v) => setCap(v as CapabilitySlug[])}
            aria-label="Filtrar por serviço"
            className="flex flex-wrap items-start gap-2 lg:flex-col lg:gap-[0.4375rem]"
          >
            {capabilities.map((c) => (
              <Toggle key={c.slug} value={c.slug} className={filterCls}>
                {c.name}
              </Toggle>
            ))}
          </ToggleGroup>
          {filtered && (
            <button
              type="button"
              onClick={() => {
                setCap([]);
                setSeg([]);
              }}
              className="mt-[0.4375rem] text-sm leading-5 text-fg-body underline underline-offset-4 hover:text-fg cursor-pointer"
            >
              Limpar filtros
            </button>
          )}
        </fieldset>
        <fieldset>
          <legend className={cn(headingCls, "mb-6")}>Segmento</legend>
          <ToggleGroup
            multiple
            value={seg}
            onValueChange={(v) => setSeg(v as Segment[])}
            aria-label="Filtrar por segmento"
            className="flex flex-wrap gap-x-2 gap-y-3"
          >
            {segments.map((s) => (
              <Toggle key={s.value} value={s.value} className={filterCls}>
                {s.label}
              </Toggle>
            ))}
          </ToggleGroup>
        </fieldset>
        <p className="sr-only" aria-live="polite">
          {list.length} de {cases.length} cases
        </p>
      </div>

      {/* Lista */}
      <div>
        <ol className="flex flex-col gap-4">
          {list.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </ol>
        {list.length === 0 && (
          <p className="border-2 border-line-strong bg-surface-2 p-8 text-fg-body">
            Nenhum case com essa combinação de filtros.
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Card do design: 283px de altura no desktop, texto à esquerda e a composição de
 * telas colada à direita. Até a largura do design (1440) a imagem divide o card
 * com o texto (metade cada, cortando pela esquerda); em 1440 ela tem a largura
 * exata do recorte. No celular a imagem vai para cima do texto.
 *
 * A borda é um `::after` por cima de tudo, como o stroke interno do Figma: com
 * `border` de verdade a imagem perdia 4px de altura e não batia com o design.
 */
function CaseCard({ c }: { c: Case }) {
  const img = caseCard(c);
  return (
    <li>
      <Link
        href={`/cases/${c.slug}`}
        className="group relative flex flex-col overflow-hidden bg-surface-2 md:min-h-[17.6875rem] md:flex-row md:items-center after:pointer-events-none after:absolute after:inset-0 after:z-10 after:border-2 after:border-line-strong after:transition-colors after:duration-fast hover:after:border-fg-muted"
      >
        <span
          style={{ "--w": `${img.width}px` } as CSSProperties}
          className="relative block h-44 shrink-0 overflow-hidden md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[min(var(--w),50%)] min-[90rem]:w-(--w)"
        >
          <Image
            src={img.src}
            alt=""
            width={img.width}
            height={img.height}
            sizes={`${img.width}px`}
            className="absolute right-0 top-0 h-full w-auto max-w-none"
          />
        </span>
        <span className="relative flex flex-col items-start gap-3 p-6 md:w-1/2 md:p-8 min-[90rem]:w-[36.625rem]">
          <span className="font-display font-extrabold text-[2rem] leading-[0.9] tracking-[-0.03em] text-fg">
            {c.name}
          </span>
          <span className="text-base leading-6 text-fg-body">{c.tagline}</span>
          {c.metrics && (
            <span className="flex flex-wrap gap-x-6 gap-y-1 text-sm leading-5">
              {c.metrics.slice(0, 3).map((m) => (
                <span key={m.label} className="flex gap-[0.3125rem]">
                  <span className="font-display font-semibold text-fg whitespace-nowrap">{m.value}</span>
                  <span className="text-fg-body">{m.label}</span>
                </span>
              ))}
            </span>
          )}
          <CapabilityTags c={c} />
        </span>
      </Link>
    </li>
  );
}

function CapabilityTags({ c }: { c: Case }) {
  const names = c.capabilities.map((s) => capabilities.find((x) => x.slug === s)?.name).filter(Boolean);
  return (
    <span className="flex flex-wrap gap-2">
      {names.map((n) => (
        <span key={n} className="rounded-xs border border-fg px-1.5 py-1 text-xs leading-4 text-fg-body">
          {n}
        </span>
      ))}
    </span>
  );
}
