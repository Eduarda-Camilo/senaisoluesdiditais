import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { as?: ElementType; className?: string; children: ReactNode; id?: string };

/** Marcador de seção no formato <tag /> — derivado do símbolo </> do logo. */
export function TagMark({ as: Tag = "p", className, children, id }: Props) {
  return (
    <Tag id={id} className={cn("tag-mark", className)}>
      {children}
    </Tag>
  );
}

export function Display({ as: Tag = "h2", className, children, id }: Props & { size?: never }) {
  return (
    <Tag id={id} className={cn("font-display font-bold text-display-lg", className)}>
      {children}
    </Tag>
  );
}

export function Lead({ as: Tag = "p", className, children }: Props) {
  return <Tag className={cn("text-lead text-fg-muted font-light", className)}>{children}</Tag>;
}

/** Número grande em Syne com legenda — padrão dos indicadores (refs 04/05/09/45). */
export function Stat({
  value,
  label,
  note,
  size = "md",
  className,
}: {
  value: string;
  label: string;
  note?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span
        className={cn(
          "font-display font-bold tabular leading-none tracking-tight",
          size === "lg" ? "text-display-md" : "text-display-sm",
        )}
      >
        {value}
      </span>
      <span className="text-sm text-fg-muted leading-snug">
        {label}
        {note && <span className="block text-fg-faint text-xs mt-0.5">{note}</span>}
      </span>
    </div>
  );
}
