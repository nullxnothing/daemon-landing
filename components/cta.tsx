"use client";

import { track } from "@vercel/analytics";
import { Monitor, Apple, Github } from "lucide-react";

const WINDOWS_URL =
  "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-1.0.0-setup.exe";
const MAC_URL =
  "https://github.com/nullxnothing/daemon#mac-install";

export function CTA() {
  return (
    <section id="download" className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text text-balance">
          Stop tabbing between 12 apps
        </h2>
        <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
          Free, open source, and built for the solo dev who runs agents, ships
          tokens, and deploys before the thread goes viral.
        </p>

        {/* Download buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={WINDOWS_URL}
            download
            onClick={() => track("Download", { os: "windows", location: "cta" })}
            className="group flex items-center gap-2.5 bg-foreground text-background px-6 py-3.5 rounded-xl font-medium text-[15px] transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_30px_rgba(62,207,142,0.2)]"
          >
            <Monitor className="size-[18px]" />
            Download for Windows
          </a>
          <a
            href={MAC_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("Download", { os: "mac", location: "cta" })}
            className="group flex items-center gap-2.5 border border-border bg-card px-6 py-3.5 rounded-xl font-medium text-[15px] text-muted transition-all duration-200 hover:border-muted hover:text-foreground hover:bg-card-hover"
          >
            <Apple className="size-[18px]" />
            Install for Mac
          </a>
        </div>

        {/* Meta info */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent" />
            v1.3.0
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

        {/* Divider + stats */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                4
              </div>
              <div className="mt-1 text-[13px] text-muted-foreground">
                Parallel agents
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                21
              </div>
              <div className="mt-1 text-[13px] text-muted-foreground">
                Built-in panels
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                109
              </div>
              <div className="mt-1 text-[13px] text-muted-foreground">
                Tests passing
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
