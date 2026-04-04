"use client";

import { track } from "@vercel/analytics";
import { Monitor, Apple, Github } from "lucide-react";

const WINDOWS_URL =
  "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-1.0.0-setup.exe";
const MAC_URL =
  "https://github.com/nullxnothing/daemon#mac-install";

export function CTA() {
  return (
    <section id="download" className="py-24 md:py-32 px-6 bg-black relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white text-balance">
          Ready to ship faster?
        </h2>
        <p className="mt-5 text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Free, open source, and built for the solo dev who runs agents, ships
          tokens, and deploys before the thread goes viral.
        </p>

        {/* Download buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={WINDOWS_URL}
            download
            onClick={() => track("Download", { os: "windows", location: "cta" })}
            className="group flex items-center gap-2.5 bg-accent text-black px-7 py-3.5 rounded-xl font-semibold text-[15px] transition-all duration-200 hover:bg-accent/90 hover:shadow-[0_0_40px_rgba(62,207,142,0.3)] hover:scale-[1.02]"
          >
            <Monitor className="size-[18px]" />
            Download for Windows
          </a>
          <a
            href={MAC_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Download", { os: "mac", location: "cta" })}
            className="group flex items-center gap-2.5 border border-neutral-800 bg-neutral-900/50 px-7 py-3.5 rounded-xl font-medium text-[15px] text-neutral-300 transition-all duration-200 hover:border-neutral-700 hover:text-white hover:bg-neutral-900"
          >
            <Apple className="size-[18px]" />
            Install for Mac
          </a>
        </div>

        {/* Meta info */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            v1.3.0
          </span>
          <span>MIT License</span>
          <a
            href="https://github.com/nullxnothing/daemon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Github className="size-3.5" />
            Open Source
          </a>
        </div>

        {/* Divider + stats */}
        <div className="mt-16 pt-12 border-t border-neutral-800">
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-accent">
                4
              </div>
              <div className="mt-1 text-[13px] text-neutral-500">
                Parallel agents
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-accent">
                21
              </div>
              <div className="mt-1 text-[13px] text-neutral-500">
                Built-in panels
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-accent">
                109
              </div>
              <div className="mt-1 text-[13px] text-neutral-500">
                Tests passing
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
