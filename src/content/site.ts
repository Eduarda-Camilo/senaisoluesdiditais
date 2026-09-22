/**
 * Dados institucionais. Fontes: Branding Guide V.1 (2022), site atual, respostas da equipe.
 * Campos marcados como PENDENTE aparecem na UI como placeholders identificados.
 */
export const site = {
  name: "SENAI Soluções Digitais",
  shortName: "Soluções Digitais",
  url: "https://senaisolucoesdigitais.com.br",
  since: 2007,
  /** Vínculo institucional (resposta da equipe). */
  affiliation: "Área do SENAI-SC e braço tecnológico da FIESC",
  location: "Santa Catarina, Brasil",

  // Manual de marca — valores
  mission:
    "Fornecer soluções digitais inovadoras e eficazes para nossos clientes, por colaboração e parceria com profissionais altamente qualificados e comprometidos, para contribuir para o desenvolvimento econômico e social.",
  vision:
    "Ser reconhecidos como líderes no fornecimento de soluções digitais personalizadas e inovadoras, contribuindo para o desenvolvimento tecnológico e econômico do país.",
  values: [
    { name: "Inovação", text: "Buscamos novas formas de melhorar produtos e serviços para atender às necessidades dos clientes." },
    { name: "Colaboração", text: "Trabalhamos em parceria com os clientes para fornecer soluções digitais personalizadas e eficazes." },
    { name: "Qualidade", text: "Soluções de alta qualidade e confiabilidade, com profissionais qualificados e comprometidos." },
    { name: "Responsabilidade social", text: "Contribuímos para o desenvolvimento econômico e social do país por meio de soluções digitais." },
  ],
  personality: ["Inovadora", "Tecnológica", "Colaborativa"],
  voice: ["Profissional", "Educativa", "Informativa"],

  // Contato — PENDENTE
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    emailPending: !process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    phone: "", // PENDENTE
    address: "", // PENDENTE
  },

  careersUrl: "https://fiesc.pandape.infojobs.com.br/",
  social: [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/82673207/" },
    { name: "Instagram", url: "https://www.instagram.com/senaisolucoesdigitais.sc/" },
    { name: "Facebook", url: "https://www.facebook.com/senaisolucoesdigitais.sc/" },
  ],
} as const;

/** Números-chave da home. Cada um cita a fonte (case) para rastreabilidade. */
export const headlineNumbers = [
  { value: "+230 mil", label: "usuários ativos no AVA SENAI", source: "ava-senai" },
  { value: "+150 mil", label: "matrículas pelo e-commerce", source: "e-commerce" },
  { value: "+70 mil", label: "estudantes no DEVstart", source: "devstart" },
  { value: "20", label: "produtos no portfólio", source: "cases" },
] as const;
