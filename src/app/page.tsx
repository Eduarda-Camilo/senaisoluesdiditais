import { About } from "@/components/home/About";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { Careers } from "@/components/home/Careers";
import { Contact } from "@/components/home/Contact";
import { FeaturedCases } from "@/components/home/FeaturedCases";
import { Hero } from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCases />
      <CapabilitiesSection />
      <About />
      <Careers />
      <Contact />
    </>
  );
}
