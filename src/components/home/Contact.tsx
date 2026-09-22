"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

const fieldCls =
  "w-full bg-transparent border-b border-line-strong py-3 text-base placeholder:text-fg-faint focus:border-accent-bright focus:outline-none transition-colors rounded-none";

/**
 * Formulário de contato. Por decisão da equipe, a submissão é um mailto: com os campos
 * preenchidos — não há backend nesta fase. Estrutura pronta para trocar por uma API.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") ?? "");
    const org = String(data.get("organizacao") ?? "");
    const email = String(data.get("email") ?? "");
    const assunto = String(data.get("assunto") ?? "");
    const msg = String(data.get("mensagem") ?? "");
    const subject = encodeURIComponent(`[Site] ${assunto || "Contato"} — ${org || nome}`);
    const body = encodeURIComponent(`${msg}\n\n—\n${nome}\n${org}\n${email}`);
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section
      id="contato"
      tag="contato"
      title="Vamos conversar sobre o seu problema."
      intro="Conte o contexto em poucas linhas. Respondemos com uma proposta de conversa, não com um catálogo."
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2" noValidate={false}>
            <div className="flex flex-col gap-1">
              <label htmlFor="nome" className="text-xs text-fg-muted">
                Nome
              </label>
              <input id="nome" name="nome" required autoComplete="name" className={fieldCls} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="organizacao" className="text-xs text-fg-muted">
                Organização
              </label>
              <input id="organizacao" name="organizacao" autoComplete="organization" className={fieldCls} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs text-fg-muted">
                E-mail
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="assunto" className="text-xs text-fg-muted">
                Assunto
              </label>
              <select id="assunto" name="assunto" className={fieldCls} defaultValue="Projeto">
                <option>Projeto</option>
                <option>Parceria</option>
                <option>Carreira</option>
                <option>Outro</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="mensagem" className="text-xs text-fg-muted">
                Mensagem
              </label>
              <textarea id="mensagem" name="mensagem" required rows={4} className={fieldCls} />
            </div>
            <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
              <Button type="submit">Enviar por e-mail</Button>
              <p className="text-xs text-fg-faint" aria-live="polite">
                {sent ? "Abrimos o seu aplicativo de e-mail com a mensagem preenchida." : "Abre o seu aplicativo de e-mail com a mensagem preenchida."}
              </p>
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <dl className="border-t border-line text-sm">
            <div className="border-b border-line py-4 grid grid-cols-[6rem_1fr] gap-4">
              <dt className="text-fg-muted">E-mail</dt>
              <dd>
                {site.contact.emailPending ? (
                  <span className="text-fg-faint">[e-mail pendente]</span>
                ) : (
                  <a href={`mailto:${site.contact.email}`} className="hover:text-accent-bright">
                    {site.contact.email}
                  </a>
                )}
              </dd>
            </div>
            <div className="border-b border-line py-4 grid grid-cols-[6rem_1fr] gap-4">
              <dt className="text-fg-muted">Telefone</dt>
              <dd className="text-fg-faint">{site.contact.phone || "[telefone pendente]"}</dd>
            </div>
            <div className="border-b border-line py-4 grid grid-cols-[6rem_1fr] gap-4">
              <dt className="text-fg-muted">Endereço</dt>
              <dd className="text-fg-faint">{site.contact.address || `[endereço pendente] — ${site.location}`}</dd>
            </div>
            <div className="border-b border-line py-4 grid grid-cols-[6rem_1fr] gap-4">
              <dt className="text-fg-muted">Redes</dt>
              <dd className="flex flex-wrap gap-x-4">
                {site.social.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-bright">
                    {s.name}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
