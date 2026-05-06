"use client";

import { Bot, GitBranch, LayoutGrid, Rocket, Wallet } from "lucide-react";

const featureRows = [
  {
    title: "Solana workflows stay native",
    detail:
      "Wallets, swaps, launches, portfolio reads, and explorer tasks run in the same app as the editor.",
    stat: "Wallet + chain tools",
  },
  {
    title: "Agents work beside the code",
    detail:
      "Spawn agents with model control, project context, and MCP access without leaving the workspace.",
    stat: "Parallel agents",
  },
  {
    title: "Real editor, real terminal, real git",
    detail:
      "Monaco, PTY terminals, and full git flows ship as core product surfaces instead of stitched-on plugins.",
    stat: "No extensions stack",
  },
  {
    title: "Shipping stays close to the build",
    detail:
      "Deploy, test, iterate, and hand work off without bouncing through browser tabs and extra wrappers.",
    stat: "Deploy from the app",
  },
];

const capabilityCards = [
  {
    icon: Wallet,
    title: "Wallet + market ops",
    copy: "Balances, swaps, launches, and account reads.",
  },
  {
    icon: Bot,
    title: "Agent system",
    copy: "Project-aware agents with tool access and prompt control.",
  },
  {
    icon: LayoutGrid,
    title: "Grind mode",
    copy: "Multiple panels for coding, terminals, and parallel work.",
  },
  {
    icon: GitBranch,
    title: "Git built in",
    copy: "Branch, diff, stage, commit, and push without context switching.",
  },
  {
    icon: Rocket,
    title: "Deploy flow",
    copy: "Connect once and ship without leaving the workspace.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-6 py-24 md:py-30">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]">
        <div className="max-w-[28rem]">
          <p className="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase">
            Operator console
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.03em] gradient-text md:text-[3.1rem]">
            One console.
            <br />
            Less drag.
          </h2>
          <p className="mt-6 text-[17px] text-muted leading-relaxed">
            Daemon collapses the eight tools a Solana developer juggles into one workspace.
            Editor, agents, wallet, swaps, launches, deploys: same app, same window, same
            session.
          </p>
        </div>

        <div className="space-y-4">
          {featureRows.map((row) => (
            <article
              key={row.title}
              className="grid gap-4 rounded-lg border border-white/[0.055] bg-card/80 px-5 py-5 md:grid-cols-[160px_minmax(0,1fr)] md:px-6"
            >
              <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                {row.stat}
              </div>
              <div>
                <h3 className="text-[1.05rem] font-semibold tracking-[-0.015em] text-foreground">
                  {row.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.72] text-muted">
                  {row.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-5">
        {capabilityCards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.title} className="rounded-lg border border-white/[0.05] bg-card/65 p-5">
              <div className="inline-flex size-10 items-center justify-center rounded-md border border-accent/15 bg-accent/8">
                <Icon className="size-4.5 text-accent" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted">{card.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
