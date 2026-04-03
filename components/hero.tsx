"use client";

import { Monitor, Apple } from "lucide-react";

const WINDOWS_URL =
  "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-1.1.0-setup.exe";
const MAC_URL =
  "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-1.1.0-setup.exe";

function TerminalMockup() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Glow behind the terminal */}
      <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-3xl animate-glow-pulse" />

      {/* Terminal window */}
      <div className="relative rounded-xl border border-border bg-[#0c0c0c] overflow-hidden shadow-2xl shadow-black/50">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-[#111111]">
          <div className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#febc2e]" />
            <div className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[11px] text-muted-foreground font-mono">
              daemon ~/projects/my-app
            </span>
          </div>
        </div>

        {/* Terminal content */}
        <div className="p-5 font-mono text-[13px] leading-relaxed space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-accent">~</span>
            <span className="text-muted">claude --model claude-opus-4-20250514</span>
          </div>
          <div className="text-muted-foreground mt-3 space-y-0.5">
            <p>
              <span className="text-accent">agent</span> analyzing project
              structure...
            </p>
            <p>
              <span className="text-accent">agent</span> found 23 files across
              4 modules
            </p>
            <p>
              <span className="text-accent">agent</span> implementing auth
              middleware with rate limiting
            </p>
            <p>
              <span className="text-accent">agent</span>{" "}
              <span className="text-foreground">
                created src/middleware/auth.ts
              </span>
            </p>
            <p>
              <span className="text-accent">agent</span>{" "}
              <span className="text-foreground">
                created src/middleware/rateLimit.ts
              </span>
            </p>
            <p>
              <span className="text-accent">agent</span> running tests...{" "}
              <span className="text-accent">12 passed</span>
            </p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-accent">~</span>
            <span className="text-muted-foreground">|</span>
            <span
              className="inline-block w-[7px] h-[15px] bg-accent/70"
              style={{ animation: "cursor-blink 1.2s step-end infinite" }}
            />
          </div>
        </div>
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
        {/* Version badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-[13px] text-muted mb-8">
          <span className="size-1.5 rounded-full bg-accent" />
          v1.1.0 — Now available
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.9]"
          style={{ animationDelay: "100ms" }}
        >
          <span className="gradient-text">Code. Deploy.</span>
          <br />
          <span className="gradient-text">Ship.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up mt-6 text-lg md:text-xl text-muted max-w-xl mx-auto leading-relaxed"
          style={{ animationDelay: "200ms" }}
        >
          The AI-native IDE built for solo developers who ship fast.
          <br className="hidden sm:block" />
          Not a fork. Purpose-built from scratch.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ animationDelay: "300ms" }}
        >
          <a
            href={WINDOWS_URL}
            download
            className="group flex items-center gap-2.5 bg-foreground text-background px-6 py-3 rounded-xl font-medium text-[15px] transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_30px_rgba(62,207,142,0.2)]"
          >
            <Monitor className="size-[18px]" />
            Download for Windows
          </a>
          <a
            href={MAC_URL}
            download
            className="group flex items-center gap-2.5 border border-border bg-card px-6 py-3 rounded-xl font-medium text-[15px] text-muted transition-all duration-200 hover:border-muted hover:text-foreground hover:bg-card-hover"
          >
            <Apple className="size-[18px]" />
            Download for Mac
          </a>
        </div>

        {/* Terminal mockup */}
        <div
          className="animate-fade-up mt-16 sm:mt-20"
          style={{ animationDelay: "450ms" }}
        >
          <TerminalMockup />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
