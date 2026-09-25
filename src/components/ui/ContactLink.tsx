"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { setContactTopic, type ContactTopic } from "@/lib/contact-topic";

/** Link para o "Entre em contato" que já marca o assunto do formulário (ver contact-topic.ts). */
export function ContactLink({
  topic,
  className,
  children,
}: {
  topic: ContactTopic;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href="/#contato" onClick={() => setContactTopic(topic)} className={className}>
      {children}
    </Link>
  );
}
