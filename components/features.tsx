"use client";

import {
  Code2,
  Bot,
  LayoutGrid,
  Wallet,
  Rocket,
  GitBranch,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Solana Native",
    description:
      "Built-in wallet with live portfolio via Helius, SPL token tracking, PumpFun token launches, and Jupiter swaps. No browser extensions, no context switching.",
  },
  {
    icon: Shield,
    title: "Enterprise Signing",
    description:
      "Pluggable signing backends via Solana Keychain. AWS KMS, Fireblocks, Turnkey, HashiCorp Vault — swap your signing infrastructure without changing your workflow.",
    accent: true,
  },
  {
    icon: LayoutGrid,
    title: "Grind Mode",
    description:
      "Multi-panel agent grid for parallel coding. Spin up Claude agents working different parts of your project at the same time. The closest thing to cloning yourself.",
  },
  {
    icon: Bot,
    title: "Agent System",
    description:
      "Spawn Claude Code agents with custom system prompts, model selection, and per-project MCP configs. Every agent runs as a real CLI process with full tool access.",
  },
  {
    icon: Code2,
    title: "Monaco + Terminal",
    description:
      "Full offline Monaco editor with multi-tab, breadcrumbs, and syntax highlighting. Real PTY terminals via node-pty with splits and tab completion.",
  },
  {
    icon: Rocket,
    title: "One-Click Deploy",
    description:
      "Ship to Vercel or Railway straight from the editor. Connect your accounts once and deploy without touching a browser.",
  },
  {
    icon: GitBranch,
    title: "Git Built In",
    description:
      "Branch, stage, commit, push, stash, and tag, all visual. Full git workflow without opening a separate terminal.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-28 md:py-36 px-6">
      {/* Subtle halftone background */}
      <div className="halftone-subtle absolute inset-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase mb-5">
            Built for Solana
          </p>
          <h2 className="text-4xl md:text-[3.25rem] font-bold tracking-[-0.02em] leading-[1.1] gradient-text text-balance">
            Everything you need
            <br />
            in one app
          </h2>
          <p className="mt-6 text-[17px] text-muted leading-relaxed max-w-lg mx-auto">
            The first IDE where Solana tooling, AI agents, and deployment are
            native, not plugins bolted on after the fact.
          </p>
        </div>

        {/* Feature grid - 3x2 for visual balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-7 rounded-2xl card-premium"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center size-11 rounded-xl bg-accent/8 border border-accent/10 mb-5 transition-colors group-hover:border-accent/20 group-hover:bg-accent/12">
                  <Icon className="size-5 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-foreground mb-2.5 tracking-[-0.01em]">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-muted leading-[1.7]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
