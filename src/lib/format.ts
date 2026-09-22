/** "2024-08-12" → "Agosto de 2024" */
export function formatMonthYear(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  const s = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(new Date(y, m - 1, 1));
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
