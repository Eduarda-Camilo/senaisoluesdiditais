import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * Seção padrão: marcador <tag/>, título grande e (opcional) texto de apoio,
 * seguidos do conteúdo. Mantém a hierarquia de headings correta (h2).
 */
export function Section({
  id,
  tag,
  title,
  intro,
  aside,
  children,
  className,
}: {
  id: string;
  tag: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-titulo`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-16 py-20 lg:py-24", className)}>
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 mb-10 lg:mb-14">
          <Reveal className="lg:col-span-7 flex flex-col gap-5">
            <p className="tag-mark">{tag}</p>
            <h2 id={headingId} className="font-display font-bold text-display-lg max-w-[16ch]">
              {title}
            </h2>
          </Reveal>
          {(intro || aside) && (
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end gap-6">
              {intro && <p className="text-lead text-fg-muted font-light">{intro}</p>}
              {aside}
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
