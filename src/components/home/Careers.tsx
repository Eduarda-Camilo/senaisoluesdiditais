import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cases } from "@/content/cases";
import { site } from "@/content/site";

export function Careers() {
  const examples = cases.filter((c) => ["ava-senai", "saep-ia", "senai-space", "seif"].includes(c.slug));
  return (
    <Section
      id="carreiras"
      tag="trabalhe conosco"
      title="O que você construiria aqui."
      intro="Projetos com IA, realidade estendida, dados e plataformas de grande escala — com impacto real na educação profissional e na indústria."
      aside={
        <div className="flex flex-col gap-3">
          <ButtonLink href={site.careersUrl}>Ver vagas disponíveis</ButtonLink>
          <p className="text-xs text-fg-faint">Processo seletivo centralizado na plataforma da FIESC (abre em nova aba).</p>
        </div>
      }
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="tag-mark mb-4">exemplos do que a equipe entrega</p>
          <ul className="border-t border-line">
            {examples.map((c) => (
              <li key={c.slug} className="border-b border-line">
                <Link href={`/cases/${c.slug}`} className="grid sm:grid-cols-[minmax(0,12rem)_1fr] gap-x-6 gap-y-1 py-4 group">
                  <span className="font-display font-semibold group-hover:text-accent-bright transition-colors">{c.name}</span>
                  <span className="text-sm text-fg-muted">{c.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
          <div>
            <p className="tag-mark mb-4">contexto de trabalho</p>
            <ul className="flex flex-col gap-3 text-sm text-fg-muted leading-relaxed">
              <li>Times por produto, com tech lead, desenvolvimento, design, QA e análise.</li>
              <li>Tecnologias emergentes: IA generativa, realidade virtual e aumentada, big data, cloud.</li>
              <li>Ambiente colaborativo, com oportunidades de aprendizado e desenvolvimento contínuo.</li>
            </ul>
          </div>
          <div>
            <p className="tag-mark mb-3">acompanhe as oportunidades</p>
            <ul className="flex gap-5 text-sm">
              {site.social.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg transition-colors">
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
