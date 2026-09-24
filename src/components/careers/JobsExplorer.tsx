"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, MagnifyingGlass } from "@/components/ui/icons";
import { jobAreas, jobs, type Job, type JobArea } from "@/content/jobs";

/**
 * Filtros + lista de vagas — mockup "Nossas vagas" da equipe (24/09).
 *
 * Mesmo esqueleto do /cases (coluna de filtros de 268px, lista de 996px a 1440).
 * O filtro por área é de escolha única, com "Ver todos" ativo por padrão; a busca
 * procura no título e na área, sem diferenciar maiúsculas nem acentos.
 */

const filterCls =
  "rounded-xs border border-fg px-[0.9375rem] py-2 text-left text-sm leading-5 text-fg-body cursor-pointer select-none transition-colors duration-fast hover:bg-fg/10 aria-pressed:border-azul-digital aria-pressed:bg-azul-digital aria-pressed:text-neutra-100";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export function JobsExplorer() {
  const [area, setArea] = useState<JobArea | null>(null);
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = normalize(query.trim());
    return jobs.filter(
      (j) => (!area || j.area === area) && (!q || normalize(`${j.title} ${j.area}`).includes(q)),
    );
  }, [area, query]);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[16.75rem_minmax(0,1fr)] lg:gap-x-20">
      {/* Filtros */}
      <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
        <h2 className="font-display font-bold text-[1.81rem] leading-[1.1] tracking-[-0.015em] text-accent-bright">
          Carreiras
        </h2>

        <div role="search" className="relative">
          <label htmlFor="busca-vagas" className="sr-only">
            Buscar carreiras
          </label>
          <input
            id="busca-vagas"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar carreiras"
            className="w-full rounded-xs border border-fg-muted bg-[#181818] py-2.5 pl-4 pr-11 text-base text-fg placeholder:text-fg-muted focus:border-fg focus:outline-none focus:shadow-[0_0_0_1px_var(--color-fg)] transition-[border-color,box-shadow] duration-fast [&::-webkit-search-cancel-button]:hidden"
          />
          <MagnifyingGlass
            size={20}
            weight="bold"
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fg"
          />
        </div>

        <div
          role="group"
          aria-label="Filtrar por área"
          className="flex flex-wrap items-start gap-2 lg:flex-col lg:gap-[0.4375rem]"
        >
          <button type="button" aria-pressed={area === null} onClick={() => setArea(null)} className={filterCls}>
            Ver todos
          </button>
          {jobAreas.map((a) => (
            <button key={a} type="button" aria-pressed={area === a} onClick={() => setArea(a)} className={filterCls}>
              {a}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {list.length === 1 ? "1 vaga" : `${list.length} vagas`}
        </p>
      </div>

      {/* Lista */}
      <div>
        {list.length > 0 ? (
          <ul className="flex flex-col gap-5">
            {list.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-4 border-2 border-line-strong bg-surface-2 p-8">
            <p className="text-fg-body">Nenhuma vaga aberta com esse filtro no momento.</p>
            <button
              type="button"
              onClick={() => {
                setArea(null);
                setQuery("");
              }}
              className="text-sm text-fg-body underline underline-offset-4 hover:text-fg cursor-pointer"
            >
              Ver todas as vagas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <li className="grid gap-x-8 gap-y-6 border-2 border-line-strong bg-surface-2 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-8">
      <div className="flex min-w-0 flex-col gap-5">
        <h3 className="max-w-[40rem] [text-wrap:wrap] font-display font-extrabold text-[1.375rem] sm:text-2xl leading-[0.85] tracking-[-0.03em] text-fg">
          {/* Ponto de quebra depois da barra, como no mockup ("…React/ React Native"). */}
          {job.title.replaceAll("/", "/\u200B")}
        </h3>
        <div className="flex flex-col gap-1">
          <p className="flex gap-6 text-sm leading-5 text-fg-body">
            <span>{job.modality}</span>
            <span>{job.contract}</span>
          </p>
          <p className="font-display font-bold text-lg leading-7">
            <span className="text-accent tabular">{brl.format(job.salary)}</span>{" "}
            <span className="text-fg">+benefícios</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-5 sm:items-end">
        <p className="font-display font-semibold text-xl leading-7 text-fg">
          Inscrições até <span className="text-accent tabular">{job.deadline}</span>
        </p>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-w-[10.5rem] items-center justify-between gap-6 border-b border-fg pb-2 text-sm leading-5 text-fg transition-colors duration-fast hover:border-accent-bright hover:text-accent-bright"
        >
          Ver oportunidade
          <ArrowUpRight
            size={16}
            weight="bold"
            aria-hidden="true"
            className="transition-transform duration-base ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
          <span className="sr-only">
            {" "}
            — {job.title} (abre em nova aba)
          </span>
        </a>
      </div>
    </li>
  );
}
