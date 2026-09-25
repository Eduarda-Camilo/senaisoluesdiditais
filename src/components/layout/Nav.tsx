"use client";

import { Dialog } from "@base-ui/react/dialog";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, CaretDown, List, X } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Navegação principal.
 *
 * Mockup da equipe (23/09): no topo da página a barra ocupa a largura do
 * container — símbolo à esquerda, links no centro, "Contato" à direita (era "Fale conosco"; renomeado em 24/09).
 * Ao rolar, o símbolo e o botão deslizam para junto dos links e o conjunto vira
 * uma barra preta compacta, centralizada e flutuando a 8px do topo (591 × 58 no
 * mockup), com links em branco e o botão sólido branco.
 *
 * O deslocamento é uma animação de layout do Motion (FLIP): a `nav` troca de
 * `w-full justify-between` para largura automática e o Motion interpola as
 * posições. O fundo preto entra com atraso, depois que os itens se juntaram — é
 * o "se aproximam e então viram a barra flutuante" do pedido. Na volta ele sai
 * sem atraso.
 *
 * O cabeçalho continua `sticky` e com 4rem no fluxo (o Hero conta com isso), mas
 * é transparente a cliques: só a barra recebe ponteiro, para a faixa vazia dos
 * lados não bloquear o conteúdo que passa por baixo.
 *
 * Abaixo de `md` não há links na barra (ficam no menu lateral); lá ela é uma
 * faixa transparente com o símbolo e o botão do menu (fundo preto próprio).
 *
 * Submenus (pedido de 25/09): Cases, Parcerias e Trabalhe conosco abrem, ao
 * passar o mouse ou focar pelo teclado, uma caixa com o link para a página
 * própria da seção (lista de cases, /aws, vagas). O item em si continua levando
 * à âncora da seção na home. No menu lateral o sublink aparece embaixo do item.
 * Clicar em qualquer link do item fecha a caixa (tira o foco e ignora o hover
 * até o mouse sair), para ela não continuar aberta na página seguinte.
 */

type NavLink = { href: string; label: string; sub?: { href: string; label: string } };

const links: NavLink[] = [
  { href: "/#cases", label: "Cases", sub: { href: "/cases", label: "Ver todos" } },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#parcerias", label: "Parcerias", sub: { href: "/aws", label: "Serviços AWS" } },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#carreiras", label: "Trabalhe conosco", sub: { href: "/vagas", label: "Nossas vagas" } },
];

/** Compacta depois de COMPACT_AT px e só volta abaixo de EXPAND_AT — sem piscar na fronteira. */
const COMPACT_AT = 40;
const EXPAND_AT = 8;

const LAYOUT = {
  type: "spring",
  stiffness: 380,
  damping: 38,
  mass: 0.9,
} as const;

const wideQuery = "(min-width: 48rem)";
function subscribeWide(cb: () => void) {
  const mq = window.matchMedia(wideQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const useWide = () =>
  useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(wideQuery).matches,
    () => true,
  );

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Submenu fechado à força depois de um clique: o link clicado guarda o foco e
  // o mouse segue em cima, então sem isso a caixa continuava aberta na página
  // nova. Reabre quando o mouse sai do item.
  const [dismissed, setDismissed] = useState<string | null>(null);
  const wide = useWide();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((was) => (was ? y > EXPAND_AT : y > COMPACT_AT));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao navegar (padrão "derived state" — sem setState dentro de effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const compact = scrolled && wide;
  const transition = reduce ? { duration: 0 } : LAYOUT;

  return (
    <header
      // Transparente também no celular (pedido de 25/09): a faixa escura por cima
      // das seções saiu. Quem garante a leitura é o botão do menu, com fundo
      // próprio; no desktop quem tem fundo é a barra compacta.
      className="sticky top-0 z-(--z-nav) h-16 pointer-events-none"
    >
      <div className="container-site h-full flex justify-center items-start">
        <motion.nav
          layout
          transition={transition}
          aria-label="Principal"
          className={cn(
            "pointer-events-auto flex items-center",
            // O fundo entra depois que os itens se juntaram; na volta, sai na hora.
            "transition-[background-color] duration-base",
            compact
              ? "mt-2 h-[58px] gap-6 px-3 bg-bg delay-200"
              : "w-full h-16 justify-between gap-6 bg-transparent delay-0",
          )}
        >
          <motion.div layout transition={transition} className="shrink-0">
            <Link
              href="/"
              className="flex items-center"
              aria-label="SENAI Soluções Digitais — início"
            >
              {/* Só o símbolo: o lettering na nav era redundante (feedback #1). */}
              <Image
                src="/brand/sd-simbolo-branco.svg"
                alt=""
                width={122}
                height={145}
                priority
                className={cn("w-auto", compact ? "h-6" : "h-7")}
              />
              <span className="sr-only">SENAI Soluções Digitais</span>
            </Link>
          </motion.div>

          <motion.ul
            layout="position"
            transition={transition}
            className="hidden md:flex items-center gap-8 text-base"
          >
            {links.map((l) => (
              <li
                key={l.href}
                data-dismissed={dismissed === l.href || undefined}
                className="group relative"
                onClick={(e) => {
                  if (!l.sub || !(e.target instanceof Element) || !e.target.closest("a")) return;
                  setDismissed(l.href);
                  (document.activeElement as HTMLElement | null)?.blur();
                }}
                onPointerLeave={() => setDismissed((d) => (d === l.href ? null : d))}
              >
                <Link
                  href={l.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 transition-colors duration-fast py-2",
                    compact
                      ? "text-fg hover:text-azul-cibernetico group-focus-within:text-azul-cibernetico"
                      : "text-fg-muted hover:text-fg group-hover:text-fg group-focus-within:text-fg",
                  )}
                >
                  {l.label}
                  {l.sub && (
                    <CaretDown
                      size={12}
                      aria-hidden="true"
                      className="transition-transform duration-base ease-out-quart group-hover:rotate-180 group-focus-within:rotate-180 group-data-dismissed:rotate-0!"
                    />
                  )}
                </Link>
                {l.sub && (
                  // O `pt` é a ponte entre o item e a caixa: o mouse atravessa sem fechar.
                  <div
                    className={cn(
                      "absolute left-1/2 top-full w-max -translate-x-1/2 pt-3",
                      "invisible -translate-y-1 opacity-0 transition-[opacity,translate,visibility] duration-base ease-out-quart",
                      "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
                      "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                      "group-data-dismissed:invisible! group-data-dismissed:opacity-0!",
                      "motion-reduce:transition-none",
                    )}
                  >
                    <Link
                      href={l.sub.href}
                      className="group/sub flex items-center gap-2 whitespace-nowrap border border-line-strong bg-bg px-4 py-3 text-base text-fg transition-colors duration-fast hover:border-fg hover:text-azul-cibernetico focus-visible:text-azul-cibernetico"
                    >
                      {l.sub.label}
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-fast group-hover/sub:translate-x-0.5 group-hover/sub:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </motion.ul>

          <motion.div
            layout="position"
            transition={transition}
            className="flex items-center gap-3"
          >
            <Link
              href="/#contato"
              className={cn(
                "hidden md:inline-flex items-center text-base font-medium border transition-colors duration-base",
                compact
                  ? "h-8 px-2 rounded-none bg-fg text-neutra-200 border-fg hover:bg-azul-conectado"
                  : "h-10 px-4 rounded-xs border-line-strong hover:border-fg",
              )}
            >
              Contato
            </Link>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger
                className="md:hidden inline-flex size-10 items-center justify-center rounded-xs border border-line-strong bg-bg"
                aria-label="Abrir menu"
              >
                <List size={20} aria-hidden="true" />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 z-(--z-overlay) bg-bg/70 backdrop-blur-sm transition-opacity duration-base data-starting-style:opacity-0 data-ending-style:opacity-0" />
                <Dialog.Popup className="fixed inset-y-0 right-0 z-(--z-dialog) w-[min(100vw,22rem)] bg-surface border-l border-line p-6 flex flex-col transition-transform duration-base ease-out-expo data-starting-style:translate-x-full data-ending-style:translate-x-full">
                  <div className="flex items-center justify-between h-10">
                    <Dialog.Title className="meta text-fg-muted">
                      menu
                    </Dialog.Title>
                    <Dialog.Close
                      className="inline-flex size-10 items-center justify-center rounded-xs border border-line-strong"
                      aria-label="Fechar menu"
                    >
                      <X size={20} aria-hidden="true" />
                    </Dialog.Close>
                  </div>
                  <ul className="mt-10 flex flex-col divide-y divide-line">
                    {links.map((l) => (
                      <li key={l.href} className={l.sub ? "pb-5" : undefined}>
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-baseline gap-4 font-display text-2xl font-semibold hover:text-accent-bright transition-colors",
                            l.sub ? "pt-5 pb-2" : "py-5",
                          )}
                        >
                          {l.label}
                        </Link>
                        {l.sub && (
                          <Link
                            href={l.sub.href}
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-2 py-1 text-base text-fg-muted transition-colors hover:text-fg"
                          >
                            {l.sub.label}
                            <ArrowUpRight size={16} aria-hidden="true" />
                          </Link>
                        )}
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/#contato"
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-5 font-display text-2xl font-semibold text-accent-bright"
                      >
                        Contato
                      </Link>
                    </li>
                  </ul>
                </Dialog.Popup>
              </Dialog.Portal>
            </Dialog.Root>
          </motion.div>
        </motion.nav>
      </div>
    </header>
  );
}
