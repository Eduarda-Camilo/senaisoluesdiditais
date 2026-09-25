"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Copy, X } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { contactTopicLabel, setContactTopic, useContactTopic } from "@/lib/contact-topic";

/**
 * Entre em contato (era "Fale conosco"; renomeado em 24/09, junto com o botão da
 * Nav, que virou "Contato").
 *
 * Layout do mockup da equipe (versão 3, 23/09/2026): fundo preto, título grande
 * em duas linhas, contato direto à esquerda — sem cartão, alinhado ao título e
 * ao topo do formulário (referência de 24/09, sem o símbolo do SD em cima) —, formulário com rótulos visíveis à direita e o
 * símbolo do SD em contorno ao fundo, continuando por baixo do rodapé.
 *
 * Como o contorno atravessa o rodapé: o `Backdrop` é absoluto e se estende bem
 * abaixo da seção; o rodapé é transparente e `relative`, então pinta por cima
 * dele; o excesso é cortado pelo `overflow-clip` do wrapper de `main` + rodapé no
 * layout. Por isso a posição do símbolo é medida a partir do topo da seção (rem),
 * nunca em % da altura — a caixa é mais alta do que o que aparece.
 *
 * Os cantos arredondados (campos 8px, botão 2px) são do mockup e contrariam o
 * token de raio do resto do site.
 *
 * A submissão continua sendo um mailto: preenchido (decisão da equipe).
 *
 * Quem chega pelos botões de Parcerias ou da /aws vem com um assunto marcado
 * (contact-topic.ts): ele aparece acima do formulário, pode ser removido, e vai
 * no título do e-mail para a equipe separar as propostas.
 *
 * CONTEÚDO: o telefone é FICTÍCIO (pedido da equipe em 24/09, para a
 * apresentação) — ver `site.contact`. Sai como texto, sem link `tel:`, para
 * ninguém ligar para um número que pode ser de alguém. As redes saem de `site.social`; o mockup pede YouTube, que
 * não temos URL, então aparecem as três que existem.
 */
const fieldCls =
  "w-full bg-[#181818] border border-fg-muted rounded-lg px-4 py-[15px] text-base text-fg placeholder:text-fg-muted focus:outline-none focus:border-fg focus:shadow-[0_0_0_1px_var(--color-fg)] transition-[border-color,box-shadow] duration-fast";

const labelCls = "text-base text-fg";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const topic = useContactTopic();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") ?? "");
    const email = String(data.get("email") ?? "");
    const msg = String(data.get("mensagem") ?? "");
    const kind = topic ? contactTopicLabel[topic] : "Contato";
    const subject = encodeURIComponent(`[Site] ${kind} — ${nome}`);
    const body = encodeURIComponent(`${msg}\n\n—\n${nome}\n${email}`);
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sem permissão de área de transferência: o link mailto continua valendo.
    }
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="relative isolate scroll-mt-16 text-fg pt-28 pb-24 lg:pt-40 lg:pb-36"
    >
      <Backdrop />

      <div className="container-site">
        <Reveal className="flex flex-col gap-6">
          {/* Mesmo corpo do "Sobre nós" — o mockup usa os dois no mesmo tamanho. */}
          <h2
            id="contato-titulo"
            className="font-display font-extrabold text-[clamp(3rem,1rem+4.5vw,4.625rem)] leading-[0.92]"
          >
            Entre em
            <br />
            contato
          </h2>
          <p className="text-lg leading-relaxed text-fg">
            Tem uma ideia, um projeto ou uma necessidade digital?
            <br className="hidden sm:block" /> Conte um pouco para a gente.
          </p>
        </Reveal>

        <div className="mt-10 lg:mt-14 grid gap-12 lg:grid-cols-[minmax(0,572fr)_minmax(0,652fr)] lg:gap-x-30">
          <Reveal className="flex">
            <div className="w-full flex flex-col items-start gap-12 lg:gap-16">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold mb-2">Contato</h3>
                <p className="text-xl">{site.contact.phone}</p>
                {/* No celular o e-mail cai para 16px: é o maior corpo em que ele e o
                    botão de copiar cabem juntos numa linha a 360px. */}
                <p className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="min-w-0 text-base sm:text-2xl text-azul-cibernetico [overflow-wrap:anywhere] hover:underline underline-offset-4"
                  >
                    {site.contact.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="shrink-0 p-1 -m-1 text-fg hover:text-azul-cibernetico transition-colors duration-fast"
                  >
                    <Copy size={20} weight="bold" aria-hidden="true" />
                    <span className="sr-only">Copiar e-mail</span>
                  </button>
                  <span className="meta text-fg-muted" aria-live="polite">
                    {copied ? "copiado" : ""}
                  </span>
                </p>
                <p className="text-xl">{site.location}</p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Nossas Redes</h3>
                <ul className="flex flex-wrap gap-x-7 gap-y-3">
                  {site.social.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-lg hover:text-azul-cibernetico transition-colors duration-fast"
                      >
                        {s.name}
                        <ArrowUpRight
                          size={16}
                          weight="bold"
                          aria-hidden="true"
                          className="transition-transform duration-base ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                        />
                        <span className="sr-only">(abre em nova aba)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              {topic && (
                <p className="flex w-fit items-center gap-3 border border-azul-cibernetico py-1.5 pl-3 pr-1.5 text-sm">
                  <span>
                    <span className="text-fg-muted">Assunto:</span> {contactTopicLabel[topic]}
                  </span>
                  <button
                    type="button"
                    onClick={() => setContactTopic(null)}
                    className="grid size-7 place-items-center text-fg-muted hover:text-fg transition-colors duration-fast"
                  >
                    <X size={16} weight="bold" aria-hidden="true" />
                    <span className="sr-only">Remover assunto</span>
                  </button>
                </p>
              )}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-2">
                <div className="flex flex-col gap-3">
                  <label htmlFor="nome" className={labelCls}>
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    required
                    autoComplete="name"
                    placeholder="Seu nome"
                    className={fieldCls}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className={labelCls}>
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Seu e-mail"
                    className={fieldCls}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="mensagem" className={labelCls}>
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  placeholder="Conte um pouco sobre a ideia, o projeto ou a necessidade."
                  className={`${fieldCls} resize-y h-37 min-h-37`}
                />
              </div>

              <div className="mt-3 flex flex-col items-start gap-3">
                <button
                  type="submit"
                  className="group inline-flex h-12 w-full items-center justify-center gap-4 bg-accent text-fg rounded-xs px-8 text-base font-medium hover:bg-accent-hover transition-colors duration-fast sm:w-auto"
                >
                  Enviar mensagem
                  <ArrowRight
                    size={20}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-base ease-out-expo group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </button>
                {/* A linha de apoio vem do mockup. Depois do envio ela dá lugar ao
                    aviso do mailto; a região viva existe sempre. */}
                <p className="text-sm text-fg" aria-live="polite">
                  {sent
                    ? "Abrimos o seu app de e-mail com a mensagem preenchida."
                    : "Respondemos em até 2 dias úteis."}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Fundo da seção + rodapé: preto, só com o símbolo em contorno (o gradiente
 * azul da versão anterior saiu no mockup de 23/09).
 * A caixa desce 80rem abaixo da seção para cobrir o rodapé em qualquer largura;
 * o que sobra é cortado no layout.
 */
function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -bottom-[80rem] -z-10 bg-bg"
    >
      <MarkOutline />
    </div>
  );
}

/**
 * Símbolo do SD em contorno.
 *
 * É o mesmo `d` de public/brand/sd-simbolo-branco.svg — o traço vem de
 * `non-scaling-stroke`, então a linha fica com 1px em qualquer escala. Posição do
 * mockup: começa a 39% da largura, 3rem abaixo do topo, e sangra pela direita
 * até dentro do rodapé.
 */
function MarkOutline() {
  return (
    /* A largura vem do `aspect-ratio` do wrapper: um <svg> com `width:auto`
       resolve para 100% do container, o que achataria o desenho. */
    <div className="absolute top-12 left-[39%] w-[64%] min-w-[36rem] aspect-[122/145] text-fg/10">
      <svg viewBox="0 0 122 145" fill="none" className="h-full w-full">
        <path
          d="M24.5508 16.9459C26.7469 14.8113 30.0247 14.1829 32.9092 15.3444C35.7937 16.4745 37.6621 19.1432 37.6621 22.1569V72.2584L65.8838 92.1295C67.8505 93.5108 69.0303 95.7401 69.0303 98.0631V137.617C69.0303 140.411 67.4249 142.923 64.8027 144.178C63.7212 144.712 62.508 144.994 61.3281 144.994C59.722 144.994 58.1481 144.492 56.7715 143.55L4.58887 106.884C2.78616 105.597 1.63859 103.651 1.47461 101.485C1.31072 99.3503 2.09798 97.2467 3.7041 95.7399L18.2578 81.8014L26.2549 87.4528L12.4229 100.7L59.1973 133.567V99.0993L33.2041 80.7975L25.2061 75.1471L3.21191 59.6705C1.27824 58.2894 0.0987975 56.0919 0.0986328 53.7692L0 43.566C5.80706e-05 41.6199 0.78653 39.7052 2.22852 38.2926L24.5508 16.9459ZM57.165 0.810185C59.7544 -0.445432 62.8353 -0.225552 65.1953 1.43812L117.378 38.1041C119.181 39.3912 120.328 41.3375 120.492 43.5035C120.689 45.6382 119.87 47.7417 118.264 49.2799L96.7939 69.8414L118.755 85.318C120.689 86.6992 121.869 88.8964 121.901 91.2194L122 101.422C122 103.399 121.181 105.315 119.738 106.696L97.4492 128.043C95.9742 129.455 94.0072 130.209 92.0078 130.209C91.0245 130.209 90.0081 130.02 89.0576 129.643C86.1735 128.513 84.3058 125.845 84.3057 122.832V84.5953L94.1387 91.5651V117.903L112.134 100.637L112.068 92.318L94.1387 79.6666L84.3057 72.7291L56.083 52.858C54.1166 51.4768 52.9366 49.2482 52.9365 46.9254V7.37073C52.9367 4.60839 54.5429 2.0658 57.165 0.810185ZM9.83301 44.3512L9.89941 52.6696L27.8281 65.3209V27.0856L9.83301 44.3512ZM62.7695 45.8893L88.7627 64.191L109.544 44.2887L62.7695 11.4205V45.8893Z"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
