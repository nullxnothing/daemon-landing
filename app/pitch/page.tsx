import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  Cpu,
  Github,
  Rocket,
  Sparkles,
  Wallet,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pitch | Daemon",
  description:
    "The one-page case for Daemon, the operator console for Solana developers. Problem, wedge, traction, and ask.",
};

const PROBLEM = [
  "Solana devs juggle 8+ tools daily: editor, Phantom, Jupiter, explorer, Helius, terminal, deploy script, RPC config.",
  "Browser IDEs (Playground, Beach, Amphitheatre) skip wallets and deploys. Cursor skips Solana primitives entirely.",
  "Five Colosseum entrants tried a Solana IDE in the last three hackathons. None bundled the on-chain ops.",
];

const SOLUTION = [
  {
    icon: Sparkles,
    title: "Shipline",
    body: "Prompt → Anchor program → mainnet in 60 seconds. AI author + live CU readout + Jito-bundle deploy in one workflow.",
  },
  {
    icon: Wallet,
    title: "Native wallet & ops",
    body: "Built-in wallet, Jupiter swaps, token launches, portfolio reads, signed in-app, never in a tab.",
  },
  {
    icon: Workflow,
    title: "Agents beside the code",
    body: "Project-aware agents with MCP access. Spawn parallel agents on the same workspace.",
  },
  {
    icon: Cpu,
    title: "Real editor stack",
    body: "Monaco, PTY terminals, full git. Native primitives, not stitched-on plugins.",
  },
];

const WEDGE = [
  ["Cursor", "Best-in-class editor + AI", "No Solana primitives. Wallet, deploy, and swaps live elsewhere."],
  ["Solana Playground", "Browser sandbox", "No wallet, no deploys, no real editor."],
  ["Anchor CLI", "Canonical toolchain", "Ten terminal tabs. No UI, no agents, no ops surface."],
  ["solforge / Amphitheatre / Gryffin", "Hackathon IDEs", "Single-feature or browser-only. None bundle ops + AI + deploys."],
  ["Daemon", "The operator console", "Editor + agents + wallet + launches + swaps + deploys, same app."],
];

const TRACTION = [
  { stat: "MIT", label: "Open source on GitHub" },
  { stat: "Multi-OS", label: "Windows, macOS, Linux" },
  { stat: "Active", label: "Daily commits, public roadmap" },
  { stat: "Community", label: "Discord, Telegram, X live" },
];

const ROADMAP = [
  { quarter: "Now", focus: "Shipline GA, Jupiter routing, agent MCP" },
  { quarter: "Next", focus: "Geyser stream pane, in-IDE program tracing" },
  { quarter: "Later", focus: "Mobile companion, hosted RPC, team workspaces" },
];

export default function PitchPage() {
  return (
    <>
      <Header />
      <main className="relative px-6 pt-28 pb-24">
        <div className="mx-auto max-w-5xl">
          {/* Cover */}
          <section className="border-b border-white/[0.06] pb-14">
            <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
              <Image
                src="/images/daemon-mark-white.png"
                alt="Daemon"
                width={22}
                height={22}
              />
              <span>Daemon · One-page deck · 2026</span>
            </div>
            <h1 className="mt-6 text-[clamp(2.6rem,5.4vw,4.4rem)] font-bold leading-[0.95] tracking-[-0.045em]">
              The operator console
              <br />
              for Solana developers.
            </h1>
            <p className="mt-6 max-w-[40rem] text-[1.06rem] leading-[1.72] text-muted md:text-[1.18rem]">
              Daemon collapses the eight tools a Solana developer juggles into one
              workspace: agents, wallets, launches, swaps, and deploys, all signed in-app.
              Prompt to mainnet in 60 seconds with Shipline.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/docs/installation#download"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[14px] font-semibold text-accent-foreground transition-all hover:brightness-110"
              >
                Download Daemon
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://github.com/nullxnothing/daemon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-5 py-2.5 text-[14px] font-semibold text-foreground transition-all hover:border-white/20 hover:bg-white/[0.05]"
              >
                <Github className="size-4" />
                View source
              </a>
            </div>
          </section>

          {/* Problem */}
          <section className="border-b border-white/[0.06] py-14">
            <SlideHeader number="01" label="The problem" />
            <ul className="mt-7 space-y-4">
              {PROBLEM.map((p) => (
                <li key={p} className="flex gap-3 text-[1.02rem] leading-[1.72] text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </section>

          {/* Solution */}
          <section className="border-b border-white/[0.06] py-14">
            <SlideHeader number="02" label="The solution" />
            <p className="mt-5 max-w-[42rem] text-[1.02rem] leading-[1.72] text-muted">
              One desktop console. Native Solana ops, agents, and the headline primitive: Shipline.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {SOLUTION.map((s) => {
                const Icon = s.icon;
                return (
                  <article
                    key={s.title}
                    className="rounded-lg border border-white/[0.055] bg-card/80 p-6"
                  >
                    <div className="inline-flex size-9 items-center justify-center rounded-md border border-accent/15 bg-accent/8">
                      <Icon className="size-4 text-accent" />
                    </div>
                    <h3 className="mt-5 text-[1.05rem] font-semibold text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.72] text-muted">{s.body}</p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Wedge */}
          <section className="border-b border-white/[0.06] py-14">
            <SlideHeader number="03" label="The wedge" />
            <p className="mt-5 max-w-[42rem] text-[1.02rem] leading-[1.72] text-muted">
              Cursor will never integrate a Solana wallet UX. Solana Playground will never
              be a desktop product. The opening is in the middle.
            </p>
            <div className="mt-8 overflow-hidden rounded-lg border border-white/[0.055]">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.025] text-left">
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Tool
                    </th>
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Strength
                    </th>
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      Gap
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {WEDGE.map(([tool, strength, gap], i) => (
                    <tr
                      key={tool}
                      className={
                        i === WEDGE.length - 1
                          ? "bg-accent/[0.04]"
                          : "border-b border-white/[0.04]"
                      }
                    >
                      <td className="px-5 py-4 font-semibold text-foreground">{tool}</td>
                      <td className="px-5 py-4 text-muted">{strength}</td>
                      <td className="px-5 py-4 text-muted">{gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Traction */}
          <section className="border-b border-white/[0.06] py-14">
            <SlideHeader number="04" label="Traction & shape" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TRACTION.map((t) => (
                <div
                  key={t.label}
                  className="rounded-lg border border-white/[0.05] bg-card/65 px-5 py-5"
                >
                  <div className="font-mono text-[20px] font-semibold text-foreground">
                    {t.stat}
                  </div>
                  <div className="mt-1.5 text-[13px] text-muted">{t.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Business model */}
          <section className="border-b border-white/[0.06] py-14">
            <SlideHeader number="05" label="Business model" />
            <ul className="mt-7 space-y-4">
              {[
                "Open-source MIT shell. Pro tier for teams ($20–40/mo), Cursor playbook.",
                "Per-launch and per-deploy fees on optional managed flows.",
                "RPC partnership rev-share with Helius / Triton / Quicknode.",
                "$DAEMON token = community + governance. Not a fundraise.",
              ].map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-[1.02rem] leading-[1.72] text-muted"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </section>

          {/* Roadmap */}
          <section className="border-b border-white/[0.06] py-14">
            <SlideHeader number="06" label="Roadmap" />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {ROADMAP.map((r) => (
                <article
                  key={r.quarter}
                  className="rounded-lg border border-white/[0.055] bg-card/80 p-6"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {r.quarter}
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.72] text-foreground">
                    {r.focus}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="border-b border-white/[0.06] py-14">
            <SlideHeader number="07" label="Team" />
            <p className="mt-7 text-[1.02rem] leading-[1.72] text-muted">
              Built by{" "}
              <a
                href="https://github.com/nullxnothing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-white/30 underline-offset-4 hover:decoration-foreground"
              >
                nullxnothing
              </a>
              {" "},  Solana developer + web security researcher. Daily commits, open roadmap,
              public Discord. Adding contributors as the surface area grows.
            </p>
          </section>

          {/* Ask */}
          <section className="py-14">
            <SlideHeader number="08" label="The ask" />
            <div className="mt-8 rounded-lg border border-accent/30 bg-accent/[0.04] p-7">
              <Rocket className="size-5 text-accent" />
              <h3 className="mt-4 text-[1.4rem] font-semibold tracking-[-0.02em] text-foreground">
                Try Daemon. Break Shipline. Tell us what&apos;s missing.
              </h3>
              <p className="mt-3 max-w-[40rem] text-[14px] leading-[1.72] text-muted">
                We&apos;re shipping toward Cypherpunk-tier polish. If you build on Solana, we
                want you in the workspace. If you fund Solana infra, we want you in the DM.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/docs/installation#download"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[14px] font-semibold text-accent-foreground transition-all hover:brightness-110"
                >
                  Download
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="https://x.com/DaemonTerminal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-5 py-2.5 text-[14px] font-semibold text-foreground transition-all hover:border-white/20 hover:bg-white/[0.05]"
                >
                  Reach out on X
                </a>
                <a
                  href="mailto:hello@daemon.computer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-5 py-2.5 text-[14px] font-semibold text-foreground transition-all hover:border-white/20 hover:bg-white/[0.05]"
                >
                  hello@daemon.computer
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SlideHeader({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
        {number}
      </span>
      <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold tracking-[-0.025em] text-foreground">
        {label}
      </h2>
    </div>
  );
}
