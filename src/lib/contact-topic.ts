"use client";

import { useSyncExternalStore } from "react";

/**
 * Assunto pré-escolhido do "Entre em contato".
 *
 * Os botões de Parcerias e da página /aws levam para `/#contato` e marcam aqui o
 * assunto; o formulário mostra o assunto e o põe no título do e-mail. Fica em
 * memória (sobrevive à navegação do Next, não a um recarregamento) — sem
 * parâmetro na URL, para a home continuar estática.
 */
export type ContactTopic = "parceria" | "aws";

export const contactTopicLabel: Record<ContactTopic, string> = {
  parceria: "Proposta de parceria",
  aws: "Soluções AWS",
};

let topic: ContactTopic | null = null;
const listeners = new Set<() => void>();

export function setContactTopic(next: ContactTopic | null) {
  topic = next;
  for (const l of listeners) l();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export const useContactTopic = () =>
  useSyncExternalStore(
    subscribe,
    () => topic,
    () => null,
  );
