import type { Case } from "@/content/types";

const labels: Record<NonNullable<Case["status"]>, string> = {
  piloto: "Em fase piloto",
  "em-desenvolvimento": "Em desenvolvimento",
};

export function StatusLabel({ status }: { status?: Case["status"] }) {
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-2 text-xs text-fg-muted">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-mark" />
      {labels[status]}
    </span>
  );
}
