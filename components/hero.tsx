"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { Monitor, Apple } from "lucide-react";

const WINDOWS_URL =
  "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-1.0.0-setup.exe";
const MAC_URL =
  "https://github.com/nullxnothing/daemon#mac-install";

function DemoVideo() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow behind the video */}
      <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-3xl animate-glow-pulse" />

      {/* Video window */}
      <div className="relative rounded-xl border border-border bg-[#0c0c0c] overflow-hidden shadow-2xl shadow-black/50">
        <video
          className="w-full"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/daemon-demo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(62,207,142,0.08),transparent)]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl w-full">
        {/* Logo */}
        <div className="animate-fade-up mb-6">
          <Image
            src="/images/daemon-icon.png"
            alt="DAEMON"
            width={64}
            height={64}
            className="mx-auto rounded-2xl"
            priority
          />
        </div>

        {/* Version badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-[13px] text-muted mb-8">
          <span className="size-1.5 rounded-full bg-accent" />
          v1.3.0 — Grind Mode is live
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.9]"
          style={{ animationDelay: "100ms" }}
        >
          <span className="gradient-text">Solana&apos;s first IDE.</span>
          <br />
          <span className="gradient-text">Build. Launch. Deploy.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up mt-6 text-lg md:text-xl text-muted max-w-xl mx-auto leading-relaxed"
          style={{ animationDelay: "200ms" }}
        >
          The first IDE built specifically for Solana. AI agents, built-in
          wallet, token launches, Jupiter swaps, and deploys — all from one
          desktop app.
          <br className="hidden sm:block" />
          Not a fork. Not a plugin. Built from scratch.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ animationDelay: "300ms" }}
        >
          <a
            href={WINDOWS_URL}
            download
            onClick={() => track("Download", { os: "windows", location: "hero" })}
            className="group flex items-center gap-2.5 bg-foreground text-background px-6 py-3 rounded-xl font-medium text-[15px] transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_30px_rgba(62,207,142,0.2)]"
          >
            <Monitor className="size-[18px]" />
            Download for Windows
          </a>
          <a
            href={MAC_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Download", { os: "mac", location: "hero" })}
            className="group flex items-center gap-2.5 border border-border bg-card px-6 py-3 rounded-xl font-medium text-[15px] text-muted transition-all duration-200 hover:border-muted hover:text-foreground hover:bg-card-hover"
          >
            <Apple className="size-[18px]" />
            Install for Mac
          </a>
        </div>

        {/* Terminal mockup */}
        <div
          className="animate-fade-up mt-16 sm:mt-20"
          style={{ animationDelay: "450ms" }}
        >
          <DemoVideo />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
