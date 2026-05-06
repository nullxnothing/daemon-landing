"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { Github, ArrowRight } from "lucide-react";
import type { ReleaseInfo } from "@/lib/downloads";

export function CTA({ release }: { release: ReleaseInfo }) {
  return (
    <section id="download" className="relative py-24 md:py-30 px-6 overflow-hidden">
      {/* Background treatment - echo of hero swirl */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_80%,rgba(88,200,138,0.07),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(88,200,138,0.24) 1px, transparent 1px)`,
            backgroundSize: "10px 10px",
            maskImage: "radial-gradient(ellipse 70% 50% at 50% 70%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 70%, black 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Heading */}
        <p className="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase mb-5">
          Get Started
        </p>
        <h2 className="text-4xl md:text-[3.25rem] font-bold tracking-[-0.02em] leading-[1.1] gradient-text text-balance">
          Download the console.
        </h2>
        <p className="mt-6 text-[17px] text-muted max-w-xl mx-auto leading-relaxed">
          Free, open source, and purpose-built for Solana, from prompt to mainnet, in one window.
        </p>

        {/* Keep the decision simple here; platform choices live on the installation page. */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/docs/installation#download"
            onClick={() => track("Download", { location: "cta" })}
            className="group flex items-center gap-2.5 bg-accent text-accent-foreground px-7 py-3.5 rounded-lg font-semibold text-[15px] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_32px_rgba(88,200,138,0.22)]"
          >
            Download Daemon
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="https://pump.fun/coin/4vpf4qNtNVkvz2dm5qL2mT6jBXH9gDY8qH2QsHN5pump"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("BuyDaemon", { location: "cta" })}
            className="group flex items-center gap-2.5 border border-white/10 bg-white/5 backdrop-blur-sm px-7 py-3.5 rounded-lg font-medium text-[15px] text-muted transition-all duration-200 hover:border-white/20 hover:text-foreground hover:bg-white/10"
          >
            Buy $DAEMON
          </a>
        </div>
        <p className="mt-4 text-[13px] text-muted-foreground">
          Windows, macOS Apple Silicon, macOS Intel, and Linux builds are available.{" "}
          <Link href="/docs/installation" className="hover:text-foreground transition-colors">
            See platform options.
          </Link>
        </p>

        {/* Meta info */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent" />
            v{release.version}
          </span>
          <span>MIT License</span>
          <a
            href="https://github.com/nullxnothing/daemon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github className="size-3.5" />
            Open Source
          </a>
        </div>

      </div>
    </section>
  );
}
