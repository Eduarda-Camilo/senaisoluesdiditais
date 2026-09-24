"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { capabilities } from "@/content/capabilities";
import { cases } from "@/content/cases";
import { segments } from "@/content/segments";
import type { CapabilitySlug, Segment } from "@/content/types";
import { CapabilityChips } from "./CapabilityChips";
import { StatusLabel } from "./StatusLabel";
import { cn } from "@/lib/cn";
import { pad } from "@/lib/format";

const toggleCls =
  "h-9 px-3 text-sm rounded-xs border border-line text-fg-muted hover:text-fg hover:border-line-strong data-pressed:bg-fg data-pressed:text-bg data-pressed:border-fg transition-colors select-none";

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

  const list = useMemo(
    () =>
      cases.filter(
        (c) =>
          (cap.length === 0 || cap.some((s) => c.capabilities.includes(s))) &&
          (seg.length === 0 || seg.includes(c.segment)),
      ),
    [cap, seg],
  );

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      {/* Filtros */}
      <div className="lg:col-span-3 flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
        <fieldset>
          <legend className="tag-mark mb-4">capacidade</legend>
          <ToggleGroup
            multiple
            value={cap}
            onValueChange={(v) => setCap(v as CapabilitySlug[])}
            aria-label="Filtrar por capacidade"
            className="flex flex-wrap gap-2"
          >
            {capabilities.map((c) => (
              <Toggle key={c.slug} value={c.slug} className={toggleCls}>
                <span className="text-mark mr-1.5 tabular">{c.index}</span>
                {c.name}
              </Toggle>
            ))}
          </ToggleGroup>
        </fieldset>
        <fieldset>
          <legend className="tag-mark mb-4">segmento</legend>
          <ToggleGroup
            multiple
            value={seg}
            onValueChange={(v) => setSeg(v as Segment[])}
            aria-label="Filtrar por segmento"
            className="flex flex-wrap gap-2"
          >
            {segments.map((s) => (
              <Toggle key={s.value} value={s.value} className={toggleCls}>
                {s.label}
              </Toggle>
            ))}
          </ToggleGroup>
        </fieldset>
        <p className="text-xs text-fg-faint" aria-live="polite">
          {list.length} de {cases.length} produtos
          {(cap.length > 0 || seg.length > 0) && (
            <>
              {" · "}
              <button
                type="button"
                onClick={() => {
                  setCap([]);
                  setSeg([]);
                }}
                className="underline underline-offset-4 hover:text-fg"
              >
                limpar filtros
              </button>
            </>
          )}
        </p>
      </div>

      {/* Lista — escalas diferentes por tier */}
      <ol className="lg:col-span-9 border-t border-line">
        {list.map((c) => {
          const idx = cases.indexOf(c) + 1;
          return (
            <li key={c.slug} className="border-b border-line">
              <Link
                href={`/cases/${c.slug}`}
                className={cn(
                  "group grid gap-x-8 gap-y-4 py-6 lg:py-8 -mx-3 px-3 hover:bg-fg/[0.03] transition-colors",
                  c.tier === "editorial" ? "lg:grid-cols-[3ch_1fr_18rem]" : "lg:grid-cols-[3ch_1fr_10rem]",
                )}
              >
                <span className="text-xs text-fg-faint tabular pt-2">{pad(idx)}</span>
                <span className="flex flex-col gap-3 min-w-0">
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span
                      className={cn(
                        "font-display font-bold group-hover:text-accent-bright transition-colors",
                        c.tier === "editorial" ? "text-display-sm" : "text-xl lg:text-2xl",
                      )}
                    >
                      {c.name}
                    </span>
                    <StatusLabel status={c.status} />
                  </span>
                  <span className="text-fg-muted text-sm lg:text-base max-w-[56ch]">{c.tagline}</span>
                  {c.metrics && c.tier !== "brief" && (
                    <span className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                      {c.metrics.slice(0, 3).map((m) => (
                        <span key={m.label}>
                          <span className="font-display font-semibold tabular">{m.value}</span>{" "}
                          <span className="text-fg-faint">{m.label}</span>
                        </span>
                      ))}
                    </span>
                  )}
                  <CapabilityChips slugs={c.capabilities} linked={false} />
                </span>
                {c.cover ? (
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-xs border border-line bg-surface">
                    <Image
                      src={c.cover.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 18rem, 100vw"
                      className={cn(
                        "object-contain p-3 transition-transform duration-slow ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none",
                        c.cover.height > c.cover.width * 1.05 && "object-cover object-top p-0",
                      )}
                    />
                  </span>
                ) : (
                  <span className="hidden lg:flex aspect-[4/3] items-end rounded-xs border border-dashed border-line p-3 text-[11px] text-fg-faint">
                    [sem material visual]
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
