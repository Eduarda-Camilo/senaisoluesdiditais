import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

const nav = [
  { href: "/#cases", label: "Cases" },
  { href: "/cases", label: "Todos os cases" },
  { href: "/#capacidades", label: "Capacidades" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#carreiras", label: "Trabalhe conosco" },
  { href: "/#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="border-t border-line mt-32">
      <div className="container-site py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 flex flex-col gap-6">
          <Image src="/brand/sd-vertical-branco.svg" alt="SENAI Soluções Digitais" width={217} height={244} className="h-20 w-auto" />
          <p className="text-sm text-fg-muted max-w-xs leading-relaxed">
            {site.affiliation}. Desde {site.since}, em {site.location}.
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <p className="tag-mark mb-5">navegação</p>
          <ul className="flex flex-col gap-3 text-sm">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-fg-muted hover:text-fg transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="tag-mark mb-5">redes</p>
          <ul className="flex flex-col gap-3 text-sm">
            {site.social.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg transition-colors">
                  {s.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-site py-6 flex flex-col sm:flex-row gap-3 justify-between text-xs text-fg-faint">
          <p>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
          <p>AWS Partner — Select Tier Services</p>
        </div>
      </div>
    </footer>
  );
}
