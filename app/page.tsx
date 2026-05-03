import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { AppFactory } from "@/components/app-factory";
import { DaemonDemo } from "@/components/daemon-demo/DaemonDemo";
import { Features } from "@/components/features";
import { Architecture } from "@/components/architecture";
import { Comparison } from "@/components/comparison";
import { ProductTour } from "@/components/product-tour";
import { CTA } from "@/components/cta";
import { EcosystemRail } from "@/components/ecosystem-rail";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getReleaseInfo } from "@/lib/downloads";

export const dynamic = "force-dynamic";

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

function EcosystemProof() {
  return (
    <section className="px-5 pb-16 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-[88rem]">
        <EcosystemRail />
      </div>
    </section>
  );
}

export default async function Home() {
  const release = await getReleaseInfo();

  return (
    <>
      <Header />
      <main>
        <Hero release={release} />
        <EcosystemProof />
        <SectionDivider />
        <ScrollReveal>
          <AppFactory />
        </ScrollReveal>
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
          <CTA release={release} />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
