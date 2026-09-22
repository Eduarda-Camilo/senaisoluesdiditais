import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cases } from "@/content/cases";
import { site } from "@/content/site";

/** Em quantos cases documentados cada grupo de papéis aparece — derivado dos dados, não inventado. */
function casesWithRole(match: RegExp) {
  return cases.filter((c) => c.team?.some((t) => match.test(t.role))).length;
}
const documented = cases.filter((c) => c.team && c.team.length > 0).length;

const roleGroups = [
  { name: "Liderança técnica", match: /tech lead/i },
  { name: "Gestão de projetos", match: /gerente|gestor/i },
  { name: "Desenvolvimento", match: /desenvolvedor|programador/i },
  { name: "Design", match: /designer/i },
  { name: "Qualidade (QA)", match: /qa/i },
  { name: "Análise de sistemas", match: /analista/i },
  { name: "Dados e infraestrutura", match: /dba|devops/i },
  { name: "3D e multimídia", match: /3d|artista/i },
];

export function About() {
  const groups = roleGroups.map((g) => ({ ...g, count: casesWithRole(g.match) })).filter((g) => g.count > 0);

  return (
    <Section
      id="sobre"
      tag="sobre"
      title="Quem constrói isso."
      intro={`${site.affiliation}. Desde ${site.since}, desenvolvemos tecnologia, software, inteligência artificial e plataformas educacionais para os negócios e a gestão do SESI e do SENAI em Santa Catarina.`}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Missão e valores — texto oficial do manual de marca */}
        <Reveal className="lg:col-span-6 flex flex-col gap-10">
          <div>
            <p className="tag-mark mb-4">missão</p>
            <p className="font-display text-display-sm font-semibold leading-tight max-w-[28ch]">{site.mission}</p>
          </div>
          <dl className="grid sm:grid-cols-2 gap-x-8 border-t border-line">
            {site.values.map((v) => (
              <div key={v.name} className="border-b border-line py-5">
                <dt className="font-medium mb-1">{v.name}</dt>
                <dd className="text-sm text-fg-muted leading-relaxed">{v.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Como trabalhamos — derivado das equipes reais dos 16 cases */}
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 flex flex-col gap-8">
          <div>
            <p className="tag-mark mb-4">como trabalhamos</p>
            <p className="text-fg-muted leading-relaxed">
              Cada produto tem um time próprio e multidisciplinar — liderança técnica, desenvolvimento,
              design, qualidade, análise e, quando necessário, dados, infraestrutura e 3D. Os papéis abaixo
              são os que aparecem nas fichas técnicas dos cases deste site.
            </p>
          </div>
          <ul className="border-t border-line">
            {groups.map((g) => (
              <li key={g.name} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm">
                <span>{g.name}</span>
                <span className="text-fg-muted tabular">
                  em <span className="font-display font-semibold text-fg text-lg">{g.count}</span> de {documented} cases
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-fg-faint">Presença de cada papel nas composições de equipe informadas nos {documented} cases documentados.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted">
            {site.personality.map((p) => (
              <span key={p}>
                <span className="text-mark">/</span> {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
