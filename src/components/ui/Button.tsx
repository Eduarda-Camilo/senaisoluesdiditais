import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center gap-3 h-12 px-5 text-sm font-medium tracking-wide select-none transition-colors duration-fast rounded-xs";

const variants = {
  primary: "bg-accent text-fg hover:bg-accent-hover",
  outline: "border border-line-strong text-fg hover:border-fg hover:bg-fg/5",
  ghost: "text-fg-muted hover:text-fg px-0 h-auto",
} as const;

type Variant = keyof typeof variants;

export function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-4 shrink-0", className)} fill="none">
      <path d="M2 8h11M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  arrow = true,
  ...rest
}: { href: string; variant?: Variant; arrow?: boolean; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  "href"
>) {
  const external = href.startsWith("http");
  const cls = cn(base, variants[variant], "group", className);
  const content = (
    <>
      {children}
      {arrow && <Arrow className="transition-transform duration-base ease-out-quart group-hover:translate-x-0.5" />}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: { variant?: Variant; children: ReactNode } & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
