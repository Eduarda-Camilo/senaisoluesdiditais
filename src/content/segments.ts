import type { Segment } from "./types";

/** Rótulos dos segmentos — compartilhados entre a home e o explorador de cases. */
export const segments: { value: Segment; label: string }[] = [
  { value: "educacao", label: "Educação" },
  { value: "industria", label: "Indústria" },
  { value: "gestao", label: "Gestão" },
  { value: "sst", label: "Segurança do trabalho" },
];
