"use client";

import { Accordion } from "@base-ui/react/accordion";
import Link from "next/link";
import { capabilities } from "@/content/capabilities";
import { cases } from "@/content/cases";
import { Arrow } from "@/components/ui/Button";

/**
 * Problema → Capacidade → O que fazemos → Evidência (cases).
 * Accordion acessível (Base UI) — a primeira linha abre por padrão para que
 * o padrão de leitura fique evidente sem clique.
 */
export function CapabilitiesAccordion() {
  return (
    <Accordion.Root defaultValue={[capabilities[0].slug]} className="border-t border-line">
      {capabilities.map((cap) => {
        const evidence = cap.cases.map((s) => cases.find((c) => c.slug === s)).filter(Boolean);
        return (
          <Accordion.Item key={cap.slug} value={cap.slug} id={`cap-${cap.slug}`} className="border-b border-line scroll-mt-20">
            <Accordion.Header render={<h3 />}>
              <Accordion.Trigger className="group grid w-full grid-cols-[3ch_1fr_auto] items-start gap-x-6 py-7 lg:py-8 text-left hover:bg-fg/[0.03] transition-colors -mx-3 px-3 rounded-xs">
                <span className="font-display text-display-sm font-bold text-mark tabular leading-none pt-1">{cap.index}</span>
                <span className="flex flex-col gap-2">
                  <span className="font-display font-bold text-display-sm leading-tight">{cap.name}</span>
                  <span className="text-fg-muted text-base lg:text-lg font-light max-w-[52ch]">“{cap.problem}”</span>
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="size-5 mt-2 text-fg-muted transition-transform duration-base ease-out-quart group-data-panel-open:rotate-45 motion-reduce:transition-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M10 3v14M3 10h14" />
                </svg>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-base ease-out-quart data-starting-style:h-0 data-ending-style:h-0 motion-reduce:transition-none">
              <div className="grid gap-10 lg:grid-cols-12 pb-10 lg:pb-12 lg:pl-[calc(3ch+1.5rem)]">
                <div className="lg:col-span-5">
                  <p className="tag-mark mb-4">o que fazemos</p>
                  <ul className="flex flex-col divide-y divide-line border-y border-line">
                    {cap.offer.map((o) => (
                      <li key={o} className="py-3 text-sm lg:text-base">
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  {cap.aws ? <AwsBlock aws={cap.aws} /> : null}
                  {evidence.length > 0 && (
                    <>
                      <p className="tag-mark mb-4">evidência</p>
                      <ul className="grid gap-x-8 sm:grid-cols-2">
                        {evidence.map((c) => (
                          <li key={c!.slug} className="border-b border-line">
                            <Link
                              href={`/cases/${c!.slug}`}
                              className="group/link flex items-center justify-between gap-4 py-3 text-sm hover:text-accent-bright transition-colors"
                            >
                              <span>
                                <span className="font-medium">{c!.name}</span>
                                {c!.metrics?.[0] && (
                                  <span className="block text-xs text-fg-faint">
                                    {c!.metrics[0].value} {c!.metrics[0].label}
                                  </span>
                                )}
                              </span>
                              <Arrow className="shrink-0 text-fg-faint group-hover/link:text-fg" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {evidence.length === 0 && !cap.aws && (
                    <p className="text-sm text-fg-faint">[Cases desta capacidade pendentes de confirmação]</p>
                  )}
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

function AwsBlock({ aws }: { aws: NonNullable<(typeof capabilities)[number]["aws"]> }) {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <p className="tag-mark">parceria</p>
        <span className="text-xs font-medium border border-line-strong rounded-xs px-2 py-1">{aws.badge}</span>
      </div>
      <p className="text-sm lg:text-base text-fg-muted leading-relaxed mb-6">{aws.intro}</p>
      <p className="tag-mark mb-4">serviços aws</p>
      <ul className="grid sm:grid-cols-2 gap-x-8 border-t border-line">
        {aws.services.map((s) => (
          <li key={s.name} className="border-b border-line py-3">
            <p className="text-sm font-medium">{s.name}</p>
            <p className="text-xs text-fg-faint leading-relaxed mt-0.5">{s.description}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-fg-faint mt-4">[Badge oficial do AWS Partner pendente de asset]</p>
    </div>
  );
}
