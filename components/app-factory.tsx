"use client";

import { useState } from "react";
import {
  Bot,
  Check,
  Clock3,
  Globe2,
  LayoutDashboard,
  Lock,
  Megaphone,
  MessageSquareText,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";

type BuildType = "Website" | "Dashboard" | "Telegram bot" | "Raid board" | "Token gate" | "Updates";

type DemoModule = {
  title: string;
  description: string;
};

const buildOptions: { label: BuildType; icon: typeof Globe2 }[] = [
  { label: "Website", icon: Globe2 },
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Telegram bot", icon: Bot },
  { label: "Raid board", icon: Megaphone },
  { label: "Token gate", icon: Lock },
  { label: "Updates", icon: MessageSquareText },
];

const demoModules: Record<BuildType, DemoModule[]> = {
  Website: [
    {
      title: "Token website",
      description: "Hero, chart area, CA copy button, socials, roadmap, buy routing, and community sections.",
    },
    {
      title: "Launch-ready structure",
      description: "A clean starting project that can be opened inside DAEMON for edits, testing, and deploy prep.",
    },
    {
      title: "Brand pass",
      description: "AI-assisted copy, layout direction, colors, and page sections built around the token prompt.",
    },
  ],
  Dashboard: [
    {
      title: "Holder dashboard",
      description: "Token stats, holder overview, liquidity card, chart panel, social links, and community actions.",
    },
    {
      title: "Wallet-aware panels",
      description: "Connect wallet states, holder CTAs, gated sections, and token-specific actions.",
    },
    {
      title: "Data wiring plan",
      description: "A DAEMON handoff for connecting chart, metadata, holder, and market data providers.",
    },
  ],
  "Telegram bot": [
    {
      title: "Bot command map",
      description: "Price checks, buy alerts, raid reminders, holder checks, project updates, and admin commands.",
    },
    {
      title: "Community automation",
      description: "A starter flow for alerts, announcements, scheduled posts, and token community prompts.",
    },
    {
      title: "Deploy checklist",
      description: "Environment variables, bot token setup, hosting notes, and DAEMON project handoff.",
    },
  ],
  "Raid board": [
    {
      title: "Raid coordination",
      description: "Target links, post queue, completion states, community tasks, and leaderboard-ready UI.",
    },
    {
      title: "Content kit",
      description: "Launch copy, raid messages, pinned posts, announcement snippets, and community CTAs.",
    },
    {
      title: "Community tracker",
      description: "A structure for tracking pushes, wins, contributors, and follow-up actions.",
    },
  ],
  "Token gate": [
    {
      title: "Holder-gated page",
      description: "Wallet connect, token balance gate, gated content area, and non-holder fallback state.",
    },
    {
      title: "Private resources",
      description: "Holder-only updates, project files, roadmap notes, links, and community resources.",
    },
    {
      title: "Access handoff",
      description: "A DAEMON-ready plan for wiring token checks and gated content into the generated app.",
    },
  ],
  Updates: [
    {
      title: "Project update hub",
      description: "Announcement feed, X post drafts, community update cards, and project status sections.",
    },
    {
      title: "AI content kit",
      description: "Pinned posts, launch threads, daily updates, raid copy, and holder announcements.",
    },
    {
      title: "Publishing workflow",
      description: "A structured handoff for turning project updates into pages, posts, and community actions.",
    },
  ],
};

export function AppFactory() {
  const [selected, setSelected] = useState<BuildType>("Website");
  const Icon = buildOptions.find((option) => option.label === selected)?.icon ?? Globe2;

  return (
    <section id="app-factory" className="relative overflow-hidden px-5 py-28 sm:px-7 md:py-36 lg:px-10">
      <div className="absolute inset-0 section-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_35%,rgba(88,200,138,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-[88rem]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-3 py-1.5 text-[13px] text-accent">
              <Clock3 className="size-3.5" />
              Coming soon
            </div>

            <h2 className="gradient-text text-4xl font-bold leading-[1.02] tracking-[-0.035em] md:text-6xl">
              DAEMON App Factory
              <br />
              is coming soon.
            </h2>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted md:text-lg">
              This will become the front door for Solana communities. Enter a token CA, describe what your project needs, and DAEMON will generate a starting point for websites, dashboards, bots, raid boards, token gates, and update hubs.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
              {buildOptions.map((option) => {
                const OptionIcon = option.icon;
                const active = selected === option.label;
                return (
                  <button
                    key={option.label}
                    onClick={() => setSelected(option.label)}
                    className={`group flex items-center gap-2 rounded-2xl border px-4 py-3 text-left transition-all ${
                      active
                        ? "border-accent/35 bg-accent/10 text-foreground"
                        : "border-white/[0.07] bg-white/[0.03] text-muted hover:border-white/15 hover:text-foreground"
                    }`}
                  >
                    <OptionIcon className={`size-4 ${active ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
                    <span className="text-[13px] font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-accent/5 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0d0d0d]/95 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.025] px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-red-400/70" />
                  <div className="size-2.5 rounded-full bg-yellow-400/70" />
                  <div className="size-2.5 rounded-full bg-accent/80" />
                </div>
                <div className="font-mono text-[12px] text-muted-foreground">daemon.app/factory/demo</div>
              </div>

              <div className="p-5 md:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
                      Demo mode
                    </p>
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">Preview what it will generate</h3>
                  </div>
                  <button
                    disabled
                    className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-muted-foreground opacity-70"
                  >
                    <Wallet className="size-4 text-accent" />
                    Wallet soon
                  </button>
                </div>

                <label className="mb-2 block text-[13px] text-muted">Token contract address</label>
                <input
                  disabled
                  value="Paste Solana token CA"
                  className="w-full cursor-not-allowed rounded-2xl border border-white/[0.08] bg-black/35 px-4 py-3.5 font-mono text-[14px] text-muted-foreground outline-none"
                  readOnly
                />

                <label className="mb-2 mt-5 block text-[13px] text-muted">Prompt</label>
                <textarea
                  disabled
                  readOnly
                  rows={4}
                  value={`Build my token a ${selected.toLowerCase()} with community tools, token data, wallet-aware actions, and a DAEMON-ready project handoff.`}
                  className="w-full cursor-not-allowed resize-none rounded-2xl border border-white/[0.08] bg-black/35 px-4 py-3.5 text-[14px] leading-relaxed text-muted-foreground outline-none"
                />

                <button
                  disabled
                  className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-accent/45 px-5 py-3.5 text-[15px] font-semibold text-black opacity-70"
                >
                  <Zap className="size-4" />
                  Project generation coming soon
                </button>

                <div className="mt-5 rounded-2xl border border-white/[0.07] bg-black/30 p-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-1 text-[12px] text-muted-foreground">Demo output</p>
                      <h4 className="flex items-center gap-2 text-lg font-semibold tracking-[-0.02em]">
                        <Icon className="size-4 text-accent" />
                        {selected} blueprint
                      </h4>
                    </div>
                    <div className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-[12px] font-medium text-accent">
                      Preview only
                    </div>
                  </div>

                  <p className="mb-4 text-[13px] leading-relaxed text-muted">
                    When live, DAEMON will turn the token CA and prompt into a structured project plan, generated modules, and a handoff that can be opened inside the desktop app for editing, testing, and shipping.
                  </p>

                  <div className="grid gap-2.5">
                    {demoModules[selected].map((module) => (
                      <div key={module.title} className="rounded-xl bg-white/[0.035] px-3 py-2.5">
                        <div className="flex items-center gap-3">
                          <Check className="size-4 shrink-0 text-accent" />
                          <span className="text-[13px] font-medium text-foreground">{module.title}</span>
                        </div>
                        <p className="mt-1 pl-7 text-[12px] leading-relaxed text-muted">{module.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Step 01</p>
                      <p className="mt-1 text-[13px] font-medium text-foreground">Connect wallet</p>
                    </div>
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Step 02</p>
                      <p className="mt-1 text-[13px] font-medium text-foreground">Enter token</p>
                    </div>
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Step 03</p>
                      <p className="mt-1 text-[13px] font-medium text-foreground">Open in DAEMON</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
