import Image from "next/image";
import Link from "next/link";
import { CapabilityChips } from "@/components/cases/CapabilityChips";
import { Section } from "@/components/layout/Section";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { cases, featuredCases } from "@/content/cases";
import { cn } from "@/lib/cn";
import { pad } from "@/lib/format";

export function FeaturedCases() {
  const rest = cases.filter((c) => c.tier !== "editorial");

  return (
    <Section
      id="cases"
      tag="cases"
      title="O que já construímos — e o que aconteceu depois."
      intro="Produtos em operação, com números reais. Quatro em profundidade; os demais no índice completo."
    >
      {/* Quatro cases editoriais em escala grande, alternando lado da imagem */}
      <ol className="flex flex-col border-t border-line">
        {featuredCases.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={c.slug} className="border-b border-line">
              <Reveal as="div" className="grid gap-8 lg:grid-cols-12 lg:gap-12 py-12 lg:py-16">
                <div className={cn("lg:col-span-5 flex flex-col gap-6", flip && "lg:order-2 lg:col-start-8")}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-display-sm font-bold text-mark tabular">{pad(i + 1)}</span>
                    <h3 className="font-display font-bold text-display-md">
                      <Link href={`/cases/${c.slug}`} className="hover:text-accent-bright transition-colors">
                        {c.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-lead text-fg-muted font-light max-w-[40ch]">{c.tagline}</p>

                  {c.metrics && (
                    <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 max-w-md">
                      {c.metrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="flex flex-col gap-1.5">
                          <dd className="font-display font-bold text-display-sm tabular leading-none">
                            <Counter value={m.value} />
                          </dd>
                          <dt className="text-sm text-fg-muted leading-snug">
                            {m.label}
                            {m.note && <span className="block text-xs text-fg-faint">{m.note}</span>}
                          </dt>
                        </div>
                      ))}
                    </dl>
                  )}

                  <CapabilityChips slugs={c.capabilities} />

                  <Link
                    href={`/cases/${c.slug}`}
                    className="group inline-flex items-center gap-3 text-sm font-medium mt-2 w-fit"
                  >
                    Ler o case
                    <Arrow className="transition-transform duration-base group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <Link
                  href={`/cases/${c.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className={cn("lg:col-span-7 group block", flip && "lg:order-1 lg:col-start-1")}
                >
                  {c.cover && (
                    <div className="relative aspect-[16/11] overflow-hidden rounded-xs border border-line bg-surface">
                      <Image
                        src={c.cover.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className={cn(
                          "object-contain p-6 lg:p-10 transition-transform duration-slow ease-out-expo group-hover:scale-[1.03] motion-reduce:transition-none",
                          c.cover.height > c.cover.width * 1.05 && "object-cover object-top p-0",
                        )}
                      />
                    </div>
                  )}
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* Índice dos demais — formato de tabela, não de cards */}
      <div className="mt-20 lg:mt-28">
        <Reveal className="flex items-end justify-between gap-6 mb-6">
          <h3 className="font-display font-bold text-display-sm">Índice completo</h3>
          <ButtonLink href="/cases" variant="ghost" className="text-sm">
            Explorar com filtros
          </ButtonLink>
        </Reveal>
        <ol className="border-t border-line">
          {rest.map((c, i) => (
            <li key={c.slug} className="border-b border-line">
              <Link
                href={`/cases/${c.slug}`}
                className="group grid grid-cols-[3ch_1fr_auto] md:grid-cols-[3ch_minmax(0,14rem)_1fr_auto] items-baseline gap-x-6 py-4 lg:py-5 hover:bg-fg/[0.03] transition-colors -mx-3 px-3"
              >
                <span className="text-xs text-fg-faint tabular">{pad(i + featuredCases.length + 1)}</span>
                <span className="font-display font-semibold text-lg lg:text-xl group-hover:text-accent-bright transition-colors">
                  {c.name}
                </span>
                <span className="hidden md:block text-sm text-fg-muted truncate">{c.tagline}</span>
                <Arrow className="text-fg-faint group-hover:text-fg transition-all group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
