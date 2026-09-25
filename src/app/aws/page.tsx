import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { ContactLink } from "@/components/ui/ContactLink";
import { Reveal } from "@/components/ui/Reveal";
import { aws, type AwsService } from "@/content/partners";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Serviços AWS",
  description:
    "Parceiro AWS (Select Tier Services): migração, modernização, desenvolvimento cloud native, IA generativa com Amazon Bedrock, DevOps e operação na AWS.",
};

/**
 * Serviços AWS — layout da equipe no Figma (V4, 25/09, frame 203:37).
 *
 * Três frentes (ver partners.ts), cada uma uma faixa com hairline em cima: o
 * numeral grande em Azul Solução atrás do título e os serviços em cartões
 * brancos com etiquetas azuis. A frente do meio é espelhada (título à direita).
 * Cartões em duas colunas; numa frente com número ímpar de serviços, o último
 * ocupa a linha inteira.
 *
 * Fecha com a faixa Azul Solução com o selo oficial AWS Partner (Select Tier
 * Services — PNG da equipe, 313 × 270) e o "Fale conosco", que leva ao Entre em
 * contato com o assunto "Soluções AWS" marcado.
 *
 * No Figma o terceiro cartão de "Construir na nuvem" saiu com título e
 * etiquetas de outro serviço ("Microsserviços", Cloud Native/Refatoração) e o
 * texto da IA generativa; aqui vale o conteúdo de partners.ts.
 */
export default function AwsPage() {
  return (
    <div className="container-site pb-8">
      <header className="flex flex-col gap-5 pt-12 pb-6 lg:pt-16">
        <nav aria-label="Trilha" className="meta flex gap-2">
          <Link href="/#parcerias" className="text-fg-muted hover:text-fg transition-colors">
            parcerias
          </Link>
          <span aria-hidden="true" className="text-mark">
            /
          </span>
          <span aria-current="page" className="text-fg">
            aws
          </span>
        </nav>
        <Reveal className="mt-6">
          <h1 className="font-display font-extrabold text-[clamp(2.5rem,1.4rem+3.8vw,4.82rem)] leading-[0.9] tracking-[-0.03em]">
            Serviços AWS
          </h1>
        </Reveal>
      </header>

      {aws.groups.map((g, i) => {
        const mirrored = i % 2 === 1;
        return (
          <section
            key={g.id}
            aria-labelledby={`frente-${g.id}`}
            className={cn(
              "grid gap-10 border-t border-line-strong py-12 lg:gap-x-16 lg:py-16",
              mirrored ? "lg:grid-cols-[minmax(0,853fr)_minmax(0,427fr)]" : "lg:grid-cols-[minmax(0,427fr)_minmax(0,853fr)]",
            )}
          >
            <Reveal className={cn("flex flex-col", mirrored && "lg:order-2 lg:items-end lg:text-right")}>
              <span
                aria-hidden="true"
                className="mb-[-0.2em] font-display font-extrabold text-[clamp(5rem,3rem+5vw,7.5rem)] leading-[0.8] tracking-[-0.06em] text-azul-solucao opacity-70 tabular"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2
                id={`frente-${g.id}`}
                className="relative font-display font-extrabold text-display-md leading-[1.05] tracking-[-0.02em]"
              >
                {g.title}
              </h2>
            </Reveal>

            <ul className={cn("grid gap-6 sm:grid-cols-2", mirrored && "lg:order-1")}>
              {g.services.map((s, j) => (
                <ServiceCard
                  key={s.name}
                  service={s}
                  delay={j * 0.05}
                  wide={g.services.length % 2 === 1 && j === g.services.length - 1}
                />
              ))}
            </ul>
          </section>
        );
      })}

      {/* Chamada final — texto da página atual, com o selo oficial */}
      <Reveal className="mt-8 grid gap-8 bg-accent p-6 sm:p-8 lg:grid-cols-[minmax(0,309fr)_minmax(0,911fr)] lg:items-end lg:gap-6 lg:p-12">
        <div className="relative aspect-[313/270] w-40 sm:w-48 lg:aspect-auto lg:h-full lg:w-full">
          <Image
            src="/parcerias/aws-partner-select-tier.png"
            alt="Selo AWS Partner — Select Tier Services"
            fill
            sizes="(min-width: 64rem) 19rem, 12rem"
            className="object-contain object-left lg:object-center"
          />
        </div>
        <div className="flex flex-col items-start gap-6 lg:py-2">
          <h2 className="font-display font-extrabold text-display-md leading-[1.05] tracking-[-0.02em]">
            Vamos levar sua operação para a nuvem?
          </h2>
          <p className="text-lg leading-[1.625]">
            Fale com nosso time e descubra como a parceria SENAI Soluções Digitais + AWS pode acelerar a transformação
            digital do seu negócio.
          </p>
          <ContactLink
            topic="aws"
            className="group inline-flex h-14 items-center gap-3 rounded-xs bg-fg px-6 text-lg font-medium tracking-wide text-neutra-100 transition-colors duration-fast hover:bg-azul-conectado"
          >
            Fale conosco
            <Arrow className="transition-transform duration-base ease-out-quart group-hover:translate-x-0.5" />
          </ContactLink>
        </div>
      </Reveal>
    </div>
  );
}

function ServiceCard({ service, delay, wide }: { service: AwsService; delay: number; wide: boolean }) {
  return (
    <Reveal
      as="li"
      delay={delay}
      className={cn("flex flex-col gap-4 bg-white p-6 text-neutra-100", wide && "sm:col-span-2")}
    >
      <h3 className="font-display font-bold text-display-sm tracking-[-0.015em]">{service.name}</h3>
      <p className="text-lg leading-[1.625]">{service.description}</p>
      <ul className="mt-auto flex flex-wrap gap-2" aria-label={`Etiquetas de ${service.name}`}>
        {service.tags.map((t) => (
          <li key={t} className="meta border border-line-strong bg-azul-solucao px-2 py-1.5 text-fg">
            {t}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
