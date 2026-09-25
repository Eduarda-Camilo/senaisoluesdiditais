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

  // Contato
  contact: {
    /** Endereço de contato confirmado pela equipe em 25/09/2026. */
    email: "solucoesdigitais@sc.senai.br",
    emailPending: false,
    /**
     * FICTÍCIO — pedido da equipe em 24/09 para a apresentação: um número de Santa
     * Catarina (DDD 48) no formato do mockup. PENDENTE: trocar pelo número real
     * antes de publicar de verdade.
     */
    phone: "+55 (48) 91111-1111",
    address: "", // PENDENTE
  },

  careersUrl: "https://fiesc.pandape.infojobs.com.br/",
  social: [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/82673207/" },
    { name: "Instagram", url: "https://www.instagram.com/senaisolucoesdigitais.sc/" },
    { name: "Facebook", url: "https://www.facebook.com/senaisolucoesdigitais.sc/" },
  ],
} as const;

/**
 * Números de escala da operação.
 *
 * O feedback #6 removeu "20 produtos no portfólio": contagem de projetos não é
 * status da empresa, e extrapolá-la para o core soa inflado. Ficaram só números
 * de uso real, e cada um carrega o campo `method` — a metodologia é o que impede
 * o número de parecer maior do que é.
 *
 * PENDENTE: a equipe precisa confirmar se este é o conjunto que representa o SD
 * como um todo. Ver docs/DIRECAO-V2.md §9, decisão 1.
 */
export const scaleNumbers = [
  {
    value: "+230 mil",
    label: "usuários ativos",
    method: "Contas com atividade no AVA SENAI, a plataforma de ensino que operamos.",
    source: "ava-senai",
    chip: { src: "/cases/ava-senai/cover.png", alt: "Painel do aluno no AVA SENAI" },
  },
  {
    value: "+150 mil",
    label: "matrículas processadas",
    method: "Matrículas concluídas pelo e-commerce de cursos do SENAI/SESI-SC.",
    source: "e-commerce",
    chip: { src: "/cases/e-commerce/cover.png", alt: "Catálogo de cursos do e-commerce" },
  },
  {
    value: "+70 mil",
    label: "estudantes alcançados",
    method: "Estudantes atendidos pelo DEVstart, programa de formação em tecnologia.",
    source: "devstart",
    chip: { src: "/cases/devstart/cover.png", alt: "Telas do DEVstart" },
  },
] as const;

/**
 * Seção Sobre — os três pilares.
 *
 * Fonte: mockup da equipe (Lucas/Duda), 23/09/2026 — texto entregue pronto, não
 * derivado nem parafraseado. Substitui os dois parágrafos e os números da versão
 * anterior, que o mockup não traz.
 */
export const about = {
  pillars: [
    {
      title: "Origem",
      text: "Nascemos em 2007, no coração de Santa Catarina, como o braço tecnológico da FIESC e do SENAI Nacional, como resposta aos desafios digitais internos e nos consolidamos como uma das principais referências em desenvolvimento de software, IA Generativa e EdTechs do país.",
    },
    {
      title: "Ecossistema",
      text: "Operamos com a solidez institucional do maior ecossistema de formação profissional da América Latina, combinada à agilidade, inovação e flexibilidade de uma software house nativa digital.",
    },
    {
      title: "Propósito",
      text: "Acreditamos que a tecnologia transforma o mundo e humaniza o futuro. Conectamos pessoas, processos e indústrias através de soluções que geram valor real e escalável.",
    },
  ],
} as const;

/**
 * Trabalhe conosco — textos do mockup da equipe (24/09).
 *
 * PENDENTE: "mais de 550 colaboradores" e "24 estados" vêm do mockup e não têm
 * outra fonte no projeto; a equipe precisa confirmar antes da entrega. O botão do
 * mockup dizia "550 Vagas abertas" — repete o número de colaboradores e o total
 * de vagas muda todo dia no Pandapé, então virou "Ver vagas abertas".
 */
export const careers = {
  intro:
    "Somos mais de 550 colaboradores espalhados por 24 estados do Brasil, operando em um modelo 100% remoto.",
  perks: [
    {
      title: "Trabalho Remoto\u00a0& Flexibilidade",
      text: "Atue de onde quiser com horários que respeitam seu equilíbrio e estilo de vida.",
    },
    {
      title: "Projetos de Alto Impacto",
      text: "Soluções reais com Inteligência Artificial (IA), Realidade Estendida (XR) e código de ponta.",
    },
    {
      title: "Autonomia de Verdade",
      text: "Confiança total no seu trabalho. Liberdade para propor soluções.",
    },
    {
      title: "Remuneração\u00a0& Evolução",
      text: "Salários competitivos com o mercado tech e incentivo contínuo ao seu aprendizado.",
    },
  ],
  photos: [
    { src: "/carreiras/equipe-03.webp", alt: "Colaborador fala ao microfone para a equipe, ao lado de dois colegas" },
    { src: "/carreiras/equipe-02.webp", alt: "Colaboradora sorri durante uma dinâmica em grupo com colegas" },
    { src: "/carreiras/equipe-01.webp", alt: "Três colegas sorriem enquanto acompanham uma apresentação em um encontro da equipe" },
    { src: "/carreiras/equipe-04.webp", alt: "Dois colaboradores acompanham uma apresentação" },
    { src: "/carreiras/equipe-05.webp", alt: "Colaboradora posa em frente ao painel da SENAI Soluções Digitais", position: "50% 30%" },
  ],
} as const;
