import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { StatusLabel } from "@/components/cases/StatusLabel";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { capabilities } from "@/content/capabilities";
import { caseDetailImage, cases, casesInOrder, getCase } from "@/content/cases";
import { formatMonthYear } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

const segmentLabel = {
  educacao: "Educação",
  industria: "Indústria",
  gestao: "Gestão",
  sst: "Segurança do trabalho",
} as const;

const headingCls =
  "font-display font-bold text-[1.81rem] leading-[1.1] tracking-[-0.015em] text-accent-bright";
const fieldLabelCls = "w-28 shrink-0 text-xs leading-none tracking-[0.12em] uppercase text-fg-body";

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

/**
 * Detalhe do case — design V3 (Figma "Case — AVA SENAI · 1440 (V2)", node 108:414).
 *
 * O design só existe para o AVA; os outros cases seguem o mesmo molde. A
 * imagem grande vem de `caseDetailImage`; case sem material visual não tem o
 * quadro.
 *
 * Blocos que o design do AVA não mostra mas que outros cases têm no material
 * (desafio, resultado, início, status) usam o mesmo padrão de título azul.
 */
export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const idx = casesInOrder.indexOf(c);
  const prev = casesInOrder[(idx - 1 + casesInOrder.length) % casesInOrder.length];
  const next = casesInOrder[(idx + 1) % casesInOrder.length];
  const image = caseDetailImage(c);
  const caps = c.capabilities.map((s) => capabilities.find((x) => x.slug === s)!);

  return (
    <article>
      {/* Cabeçalho */}
      <header className="container-site pt-12 pb-12 lg:pt-16 flex flex-col gap-5">
        <nav aria-label="Trilha" className="meta flex gap-2">
          <Link href="/cases" className="text-fg-muted hover:text-fg transition-colors">
            cases
          </Link>
          <span aria-hidden="true" className="text-mark">
            /
          </span>
          <span aria-current="page" className="text-fg">
            {c.name}
          </span>
        </nav>
        <Reveal className="flex flex-col gap-5">
          {/* Mínimo menor que o do /cases: "SENAI/SESI" a 40px não cabe em 342px. */}
          <h1 className="font-display font-extrabold text-[clamp(2rem,1.1rem+4.1vw,4.82rem)] leading-[0.9] tracking-[-0.03em] [overflow-wrap:anywhere]">
            {c.name}
          </h1>
          <p className="font-light text-[clamp(1.125rem,0.95rem+0.75vw,1.45rem)] leading-[1.45] text-fg-body">
            {c.tagline}
          </p>
        </Reveal>
        {/* Indicadores lado a lado, embaixo do título (pedido de 24/09): o título
            fica com a largura toda e não quebra em nomes longos. */}
        {c.metrics && c.metrics.length > 0 && (
          <Reveal delay={0.1}>
            <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-6">
              {c.metrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-2">
                  <dd className="order-1 font-display font-bold text-[clamp(2rem,1.5rem+1.4vw,2.63rem)] leading-[1.05] tracking-[-0.02em] text-accent-bright tabular">
                    <Counter value={m.value} />
                  </dd>
                  <dt className="order-2 font-light text-[clamp(1.125rem,0.95rem+0.75vw,1.45rem)] leading-[1.45] text-fg-body">
                    {m.label}
                    {m.note && <span className="block text-sm font-normal text-fg-faint">{m.note}</span>}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </header>

      {/* Imagem grande — só quando o case tem material visual */}
      {image && (
        <Reveal delay={0.15} className="container-site">
          <div className="relative h-[clamp(15rem,43vw,38.75rem)] overflow-hidden border border-line bg-bg">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 90rem) 84rem, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      )}

      {/* Corpo + ficha técnica */}
      <div className="container-site py-16 lg:py-20 flex flex-col gap-12 lg:flex-row">
        <div className="flex flex-col gap-14 lg:w-[49rem] lg:shrink-0 min-w-0">
          <Reveal className="flex flex-col gap-5">
            <h2 className={headingCls}>Contexto</h2>
            {c.context.map((p) => (
              <p key={p} className="max-w-[43.75rem] text-base leading-[1.625rem] text-fg-body">
                {p}
              </p>
            ))}
          </Reveal>

          {c.challenge && (
            <Reveal className="flex flex-col gap-5">
              <h2 className={headingCls}>Desafio</h2>
              <p className="max-w-[43.75rem] text-base leading-[1.625rem] text-fg-body">{c.challenge}</p>
            </Reveal>
          )}

          {c.deliverables.length > 0 && (
            <Reveal className="flex flex-col gap-5">
              <h2 className={headingCls}>O que foi entregue</h2>
              <ul className="border-t border-line">
                {c.deliverables.map((d) => (
                  <li key={d} className="border-b border-line py-3.5 text-base leading-[1.625rem] text-fg-body">
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {c.outcomeNote && (
            <Reveal className="flex flex-col gap-5">
              <h2 className={headingCls}>Resultado</h2>
              <p className="max-w-[43.75rem] text-base leading-[1.625rem] text-fg-body">{c.outcomeNote}</p>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1} className="flex-1 min-w-0 lg:self-start lg:sticky lg:top-24">
          <aside
            aria-labelledby="ficha-titulo"
            className="flex flex-col gap-5 border border-line-strong bg-surface-2 p-6"
          >
            <h2 id="ficha-titulo" className={headingCls}>
              Ficha técnica
            </h2>
            <dl className="border-t border-line">
              {c.startDate && (
                <Field label="Início">{formatMonthYear(c.startDate)}</Field>
              )}
              <Field label="Segmento">{segmentLabel[c.segment]}</Field>
              <Field label="Capacidades">
                <ul className="flex flex-col gap-1">
                  {caps.map((cap) => (
                    <li key={cap.slug}>
                      <Link href={`/cases?capacidade=${cap.slug}`} className="hover:text-accent-bright transition-colors">
                        <span className="tabular">{cap.index}</span> {cap.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Field>
              {c.status && (
                <Field label="Status">
                  <StatusLabel status={c.status} />
                </Field>
              )}
            </dl>

            {c.team && (
              <div className="flex flex-col gap-3">
                <h3 className={headingCls}>Equipe</h3>
                <dl>
                  {c.team.map((t) => (
                    <div key={t.role} className="flex items-baseline justify-between gap-4 border-b border-line py-2">
                      <dt className="text-xs leading-none tracking-[0.12em] uppercase text-fg-body">{t.role}</dt>
                      <dd className="text-sm leading-5 text-fg tabular">{t.count}</dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 border-b border-line py-2 text-sm leading-5 text-fg">
                    <dt>Total</dt>
                    <dd className="tabular">{c.team.reduce((a, t) => a + t.count, 0)}</dd>
                  </div>
                </dl>
              </div>
            )}
          </aside>
        </Reveal>
      </div>

      {/* Anterior / próximo */}
      <nav aria-label="Outros cases" className="border-t border-line">
        <div className="container-site flex justify-between gap-8 pt-10 pb-16">
          <Link href={`/cases/${prev.slug}`} className="group flex flex-col gap-2">
            <span className="text-lg leading-[1.625]">← Anterior</span>
            <span className="font-display font-bold text-2xl leading-8 group-hover:text-accent-bright transition-colors">
              {prev.name}
            </span>
          </Link>
          <Link href={`/cases/${next.slug}`} className="group flex flex-col items-end gap-2 text-right">
            <span className="text-lg leading-[1.625]">Próximo →</span>
            <span className="font-display font-bold text-2xl leading-8 group-hover:text-accent-bright transition-colors">
              {next.name}
            </span>
          </Link>
        </div>
      </nav>
    </article>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-line py-3">
      <dt className={fieldLabelCls}>{label}</dt>
      <dd className="min-w-0 flex-1 text-sm leading-5 text-fg">{children}</dd>
    </div>
  );
}
