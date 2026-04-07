"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { Monitor, Apple, ArrowRight, Terminal } from "lucide-react";

const WINDOWS_URL =
  "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-2.0.1-setup.exe";
const MAC_URL =
  "https://github.com/nullxnothing/daemon#mac-install";
const LINUX_URL =
  "https://github.com/nullxnothing/daemon#linux-install";

function HeroCard() {
  return (
    <div className="relative min-h-[600px] flex flex-col items-center justify-center rounded-[48px] border border-border bg-card overflow-hidden shadow-sm transition-all duration-500">
      {/* Abstract swirl background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_60%,rgba(62,207,142,0.12),transparent_70%)]" />

        {/* Swirl layers - twinkle animation */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 50% at 20% 80%, rgba(62,207,142,0.25), transparent 60%),
              radial-gradient(ellipse 50% 60% at 80% 20%, rgba(62,207,142,0.2), transparent 60%),
              radial-gradient(ellipse 40% 35% at 60% 70%, rgba(42,157,104,0.18), transparent 50%),
              radial-gradient(ellipse 45% 40% at 30% 30%, rgba(62,207,142,0.15), transparent 55%)
            `,
            animation: "hero-twinkle-1 8s ease-in-out infinite",
          }}
        />

        {/* Second gradient layer twinkle offset */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 55% 45% at 70% 60%, rgba(62,207,142,0.2), transparent 55%),
              radial-gradient(ellipse 40% 50% at 25% 40%, rgba(42,157,104,0.15), transparent 50%)
            `,
            animation: "hero-twinkle-2 11s ease-in-out infinite",
          }}
        />

        {/* Flowing organic shapes - twinkle */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="turbulence">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves="3"
                seed="5"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="80"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
          <g filter="url(#turbulence)">
            <path
              d="M-100,400 Q200,100 500,350 T900,250 T1300,400 T1100,600 T600,550 T100,650 Z"
              fill="rgba(62,207,142,0.15)"
              style={{ animation: "hero-twinkle-3 6s ease-in-out infinite" }}
            />
            <path
              d="M-50,300 Q300,500 600,200 T1000,450 T800,700 T300,600 Z"
              fill="rgba(42,157,104,0.12)"
              style={{ animation: "hero-twinkle-3 9s ease-in-out infinite 2s" }}
            />
            <path
              d="M100,600 Q400,300 700,500 T1100,300 T1200,600 T700,700 T200,500 Z"
              fill="rgba(62,207,142,0.1)"
              style={{ animation: "hero-twinkle-4 7s ease-in-out infinite 1s" }}
            />
          </g>
        </svg>

        {/* Halftone dot overlay - twinkle */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(62,207,142,0.4) 1px, transparent 1px)`,
            backgroundSize: "8px 8px",
            animation: "hero-dots-twinkle 6s ease-in-out infinite",
          }}
        />

        {/* Second halftone layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(62,207,142,0.5) 0.5px, transparent 0.5px)`,
            backgroundSize: "4px 4px",
            backgroundPosition: "2px 2px",
            animation: "hero-dots-twinkle-2 9s ease-in-out infinite 1.5s",
          }}
        />

        {/* Vignette for center readability */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(14,14,14,0.85),transparent_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-3xl mx-auto">
        {/* Logo */}
        <div className="animate-fade-up mb-6">
          <Image
            src="/images/daemon-icon.png"
            alt="DAEMON"
            width={56}
            height={56}
            className="mx-auto rounded-2xl"
            priority
          />
        </div>

        {/* Badges */}
        <div className="animate-fade-up flex items-center justify-center gap-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-[13px] text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            v2.0.0: Grind Mode is live
          </div>
          <a
            href="https://github.com/nullxnothing/daemon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 text-[13px] text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.03em] leading-[0.95]"
          style={{ animationDelay: "100ms" }}
        >
          <span className="text-foreground">Solana&apos;s</span>
          <br />
          <span className="text-foreground">first IDE.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up mt-6 text-lg md:text-xl text-muted max-w-md mx-auto leading-relaxed"
          style={{ animationDelay: "200ms" }}
        >
          AI agents, built-in wallet, token launches, and deploys. All from one desktop app.
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
            className="group flex items-center gap-2.5 bg-accent text-accent-foreground px-7 py-3.5 rounded-full font-semibold text-[15px] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_40px_rgba(62,207,142,0.3)]"
          >
            <Monitor className="size-[18px]" />
            Download for Windows
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={MAC_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Download", { os: "mac", location: "hero" })}
            className="group flex items-center gap-2.5 border border-white/10 bg-white/5 backdrop-blur-sm px-7 py-3.5 rounded-full font-medium text-[15px] text-muted transition-all duration-200 hover:border-white/20 hover:text-foreground hover:bg-white/10"
          >
            <Apple className="size-[18px]" />
            Install for Mac
          </a>
          <a
            href={LINUX_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Download", { os: "linux", location: "hero" })}
            className="group flex items-center gap-2.5 border border-white/10 bg-white/5 backdrop-blur-sm px-7 py-3.5 rounded-full font-medium text-[15px] text-muted transition-all duration-200 hover:border-white/20 hover:text-foreground hover:bg-white/10"
          >
            <Terminal className="size-[18px]" />
            Install for Linux
          </a>
        </div>
      </div>
    </div>
  );
}

function DemoVideo() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-3xl animate-glow-pulse" />
      <div className="relative rounded-2xl border border-border bg-[#0c0c0c] overflow-hidden shadow-2xl shadow-black/50">
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

export function Hero() {
  return (
    <section className="relative px-4 sm:px-6 pt-20 pb-16">
      {/* Hero card */}
      <div className="max-w-6xl mx-auto">
        <HeroCard />
      </div>

      {/* Demo video below the card */}
      <div
        className="animate-fade-up max-w-6xl mx-auto mt-16"
        style={{ animationDelay: "450ms" }}
      >
        <div className="text-center mb-8">
          <p className="text-accent text-[13px] font-medium tracking-wider uppercase mb-3">
            See it in action
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight gradient-text">
            One app. Everything you need.
          </h2>
        </div>
        <DemoVideo />
      </div>
    </section>
  );
}
