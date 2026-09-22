import { Section } from "@/components/layout/Section";
import { CapabilitiesAccordion } from "./Capabilities";

export function CapabilitiesSection() {
  return (
    <Section
      id="capacidades"
      tag="capacidades"
      title="Seis maneiras de resolver um problema real."
      intro="Cada capacidade começa com a pergunta que um cliente nos faz — e termina nos produtos que a respondem. Inclui a parceria AWS."
    >
      <CapabilitiesAccordion />
    </Section>
  );
}
