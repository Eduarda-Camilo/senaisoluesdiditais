"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Revela o conteúdo ao entrar na viewport. Com prefers-reduced-motion, renderiza estático.
 * Nenhuma informação depende da animação — é só ritmo de leitura.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "figure";
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // Margem superior enorme: qualquer elemento que já tenha passado pela viewport
      // (scroll rápido, navegação por âncora) conta como visível. Nada fica preso em opacity 0.
      viewport={{ once: true, margin: "100000px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}
