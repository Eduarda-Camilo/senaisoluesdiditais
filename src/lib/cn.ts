/** Junta classes ignorando valores falsy. Suficiente para o projeto; evita dependência extra. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
