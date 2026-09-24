import Image from "next/image";
import Link from "next/link";
import { cases } from "@/content/cases";
import { segments } from "@/content/segments";
import { site } from "@/content/site";

/**
 * Rodapé — layout do mockup da equipe (versão 3, 23/09/2026): texto todo em
 * branco, sem hairline em cima e sem a linha azul antes do rodapé mono.
 *
 * É transparente de propósito: na home, o contorno do símbolo do Fale conosco
 * continua por baixo dele (ver `Backdrop` em home/Contact.tsx). `relative` é o que
 * o põe por cima desse fundo. Nas outras rotas fica sobre o preto da página.
 */
const nav = [
  { href: "/#cases", label: "Cases" },
  { href: "/#servicos", label: "O que fazemos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#carreiras", label: "Carreiras" },
  { href: "/#contato", label: "Contato" },
];

/** O mockup lista três segmentos; "Segurança do trabalho" fica só no explorador. */
const portfolio = [
  { href: "/cases", label: `Todos os ${cases.length} produtos` },
  ...segments
    .filter((s) => s.value !== "sst")
    .map((s) => ({ href: `/cases?segmento=${s.value}`, label: s.label })),
];

const linkCls =
  "text-[0.9375rem] leading-6 text-fg hover:text-azul-cibernetico transition-colors duration-fast";

export function Footer() {
  return (
    <footer className="relative">
      <div className="container-site pt-20 pb-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[496fr_298fr_298fr_252fr] lg:gap-0">
        <div className="col-span-2 lg:col-span-1 flex flex-col items-start gap-5">
          <Image
            src="/brand/sd-simbolo-branco.svg"
            alt="SENAI Soluções Digitais"
            width={122}
            height={145}
            className="h-8 w-auto"
          />
          <p className="text-sm leading-5 text-fg max-w-[24rem]">
            {site.name} — {site.affiliation.charAt(0).toLowerCase() + site.affiliation.slice(1)}.
          </p>
        </div>

        <FooterColumn title="Navegar" label="Rodapé — navegação" links={nav} />
        <FooterColumn title="Portfólio" label="Rodapé — portfólio" links={portfolio} />

        <div>
          <p className="meta text-fg mb-3">Redes</p>
          <ul className="flex flex-col gap-2">
            {site.social.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {s.name}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-site">
        <div className="pt-8 pb-10 flex flex-col sm:flex-row gap-3 justify-between meta-sm text-fg">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>
            Desde {site.since} · {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  label,
  links,
}: {
  title: string;
  label: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={label}>
      <p className="meta text-fg mb-3">{title}</p>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkCls}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
