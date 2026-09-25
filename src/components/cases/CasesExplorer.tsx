"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useMemo, useState } from "react";
import { capabilities } from "@/content/capabilities";
import { cases, casesInOrder } from "@/content/cases";
import { segments } from "@/content/segments";
import type { CapabilitySlug, Segment } from "@/content/types";
import { AnimatedCaseCard } from "./AnimatedCaseCard";
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
            <AnimatedCaseCard key={c.slug} c={c} />
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
