"use client";

import Link from "next/link";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";
import type { ReleaseInfo } from "@/lib/downloads";

function DemoVideo() {
  return (
    <div className="relative">
      <div className="absolute -inset-x-10 -inset-y-8 bg-[linear-gradient(90deg,transparent,rgba(88,200,138,0.08),transparent)] blur-3xl" />
      <div className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-surface shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
        <div className="flex h-9 items-center gap-2 border-b border-white/[0.06] bg-white/[0.025] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#d86f6f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#d7b75f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="ml-auto font-mono text-[11px] text-muted-foreground">daemon://console</span>
        </div>
        <video
          className="block w-full"
          aria-label="Daemon operator console preview"
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
    <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-7 lg:px-10 lg:pb-28 lg:pt-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(88,200,138,0.045),transparent_34%)]" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto grid max-w-[88rem] items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] xl:gap-16">
        <div className="max-w-[42rem] text-center lg:text-left">
          <div className="animate-fade-up mb-7 flex items-center justify-center gap-3 text-[12px] font-mono uppercase tracking-[0.22em] text-muted-foreground lg:justify-start">
            <Image
              src="/images/daemon-mark-white.png"
              alt="Daemon"
              width={26}
              height={26}
              priority
            />
            <span>The Solana operator console</span>
          </div>

          <h1
            className="animate-fade-up mx-auto max-w-[16ch] text-balance text-[clamp(2.9rem,6vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.055em] lg:mx-0"
            style={{ animationDelay: "80ms" }}
          >
            Ship Solana apps from one console.
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-[36rem] text-balance text-[1.06rem] leading-[1.72] text-muted md:text-[1.18rem] lg:mx-0"
            style={{ animationDelay: "160ms" }}
          >
            Daemon is the operator console for Solana developers. Agents, wallets, launches,
            swaps, and deploys, in one workspace. Go from prompt to mainnet in 60 seconds with{" "}
            <Link href="/#shipline" className="text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent">Shipline</Link>.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/docs/installation#download"
              onClick={() => track("Download", { location: "hero" })}
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-accent px-6 py-3 text-[15px] font-semibold text-accent-foreground transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_32px_rgba(88,200,138,0.24)]"
            >
              Download Daemon
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#features"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-6 py-3 text-[15px] font-semibold text-foreground transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05]"
            >
              See how it works
            </Link>
            <Link
              href="/pitch"
              onClick={() => track("Pitch", { location: "hero" })}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-[15px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              View pitch
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div
            className="animate-fade-up mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[12px] text-muted-foreground lg:justify-start"
            style={{ animationDelay: "300ms" }}
          >
            <span className="inline-flex items-center rounded-md border border-white/8 bg-white/[0.025] px-2.5 py-1">v{release.version}</span>
            <span className="inline-flex items-center rounded-md border border-white/8 bg-white/[0.025] px-2.5 py-1">Windows / macOS / Linux</span>
            <Link
              href="/docs"
              className="transition-colors hover:text-foreground"
            >
              Docs
            </Link>
          </div>
        </div>

        <div className="animate-fade-up lg:translate-x-8 xl:translate-x-12" style={{ animationDelay: "180ms" }}>
          <DemoVideo />
        </div>
      </div>
    </section>
  );
}
