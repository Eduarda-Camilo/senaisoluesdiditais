/**
 * Vagas da página /vagas ("Nossas vagas").
 *
 * EXEMPLO — hoje as vagas são as do mockup da equipe (24/09), copiadas como
 * estão: não são vagas abertas de verdade. O plano é ligar esta lista a uma
 * planilha em que a equipe preenche as vagas e a IA gera cada card; por isso o
 * formato é plano, uma coluna por campo, sem nada que dependa do código:
 *
 *   id | titulo | area | modalidade | contrato | salario | inscricoesAte | url
 *
 * `area` precisa ser um dos valores de `jobAreas` (são os filtros da página).
 * `salary` vem em reais, como número — a formatação fica na página.
 * `deadline` fica como a planilha mostra ("dd/mm"), sem inventar o ano.
 * `url` é o link da vaga; enquanto a integração não existe, aponta para a
 * página de vagas do Pandapé.
 */

import { site } from "./site";

export const jobAreas = [
  "Desenvolvedor",
  "UI/UX Designer",
  "Analista de Sistemas",
  "Suporte",
  "Analista de Qualidade de Software",
  "Multimídia",
  "Analista de Banco de Dados",
  "Analista Administrativo",
  "Analista de Gestão de Projetos",
  "Analista de Big Data",
  "Tech Lead",
  "Analista de Business Intelligence",
] as const;

export type JobArea = (typeof jobAreas)[number];

export interface Job {
  id: string;
  title: string;
  area: JobArea;
  modality: string;
  contract: string;
  /** Salário mensal em reais. */
  salary: number;
  /** Fim das inscrições, "dd/mm". */
  deadline: string;
  url: string;
}

const uiux = (id: string): Job => ({
  id,
  title: "UI/UX Designer - Pleno",
  area: "UI/UX Designer",
  modality: "Home-office",
  contract: "CLT",
  salary: 6872.68,
  deadline: "02/06",
  url: site.careersUrl,
});

const frontend = (id: string): Job => ({
  id,
  title: "Desenvolvedor FrontEnd React/React Native - Sênior",
  area: "Desenvolvedor",
  modality: "Home-office",
  contract: "CLT",
  salary: 8669.86,
  deadline: "02/06",
  url: site.careersUrl,
});

// Mesma sequência do mockup.
export const jobs: Job[] = [
  uiux("uiux-1"),
  frontend("frontend-1"),
  uiux("uiux-2"),
  frontend("frontend-2"),
  uiux("uiux-3"),
  uiux("uiux-4"),
  frontend("frontend-3"),
  frontend("frontend-4"),
];
