import Link from "next/link";
import type { ReactNode } from "react";
import { SenaiWordmark, SolucoesDigitaisWordmark } from "@/components/brand/Wordmarks";
import { ContactLink } from "@/components/ui/ContactLink";
import { filterCapabilities } from "@/content/capabilities";
import { cases } from "@/content/cases";
import { site } from "@/content/site";

/**
 * Rodapé — layout da equipe no Figma (25/09): 188:21503 é o estado inicial,
 * 188:21611 o hover do logotipo; reorganizado no mesmo dia para o logotipo
 * conviver com o mapa do site.
 *
 * Uma linha só: o símbolo do SD à esquerda e o mapa do site à direita. A base
 * (linha, direitos, política e o nome grande) fica fora do container: ocupa a
 * largura da tela menos as margens laterais, em qualquer tamanho. Ao passar
 * o mouse (ou focar pelo teclado), "SENAI / SOLUÇÕES DIGITAIS" saem de dentro do
 * símbolo. A coluna do logotipo já reserva a largura dele aberto, então as
 * colunas não se mexem — só o logotipo anima. A largura do link anima com
 * `grid-template-columns` de 0fr a 1fr (sem medir nada em JS) e as palavras
 * entram em seguida, SENAI e depois SOLUÇÕES DIGITAIS; na saída somem primeiro e
 * a largura fecha depois. O pequeno atraso na entrada evita que o logo abra
 * quando o mouse só passa por cima. Abaixo de 1440px o logotipo fica em cima das
 * colunas (ao lado, elas ficavam estreitas demais).
 *
 * O mapa do site é a navegação do rodapé (pedido de 25/09, SEO e
 * acessibilidade): toda página do site tem um link direto daqui, e as seções da
 * home também. Quatro colunas; a terceira e a quarta empilham dois grupos
 * (Empresa + Carreiras, Contato + Redes). Cada grupo tem título (h2) e lista
 * rotulada por ele, para quem navega por títulos com leitor de tela. Depois,
 * hairline, direitos + política e o nome "SENAI SOLUÇÕES DIGITAIS" ocupando a
 * largura inteira do container — o corpo sai da largura do próprio container
 * (`cqw`; a razão largura/corpo do texto é ~22,4). Com `vw` a barra de rolagem
 * entrava na conta e o texto vazava.
 *
 * Também publica os dados da organização em JSON-LD (schema.org), só com o que
 * o site já afirma — sem o telefone, que ainda é fictício.
 *
 * É transparente de propósito: na home, o contorno do símbolo do Entre em
 * contato continua por baixo dele (ver `Backdrop` em home/Contact.tsx).
 *
 * PENDENTE: o site não tem página de política de privacidade — o item fica como
 * texto até existir o endereço.
 */

type FooterLink = { href: string; label: string };

// Os mesmos serviços da home — sem Cloud e DevOps na AWS, que vive em Parcerias
// e em /aws (link "Parceria AWS" em Empresa).
const services: FooterLink[] = filterCapabilities.map((c) => ({ href: `/cases?capacidade=${c.slug}`, label: c.name }));

const featuredCases: FooterLink[] = [
  ...cases.filter((c) => c.tier === "editorial").map((c) => ({ href: `/cases/${c.slug}`, label: c.name })),
  { href: "/cases", label: "Todos os cases" },
];

const company: FooterLink[] = [
  { href: "/#sobre", label: "Sobre nós" },
  { href: "/#parcerias", label: "Parcerias" },
  { href: "/aws", label: "Parceria AWS" },
];

const careers: FooterLink[] = [
  { href: "/#carreiras", label: "Trabalhe conosco" },
  { href: "/vagas", label: "Vagas abertas" },
];

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/brand/sd-simbolo-principal.svg`,
  foundingDate: String(site.since),
  email: site.contact.email,
  address: { "@type": "PostalAddress", addressRegion: "SC", addressCountry: "BR" },
  sameAs: site.social.map((s) => s.url),
};

const linkCls =
  "inline-block py-1 text-base leading-6 text-fg-body transition-colors duration-fast hover:text-fg";
const headingCls = "font-mono text-sm uppercase leading-5 tracking-[0.08em] text-fg-muted";

/**
 * Largura do logotipo. Abre em ease-out suave (responde logo e assenta devagar);
 * na saída espera as palavras sumirem e fecha em ease-in-out.
 */
const revealCls =
  "grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] delay-100 group-hover:grid-cols-[1fr] group-hover:duration-[800ms] group-hover:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:delay-75 group-focus-visible:grid-cols-[1fr] group-focus-visible:duration-[800ms] group-focus-visible:ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-visible:delay-0 motion-reduce:transition-none";

/** Cada palavra entra deslizando para fora do símbolo, um pouco depois da largura; sai rápido. */
const wordCls = (enterDelay: string) =>
  `block -translate-x-6 opacity-0 transition-[opacity,translate] duration-200 ease-in delay-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:duration-700 group-hover:ease-out-quart group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:duration-700 group-focus-visible:ease-out-quart ${enterDelay} motion-reduce:transition-none`;

export function Footer() {
  return (
    <footer className="relative">
      <script
        type="application/ld+json"
        // O conteúdo é estático e vem de content/site.ts.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <div className="container-site pt-12 lg:pt-16">
        <div className="flex flex-col gap-12 pb-16 min-[90rem]:flex-row min-[90rem]:gap-12">
          {/* Reserva a largura do logotipo aberto (símbolo + palavras) para as
              colunas ficarem paradas no hover. */}
          <div className="shrink-0 min-[90rem]:w-[24rem]">
            <Link href="/" aria-label={`${site.name} — início`} className="group flex w-fit items-center">
              {/* O símbolo é o mesmo desenho de public/brand/sd-simbolo-branco.svg. */}
              <svg
                viewBox="0 0 122 145"
                fill="currentColor"
                aria-hidden="true"
                className="h-[6.5rem] w-auto shrink-0 min-[90rem]:h-[9.0625rem]"
              >
                <path d="M24.5508 16.9454C26.7469 14.8108 30.0247 14.1825 32.9092 15.3439C35.7937 16.474 37.6621 19.1427 37.6621 22.1564V72.2579L65.8838 92.129C67.8505 93.5103 69.0303 95.7396 69.0303 98.0626V137.616C69.0303 140.41 67.4249 142.922 64.8027 144.178C63.7212 144.711 62.508 144.993 61.3281 144.993C59.722 144.993 58.1481 144.492 56.7715 143.55L4.58887 106.884C2.78616 105.597 1.63859 103.65 1.47461 101.485C1.31072 99.3498 2.09798 97.2462 3.7041 95.7394L18.2578 81.8009L26.2549 87.4523L12.4229 100.699L59.1973 133.567V99.0988L33.2041 80.797L25.2061 75.1466L3.21191 59.67C1.27824 58.2889 0.0987975 56.0915 0.0986328 53.7687L0 43.5656C5.80706e-05 41.6195 0.78653 39.7047 2.22852 38.2921L24.5508 16.9454ZM57.165 0.809697C59.7544 -0.445921 62.8353 -0.22604 65.1953 1.43763L117.378 38.1036C119.181 39.3907 120.328 41.337 120.492 43.5031C120.689 45.6377 119.87 47.7412 118.264 49.2794L96.7939 69.841L118.755 85.3175C120.689 86.6988 121.869 88.8959 121.901 91.2189L122 101.421C122 103.399 121.181 105.314 119.738 106.695L97.4492 128.042C95.9742 129.455 94.0072 130.208 92.0078 130.208C91.0245 130.208 90.0081 130.019 89.0576 129.643C86.1735 128.513 84.3058 125.845 84.3057 122.831V84.5949L94.1387 91.5646V117.902L112.134 100.637L112.068 92.3175L94.1387 79.6661L84.3057 72.7286L56.083 52.8575C54.1166 51.4763 52.9366 49.2477 52.9365 46.9249V7.37024C52.9367 4.6079 54.5429 2.06532 57.165 0.809697ZM9.83301 44.3507L9.89941 52.6691L27.8281 65.3204V27.0851L9.83301 44.3507ZM62.7695 45.8888L88.7627 64.1906L109.544 44.2882L62.7695 11.42V45.8888Z" />
              </svg>
              <span className={revealCls}>
                <span className="min-w-0 overflow-hidden">
                  <span className="flex w-max flex-col items-center gap-3 pl-7 min-[90rem]:gap-4 min-[90rem]:pl-10">
                    <span className={wordCls("group-hover:delay-[175ms] group-focus-visible:delay-100")}>
                      <SenaiWordmark className="h-10 w-auto min-[90rem]:h-14" />
                    </span>
                    <span className={wordCls("group-hover:delay-[250ms] group-focus-visible:delay-[175ms]")}>
                      <SolucoesDigitaisWordmark className="h-5 w-auto min-[90rem]:h-[1.7rem]" />
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          </div>

          <nav
            aria-label="Rodapé"
            className="grid flex-1 grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,1fr))_auto]"
          >
            <LinkGroup id="rodape-servicos" title="Serviços" links={services} />
            <LinkGroup id="rodape-cases" title="Cases" links={featuredCases} />

            <div className="flex flex-col gap-10">
              <LinkGroup id="rodape-empresa" title="Empresa" links={company}>
                <li>
                  <ContactLink topic="parceria" className={linkCls}>
                    Seja nosso parceiro
                  </ContactLink>
                </li>
              </LinkGroup>
              <LinkGroup id="rodape-carreiras" title="Carreiras" links={careers} />
            </div>

            <div className="col-span-2 flex flex-col gap-10 md:col-span-3 md:grid md:grid-cols-3 md:gap-x-6 lg:col-span-1 lg:flex">
              <div className="flex flex-col gap-3">
                <h2 id="rodape-contato" className={headingCls}>
                  Contato
                </h2>
                <address className="flex flex-col items-start not-italic">
                  <a href={`mailto:${site.contact.email}`} className={`${linkCls} [overflow-wrap:anywhere]`}>
                    {site.contact.email}
                  </a>
                  <span className="py-1 text-base leading-6 text-fg-body">{site.location}</span>
                  <Link href="/#contato" className={linkCls}>
                    Fale conosco
                  </Link>
                </address>
              </div>

              <div className="flex flex-col gap-3">
                <h2 id="rodape-redes" className={headingCls}>
                  Redes
                </h2>
                <ul aria-labelledby="rodape-redes">
                  {site.social.map((s) => (
                    <li key={s.name}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className={`group/ext ${linkCls}`}>
                        {s.name}
                        <span
                          aria-hidden="true"
                          className="ml-1 inline-block text-fg-muted transition-transform duration-fast group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5"
                        >
                          ↗
                        </span>
                        <span className="sr-only"> (abre em nova aba)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Base do rodapé em largura cheia (pedido de 25/09): fora do container de
          1440, só com as margens laterais do site — a linha vai de margem a
          margem, os direitos ficam sempre na ponta esquerda e a política na
          direita, e o nome cresce com a tela em qualquer largura. */}
      <div className="px-(--spacing-gutter) pb-12 lg:px-(--spacing-gutter-lg)">
        <div className="@container flex flex-col gap-3 border-t border-line-strong pt-6">
          <div className="flex items-start justify-between gap-6 text-sm leading-5 tracking-[0.025em] text-fg">
            <p className="font-medium">© {new Date().getFullYear()}. Todos os direitos reservados.</p>
            <p className="shrink-0 text-right font-bold">Política de Privacidade</p>
          </div>
          <p
            aria-hidden="true"
            className="whitespace-nowrap text-center font-display font-extrabold uppercase leading-[0.92] text-[calc(100cqw/22.5)]"
          >
            senai soluções digitais
          </p>
        </div>
      </div>
    </footer>
  );
}

function LinkGroup({
  id,
  title,
  links,
  children,
}: {
  id: string;
  title: string;
  links: FooterLink[];
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 id={id} className={headingCls}>
        {title}
      </h2>
      <ul aria-labelledby={id}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkCls}>
              {l.label}
            </Link>
          </li>
        ))}
        {children}
      </ul>
    </div>
  );
}
