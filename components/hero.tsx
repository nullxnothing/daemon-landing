"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { Monitor, Apple, ArrowRight, Terminal } from "lucide-react";
import type { ReleaseInfo } from "@/lib/downloads";
import { EcosystemRail } from "@/components/ecosystem-rail";

function HeroCard({ release }: { release: ReleaseInfo }) {
  const WINDOWS_URL = release.downloads.windows;
  const MAC_URL = release.downloads.mac;
  const MAC_INTEL_URL = release.downloads.macIntel;
  const LINUX_URL = release.downloads.linux;

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[40px] border border-white/[0.08] bg-card shadow-[0_24px_120px_rgba(0,0,0,0.45)] transition-all duration-500">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_52%_58%,rgba(62,207,142,0.08),transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_22%,transparent_80%,rgba(62,207,142,0.03))]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 62% 54% at 18% 78%, rgba(62,207,142,0.12), transparent 60%),
              radial-gradient(ellipse 52% 62% at 84% 24%, rgba(62,207,142,0.11), transparent 60%),
              radial-gradient(ellipse 42% 36% at 66% 68%, rgba(42,157,104,0.08), transparent 54%)
            `,
            animation: "hero-twinkle-1 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(62,207,142,0.12) 1px, transparent 1px)`,
            backgroundSize: "8px 8px",
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(14,14,14,0.85),transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[78rem] flex-col px-6 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.9fr)] xl:grid-cols-[minmax(0,1.03fr)_minmax(410px,0.88fr)] xl:gap-14">
          <div className="text-center lg:text-left">
            <div className="animate-fade-up mb-5 flex items-center justify-center gap-3 text-[12px] font-mono uppercase tracking-[0.24em] text-muted-foreground lg:justify-start">
              <Image
                src="/images/daemon-icon.png"
                alt="Daemon"
                width={28}
                height={28}
                className="rounded-lg"
                priority
              />
              <span>AI-native IDE for Solana</span>
            </div>

            <div className="animate-fade-up mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[13px] text-accent">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                v{release.version} is live
              </div>
            </div>

            <h1
              className="animate-fade-up text-balance text-[clamp(2.8rem,5vw,4.85rem)] font-bold leading-[0.95] tracking-[-0.05em] 2xl:whitespace-nowrap"
              style={{ animationDelay: "100ms" }}
            >
              <span className="text-foreground">Solana&apos;s first IDE.</span>
            </h1>

            <p
              className="animate-fade-up mt-6 max-w-[31rem] text-balance text-[1rem] leading-relaxed text-muted md:text-[1.16rem] lg:mx-0"
              style={{ animationDelay: "200ms" }}
            >
              AI agents, built-in wallet tooling, launches, swaps, explorer workflows, and deploys in one desktop command center.
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start"
              style={{ animationDelay: "340ms" }}
            >
              <a
                href={WINDOWS_URL}
                download
                onClick={() => track("Download", { os: "windows", location: "hero" })}
                className="group flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-accent-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_40px_rgba(62,207,142,0.3)]"
              >
                <Monitor className="size-[18px]" />
                Download for Windows
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={MAC_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Download", { os: "mac-arm64", location: "hero" })}
                className="group flex items-center gap-2.5 rounded-full border border-white/14 bg-white/[0.075] px-7 py-3.5 text-[15px] font-semibold text-foreground/80 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/[0.11] hover:text-foreground"
              >
                <Apple className="size-[18px]" />
                Mac (Apple Silicon)
              </a>
              <a
                href={LINUX_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Download", { os: "linux", location: "hero" })}
                className="group flex items-center gap-2.5 rounded-full border border-white/14 bg-white/[0.075] px-7 py-3.5 text-[15px] font-semibold text-foreground/80 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/[0.11] hover:text-foreground"
              >
                <Terminal className="size-[18px]" />
                Install for Linux
              </a>
            </div>

            <div
              className="animate-fade-up mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] text-muted-foreground lg:justify-start"
              style={{ animationDelay: "380ms" }}
            >
              <span>Intel Mac?</span>
              <a
                href={MAC_INTEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("Download", { os: "mac-x64", location: "hero" })}
                className="text-accent transition-colors hover:text-accent/80"
              >
                Download the x64 build
              </a>
              <span className="hidden h-1 w-1 rounded-full bg-white/10 sm:inline-block" />
              <a
                href="https://github.com/nullxnothing/daemon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Open source on GitHub
              </a>
            </div>
          </div>

          <div className="animate-fade-up lg:pl-2 xl:pl-6" style={{ animationDelay: "220ms" }}>
            <DemoVideo />
          </div>
        </div>

        <div className="mt-10">
          <EcosystemRail />
        </div>
      </div>
    </div>
  );
}

function DemoVideo() {
  return (
    <div className="relative mx-auto w-full max-w-[29rem] lg:max-w-[32rem] xl:max-w-[35rem]">
      <div className="absolute -inset-5 rounded-[32px] bg-accent/6 blur-3xl animate-glow-pulse" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0c0c0c] shadow-[0_24px_64px_rgba(0,0,0,0.42)]">
        <video
          className="w-full"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/ui-overview.webp"
        >
          <source src="/daemon-demo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export function Hero({ release }: { release: ReleaseInfo }) {
  return (
    <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8">
      {/* Hero card */}
      <div className="mx-auto max-w-[88rem]">
        <HeroCard release={release} />
      </div>
    </section>
  );
}
