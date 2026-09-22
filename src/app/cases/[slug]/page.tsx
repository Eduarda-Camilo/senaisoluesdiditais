import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CapabilityChips } from "@/components/cases/CapabilityChips";
import { StatusLabel } from "@/components/cases/StatusLabel";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { cases, getCase } from "@/content/cases";
import { cn } from "@/lib/cn";
import { formatMonthYear, pad } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

const segmentLabel = {
  educacao: "Educação",
  industria: "Indústria",
  gestao: "Gestão",
  sst: "Segurança do trabalho",
} as const;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  return {
    title: c.name,
    description: c.tagline,
    openGraph: { title: `${c.name} — SENAI Soluções Digitais`, description: c.tagline, images: c.cover ? [c.cover.src] : undefined },
  };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const idx = cases.indexOf(c);
  const prev = cases[(idx - 1 + cases.length) % cases.length];
  const next = cases[(idx + 1) % cases.length];
  const isTall = c.cover ? c.cover.height > c.cover.width * 1.05 : false;

  return (
    <article className="pb-24">
      {/* Cabeçalho */}
      <header className="container-site pt-12 lg:pt-20 grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-8 flex flex-col gap-5">
          <p className="tag-mark">
            case {pad(idx + 1)} · {segmentLabel[c.segment]}
          </p>
          <h1 className="font-display font-bold text-display-lg max-w-[18ch]">{c.name}</h1>
          <p className="text-lead text-fg-muted font-light max-w-[48ch]">{c.tagline}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <CapabilityChips slugs={c.capabilities} />
            <StatusLabel status={c.status} />
          </div>
        </Reveal>
        {c.logo && (
          <Reveal delay={0.1} className="lg:col-span-3 lg:col-start-10 flex lg:justify-end items-start">
            <Image src={c.logo.src} alt={`Logo ${c.name}`} width={c.logo.width} height={c.logo.height} className="h-10 lg:h-12 w-auto opacity-90" />
          </Reveal>
        )}
      </header>

      {/* Imagem principal */}
      {c.cover ? (
        <Reveal delay={0.15} className="container-site mt-12 lg:mt-16">
          <figure>
            <div
              className={cn(
                "relative overflow-hidden rounded-xs border border-line bg-surface",
                isTall ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[16/10]",
              )}
            >
              <Image
                src={c.cover.src}
                alt={c.cover.alt}
                fill
                priority
                sizes="(min-width: 1440px) 1344px, 100vw"
                className={cn(isTall ? "object-cover object-top" : "object-contain p-6 lg:p-14")}
              />
            </div>
            <figcaption className="mt-3 text-xs text-fg-faint">{c.cover.alt}</figcaption>
          </figure>
        </Reveal>
      ) : (
        <div className="container-site mt-12">
          <p className="border border-dashed border-line rounded-xs p-6 text-sm text-fg-faint">
            [Material visual pendente — este case foi descrito apenas no site anterior.]
          </p>
        </div>
      )}

      {/* Indicadores */}
      {c.metrics && c.metrics.length > 0 && (
        <div className="border-y border-line mt-16 lg:mt-24">
          <dl className={cn("container-site grid divide-y sm:divide-y-0 sm:divide-x divide-line", c.metrics.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
            {c.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} className="py-8 lg:py-10 sm:pr-8 sm:[&:not(:first-child)]:pl-8 flex flex-col gap-3">
                <dd className="order-1 font-display font-bold text-display-md tabular leading-none">
                  <Counter value={m.value} />
                </dd>
                <dt className="order-2 text-sm text-fg-muted leading-snug">
                  {m.label}
                  {m.note && <span className="block text-xs text-fg-faint mt-0.5">{m.note}</span>}
                </dt>
              </Reveal>
            ))}
          </dl>
        </div>
      )}

      {/* Corpo + ficha técnica */}
      <div className="container-site mt-16 lg:mt-24 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 flex flex-col gap-14">
          <Reveal>
            <p className="tag-mark mb-5">contexto</p>
            <div className="flex flex-col gap-5 text-base lg:text-lg leading-relaxed text-fg/90 max-w-[62ch]">
              {c.context.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          {c.challenge && (
            <Reveal>
              <p className="tag-mark mb-5">desafio</p>
              <p className="font-display text-display-sm font-semibold leading-tight max-w-[30ch]">{c.challenge}</p>
            </Reveal>
          )}

          {c.deliverables.length > 0 && (
            <Reveal>
              <p className="tag-mark mb-5">o que foi entregue</p>
              <ol className="border-t border-line">
                {c.deliverables.map((d, i) => (
                  <li key={d} className="grid grid-cols-[3ch_1fr] gap-4 border-b border-line py-4 text-base leading-relaxed">
                    <span className="text-xs text-mark tabular pt-1.5">{pad(i + 1)}</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}

          {c.outcomeNote && (
            <Reveal>
              <p className="tag-mark mb-5">resultado</p>
              <p className="text-lg lg:text-xl leading-relaxed max-w-[52ch]">{c.outcomeNote}</p>
            </Reveal>
          )}

          {!c.metrics && !c.outcomeNote && (
            <p className="text-xs text-fg-faint">[Indicadores de resultado ainda não informados para este case.]</p>
          )}
        </div>

        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-24">
            <p className="tag-mark mb-5">ficha técnica</p>
            <dl className="border-t border-line text-sm">
              {c.startDate && (
                <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3">
                  <dt className="text-fg-muted">Início</dt>
                  <dd className="tabular">{formatMonthYear(c.startDate)}</dd>
                </div>
              )}
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3">
                <dt className="text-fg-muted">Segmento</dt>
                <dd>{segmentLabel[c.segment]}</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3">
                <dt className="text-fg-muted">Capacidades</dt>
                <dd>
                  <CapabilityChips slugs={c.capabilities} className="flex-col gap-y-1.5" />
                </dd>
              </div>
              {c.team && (
                <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3">
                  <dt className="text-fg-muted">Equipe</dt>
                  <dd>
                    <ul className="flex flex-col gap-1">
                      {c.team.map((t) => (
                        <li key={t.role} className="flex justify-between gap-3">
                          <span>{t.role}</span>
                          <span className="tabular text-fg-muted">{t.count}</span>
                        </li>
                      ))}
                      <li className="flex justify-between gap-3 border-t border-line pt-1 mt-1 font-medium">
                        <span>Total</span>
                        <span className="tabular">{c.team.reduce((a, t) => a + t.count, 0)}</span>
                      </li>
                    </ul>
                  </dd>
                </div>
              )}
              {c.status && (
                <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3">
                  <dt className="text-fg-muted">Status</dt>
                  <dd>
                    <StatusLabel status={c.status} />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </Reveal>
      </div>

      {/* Galeria */}
      {c.gallery && c.gallery.length > 0 && (
        <div className="container-site mt-16 lg:mt-24">
          <Reveal>
            <p className="tag-mark mb-6">telas</p>
          </Reveal>
          <ul className={cn("grid gap-4 lg:gap-6", c.gallery.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
            {c.gallery.map((g, i) => (
              <Reveal key={g.src} as="li" delay={i * 0.06}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xs border border-line bg-surface">
                    <Image src={g.src} alt={g.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-contain p-4" />
                  </div>
                  <figcaption className="mt-2 text-xs text-fg-faint">{g.alt}</figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      )}

      {/* Navegação entre cases */}
      <nav aria-label="Outros cases" className="container-site mt-20 lg:mt-28">
        <div className="grid sm:grid-cols-2 border-y border-line divide-y sm:divide-y-0 sm:divide-x divide-line">
          <Link href={`/cases/${prev.slug}`} className="group py-6 sm:pr-8 flex flex-col gap-2">
            <span className="text-xs text-fg-faint">← Anterior · {pad(cases.indexOf(prev) + 1)}</span>
            <span className="font-display font-bold text-xl group-hover:text-accent-bright transition-colors">{prev.name}</span>
          </Link>
          <Link href={`/cases/${next.slug}`} className="group py-6 sm:pl-8 flex flex-col gap-2 sm:text-right sm:items-end">
            <span className="text-xs text-fg-faint">Próximo · {pad(cases.indexOf(next) + 1)} →</span>
            <span className="font-display font-bold text-xl group-hover:text-accent-bright transition-colors">{next.name}</span>
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/cases" variant="outline" arrow={false}>
            Todos os cases
          </ButtonLink>
          <ButtonLink href="/#contato">
            Conversar sobre um projeto assim
          </ButtonLink>
        </div>
      </nav>
    </article>
  );
}

