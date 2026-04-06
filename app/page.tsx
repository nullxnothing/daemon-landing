import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { DaemonDemo } from "@/components/daemon-demo/DaemonDemo";
import { Features } from "@/components/features";
import { Architecture } from "@/components/architecture";
import { Comparison } from "@/components/comparison";
import { ProductTour } from "@/components/product-tour";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <ScrollReveal>
          <DaemonDemo />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <Features />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <Architecture />
        </ScrollReveal>
        <SectionDivider />
        <ScrollReveal>
          <Comparison />
        </ScrollReveal>
        <SectionDivider />
        <ProductTour />
        <SectionDivider />
        <ScrollReveal>
          <CTA />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
