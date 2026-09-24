import Link from "next/link";
import { capabilities } from "@/content/capabilities";
import type { CapabilitySlug } from "@/content/types";
import { cn } from "@/lib/cn";

/** Lista de capacidades como texto separado por hairline — não são "badges" decorativas. */
export function CapabilityChips({ slugs, className, linked = true }: { slugs: CapabilitySlug[]; className?: string; linked?: boolean }) {
  const items = slugs.map((s) => capabilities.find((c) => c.slug === s)).filter(Boolean);
  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-muted", className)}>
      {items.map((c) => (
        <li key={c!.slug} className="flex items-center gap-1.5">
          <span className="text-mark tabular">{c!.index}</span>
          {linked ? (
            <Link href={`/cases?capacidade=${c!.slug}`} className="hover:text-fg transition-colors">
              {c!.name}
            </Link>
          ) : (
            <span>{c!.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
