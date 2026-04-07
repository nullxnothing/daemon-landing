"use client";

import { track } from "@vercel/analytics";
import { Monitor, Apple, Github, ArrowRight, Terminal } from "lucide-react";

const WINDOWS_URL =
  "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-2.0.1-setup.exe";
const MAC_URL =
  "https://github.com/nullxnothing/daemon#mac-install";
const LINUX_URL =
  "https://github.com/nullxnothing/daemon#linux-install";

export function CTA() {
  return (
    <section id="download" className="relative py-28 md:py-36 px-6 overflow-hidden">
      {/* Background treatment - echo of hero swirl */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_80%,rgba(62,207,142,0.08),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(62,207,142,0.3) 1px, transparent 1px)`,
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
          Start building on
          <br />
          Solana&apos;s first IDE
        </h2>
        <p className="mt-6 text-[17px] text-muted max-w-xl mx-auto leading-relaxed">
          Free, open source, and purpose-built for Solana. From token launches
          to deploys, everything ships from one app.
        </p>

        {/* Download buttons - matching hero style */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={WINDOWS_URL}
            download
            onClick={() => track("Download", { os: "windows", location: "cta" })}
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
            onClick={() => track("Download", { os: "mac", location: "cta" })}
            className="group flex items-center gap-2.5 border border-white/10 bg-white/5 backdrop-blur-sm px-7 py-3.5 rounded-full font-medium text-[15px] text-muted transition-all duration-200 hover:border-white/20 hover:text-foreground hover:bg-white/10"
          >
            <Apple className="size-[18px]" />
            Install for Mac
          </a>
          <a
            href={LINUX_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Download", { os: "linux", location: "cta" })}
            className="group flex items-center gap-2.5 border border-white/10 bg-white/5 backdrop-blur-sm px-7 py-3.5 rounded-full font-medium text-[15px] text-muted transition-all duration-200 hover:border-white/20 hover:text-foreground hover:bg-white/10"
          >
            <Terminal className="size-[18px]" />
            Install for Linux
          </a>
        </div>

        {/* Meta info */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent" />
            v2.0.0
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

        {/* Stats */}
        <div className="mt-16 pt-12 border-t border-white/[0.06]">
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                4
              </div>
              <div className="mt-1.5 text-[13px] text-muted-foreground">
                Parallel agents
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                21
              </div>
              <div className="mt-1.5 text-[13px] text-muted-foreground">
                Built-in panels
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                109
              </div>
              <div className="mt-1.5 text-[13px] text-muted-foreground">
                Tests passing
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
