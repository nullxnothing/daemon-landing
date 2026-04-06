"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_COUNT = 10;
const AUTO_ADVANCE_MS = 5000;

const CAPTIONS: { title: string; description: string }[] = [
  { title: "Launch Screen", description: "DAEMON boots into a minimal, focused workspace." },
  { title: "Code Editor", description: "Monaco editor with an integrated file tree and terminal." },
  { title: "Agent Launcher", description: "Spin up AI agents with your preferred model." },
  { title: "Claude Panel", description: "Chat with Claude directly inside your IDE." },
  { title: "Git Integration", description: "Stage, commit, and diff without leaving the editor." },
  { title: "Solana Wallet", description: "View token balances and manage wallets natively." },
  { title: "Settings", description: "Configure API keys and provider preferences." },
  { title: "Process Manager", description: "Monitor and control all running tasks at a glance." },
  { title: "Multi-Terminal", description: "Tabbed terminals for parallel workflows." },
  { title: "Full Workspace", description: "Every panel working together in one view." },
];

export function ProductTour() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDE_COUNT);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-accent text-[13px] font-medium tracking-wider uppercase mb-3">
            Product Tour
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text text-balance">
            Inside DAEMON
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            A walkthrough of every layer, from the editor to the wallet.
          </p>
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/40 aspect-video">
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: i === current ? 1 : 0 }}
              >
                <Image
                  src={`/slides/${i + 1}.webp`}
                  alt={`DAEMON product tour slide ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 1152px"
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="mt-6 text-center min-h-[3.5rem]">
            <p className="text-foreground text-[14px] font-semibold tracking-tight">
              {CAPTIONS[current].title}
            </p>
            <p className="text-muted text-[13px] mt-1">
              {CAPTIONS[current].description}
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-4">
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-1.5 bg-accent"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-3 mx-auto max-w-xs h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-accent/40 rounded-full transition-all duration-300"
              style={{ width: `${((current + 1) / SLIDE_COUNT) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
