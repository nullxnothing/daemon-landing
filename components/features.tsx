"use client";

import {
  Code2,
  Terminal,
  Bot,
  Globe,
  LayoutGrid,
  Wallet,
  Rocket,
  GitBranch,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Monaco Editor + Terminal",
    description:
      "Full offline Monaco editor with multi-tab support, breadcrumbs, and syntax highlighting. Real PTY terminals powered by node-pty with split panes and tab completion.",
    accent: true,
  },
  {
    icon: Bot,
    title: "Claude AI Integration",
    description:
      "Spawn Claude Code agents with custom system prompts, model selection, and per-project MCP configs. Multi-agent sessions run as real CLI processes.",
    accent: true,
  },
  {
    icon: Globe,
    title: "Browser Mode",
    description:
      "Embedded Chromium browser with security sandbox. Preview, test, and interact with your applications without leaving the IDE.",
    accent: false,
  },
  {
    icon: LayoutGrid,
    title: "Grind Mode",
    description:
      "4-panel agent grid for parallel coding. Run multiple AI agents simultaneously across different tasks in your project.",
    accent: true,
  },
  {
    icon: Wallet,
    title: "Solana Wallet",
    description:
      "Built-in wallet with live portfolio tracking via Helius. SOL balance, SPL token holdings, and PumpFun token launches directly from the IDE.",
    accent: false,
  },
  {
    icon: Rocket,
    title: "Deploy Panel",
    description:
      "One-click deploys to Vercel and Railway. Connect your accounts and ship straight from the editor.",
    accent: false,
  },
  {
    icon: GitBranch,
    title: "Git Panel",
    description:
      "Branch switching, file staging, commit, push, stash, and tag management. Full visual git workflow without the terminal.",
    accent: false,
  },
  {
    icon: RefreshCw,
    title: "Crash Recovery + Auto-Update",
    description:
      "Automatic crash recovery preserves your session state. Seamless auto-updates keep you on the latest version.",
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
            Features
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text text-balance">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            Purpose-built from scratch for AI-native development. Every feature
            designed to work seamlessly with AI agents.
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
