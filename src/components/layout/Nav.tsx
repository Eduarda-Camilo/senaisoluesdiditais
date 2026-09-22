"use client";

import { Dialog } from "@base-ui/react/dialog";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/#cases", label: "Cases" },
  { href: "/#capacidades", label: "Capacidades" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#carreiras", label: "Carreiras" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <header
      className={cn(
        "sticky top-0 z-nav border-b transition-colors duration-base",
        scrolled ? "bg-bg/85 backdrop-blur-md border-line" : "bg-transparent border-transparent",
      )}
    >
      <nav aria-label="Principal" className="container-site flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="SENAI Soluções Digitais — início">
          <Image src="/brand/sd-horizontal-branco.svg" alt="" width={379} height={145} priority className="h-8 w-auto" />
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm text-fg-muted">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-fg transition-colors duration-fast py-2">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/#contato"
            className="hidden md:inline-flex h-10 items-center px-4 text-sm font-medium border border-line-strong rounded-xs hover:border-fg transition-colors duration-fast"
          >
            Fale conosco
          </Link>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="md:hidden inline-flex size-10 items-center justify-center rounded-xs border border-line-strong"
              aria-label="Abrir menu"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 z-overlay bg-bg/70 backdrop-blur-sm transition-opacity duration-base data-starting-style:opacity-0 data-ending-style:opacity-0" />
              <Dialog.Popup className="fixed inset-y-0 right-0 z-dialog w-[min(100vw,22rem)] bg-surface border-l border-line p-6 flex flex-col transition-transform duration-base ease-out-expo data-starting-style:translate-x-full data-ending-style:translate-x-full">
                <div className="flex items-center justify-between h-10">
                  <Dialog.Title className="tag-mark">menu</Dialog.Title>
                  <Dialog.Close className="inline-flex size-10 items-center justify-center rounded-xs border border-line-strong" aria-label="Fechar menu">
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 5l10 10M15 5L5 15" />
                    </svg>
                  </Dialog.Close>
                </div>
                <ul className="mt-10 flex flex-col divide-y divide-line">
                  {links.map((l, i) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-5 font-display text-2xl font-semibold hover:text-accent-bright transition-colors"
                      >
                        <span className="text-xs font-sans text-fg-faint tabular">0{i + 1}</span>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/#contato"
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-5 font-display text-2xl font-semibold text-accent-bright"
                    >
                      <span className="text-xs font-sans text-fg-faint tabular">05</span>
                      Fale conosco
                    </Link>
                  </li>
                </ul>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
