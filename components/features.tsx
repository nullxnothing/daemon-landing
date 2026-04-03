"use client";

import {
  Code2,
  Bot,
  LayoutGrid,
  Wallet,
  Rocket,
  GitBranch,
} from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "Grind Mode",
    description:
      "4-panel agent grid for parallel coding. Spin up four Claude agents working different parts of your project at the same time. The closest thing to cloning yourself.",
    accent: true,
  },
  {
    icon: Wallet,
    title: "Solana Native",
    description:
      "Built-in wallet with live portfolio via Helius, SPL token tracking, PumpFun token launches, and Jupiter swaps. No browser extensions, no context switching.",
    accent: true,
  },
  {
    icon: Bot,
    title: "Agent System",
    description:
      "Spawn Claude Code agents with custom system prompts, model selection, and per-project MCP configs. Every agent runs as a real CLI process with full tool access.",
    accent: true,
  },
  {
    icon: Code2,
    title: "Monaco + Terminal",
    description:
      "Full offline Monaco editor with multi-tab, breadcrumbs, and syntax highlighting. Real PTY terminals via node-pty with splits and tab completion.",
    accent: false,
  },
  {
    icon: Rocket,
    title: "One-Click Deploy",
    description:
      "Ship to Vercel or Railway straight from the editor. Connect your accounts once and deploy without touching a browser.",
    accent: false,
  },
  {
    icon: GitBranch,
    title: "Git Built In",
    description:
      "Branch, stage, commit, push, stash, tag — all visual. Full git workflow without opening a separate terminal.",
    accent: false,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent text-[13px] font-medium tracking-wider uppercase mb-4">
            What&apos;s inside
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text text-balance">
            Built for builders who ship alone
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            Not a plugin marketplace. Not a wrapper around VS Code. A standalone
            desktop app where AI agents and Solana tooling are first-class.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:border-[#222] hover:bg-card-hover"
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center size-10 rounded-lg mb-4 border transition-colors ${
                    feature.accent
                      ? "bg-accent/8 border-accent/15 group-hover:border-accent/25"
                      : "bg-card border-border group-hover:border-[#222]"
                  }`}
                >
                  <Icon
                    className={`size-5 ${
                      feature.accent ? "text-accent" : "text-muted"
                    }`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-[15px] font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed">
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
