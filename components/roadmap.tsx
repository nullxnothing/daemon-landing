"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Zap,
  Shield,
  Cloud,
  Cpu,
  Users,
  Smartphone,
  Puzzle,
  X,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

type Status = "In Development" | "Planned" | "Research";

type Feature = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  status: Status;
  eta: string;
  capabilities: string[];
  stack: string[];
  details: string;
};

const features: Feature[] = [
  {
    icon: Sparkles,
    title: "Multi-Agent Orchestration",
    tagline: "Run a swarm of Claude Code agents in parallel.",
    description:
      "Coordinate multiple agents on a single task with shared context, role assignment, and a supervisor that routes work.",
    status: "In Development",
    eta: "V2.1",
    capabilities: [
      "Spawn N parallel Claude Code sessions from one launcher",
      "Shared scratchpad and message bus between agents",
      "Supervisor agent for task decomposition and merging",
      "Per-agent model selection (Opus / Sonnet / Haiku)",
      "Live agent graph view in the IDE",
      "Auto-resume on crash via persisted session state",
    ],
    stack: ["node-pty", "Claude Agent SDK", "SQLite session store", "xterm.js"],
    details:
      "Builds on the existing Agent Launcher. Today you spawn one agent per terminal tab. V2.1 introduces a Conductor — a top-level agent that breaks a goal into subtasks, dispatches them to worker agents, and reconciles their outputs. Workers communicate through a shared SQLite-backed message bus so they can hand off context without re-reading files. The IDE renders a live DAG of who's blocking who.",
  },
  {
    icon: Cpu,
    title: "Local LLM Support",
    tagline: "Offline AI with Ollama and LM Studio.",
    description:
      "First-class local model support so you can keep code on-device, work offline, and pick the right model per task.",
    status: "In Development",
    eta: "V2.1",
    capabilities: [
      "Ollama auto-detect with model picker in the launcher",
      "LM Studio HTTP API as a drop-in provider",
      "Per-agent model override (Claude for hard tasks, local for grunt work)",
      "Embeddings via local models for the codebase index",
      "Streaming token output through the existing PTY pipeline",
      "Works with no internet — full offline mode",
    ],
    stack: ["Ollama", "LM Studio", "OpenAI-compatible adapter", "llama.cpp"],
    details:
      "DAEMON treats Ollama and LM Studio as additional providers behind the same agent interface used for Claude. The launcher detects a running Ollama daemon on localhost:11434, lists installed models, and lets you assign one to any agent slot. For routine work — file renames, scaffolding, simple edits — you save credits by routing to a local model while reserving Claude for reasoning-heavy steps.",
  },
  {
    icon: Smartphone,
    title: "DAEMON Mobile",
    tagline: "Monitor agents and ship from your phone.",
    description:
      "An Expo-built React Native companion app to watch long-running agents, approve tool calls, and review diffs on the go.",
    status: "In Development",
    eta: "V2.2",
    capabilities: [
      "Live agent feed with status, cost, and tool-call stream",
      "Push notifications when an agent needs approval",
      "Approve / deny tool calls from the lock screen",
      "Diff viewer for proposed file changes",
      "Wallet view tied to your DAEMON Pro entitlement",
      "Pair with desktop via QR code over the Helius relay",
    ],
    stack: ["Expo SDK 55", "React Native 0.85", "expo-router", "expo-secure-store", "Zustand"],
    details:
      "The mobile app is a thin client that pairs with your desktop DAEMON instance. Your laptop keeps doing the work — running agents, holding files, executing code — and the phone is a remote control. When an agent hits a checkpoint that requires human approval, the desktop pushes through the relay and the phone pings you. Tap to approve, deny, or open the diff. Useful for the long-running Grind Mode runs where you don't want to babysit a terminal.",
  },
  {
    icon: Puzzle,
    title: "Plugin Marketplace",
    tagline: "Install community tools, skills, and MCP servers in one click.",
    description:
      "A curated marketplace inside DAEMON for publishing and installing plugins, agent skills, MCP servers, and themes.",
    status: "In Development",
    eta: "V2.2",
    capabilities: [
      "One-click install for MCP servers with auto-config",
      "Sandboxed plugin runtime with a capability manifest",
      "Skill packages (SKILL.md + assets) discoverable in-app",
      "Publish from the CLI: daemon publish",
      "Reviews, version pinning, and signed releases",
      "Featured plugins from Arena winners",
    ],
    stack: ["MCP", "Electron sandbox", "Sigstore signing", "GitHub releases"],
    details:
      "Today plugins ship by editing .claude/settings.json by hand. The marketplace turns that into a real UX: a panel inside DAEMON where you browse, preview, and install. Each plugin declares the surfaces it touches (terminal, editor, wallet, network) and the user grants those capabilities at install time. Arena winners get a featured slot, closing the loop between contests and real distribution.",
  },
  {
    icon: Zap,
    title: "Real-Time Collaboration",
    tagline: "Multiplayer DAEMON sessions over a shared agent.",
    description:
      "Pair-program with teammates inside DAEMON: live cursors, shared terminal, and a single agent both of you can drive.",
    status: "Planned",
    eta: "V2.3",
    capabilities: [
      "Live cursors and presence in the editor",
      "Shared terminal with read/write handoff",
      "One agent, two operators — both can prompt and approve",
      "Session replay for async review",
      "End-to-end encrypted via libsodium",
      "Works through NAT via WebRTC + relay fallback",
    ],
    stack: ["Yjs CRDT", "WebRTC", "libsodium", "Liveblocks-style relay"],
    details:
      "A CRDT layer on top of the Monaco model and the PTY buffer. Two people open the same DAEMON workspace, see each other's cursors, and share a single Claude Code session. Either person can type, prompt the agent, or approve a tool call — but writes are serialized so the agent never sees conflicting input. Sessions are recorded so you can scrub back through what your partner did while you were asleep.",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    tagline: "Defense-in-depth for an IDE that runs autonomous agents.",
    description:
      "Stricter sandboxing, signed releases, hardware-key support, and audit logs for everything an agent does.",
    status: "Planned",
    eta: "V2.3",
    capabilities: [
      "Per-tool capability gating (file write, network, exec)",
      "Hardware key support for wallet signing (Ledger, YubiKey)",
      "Full audit log of agent tool calls (exportable, signed)",
      "Code-signed Windows + notarized macOS builds",
      "Plugin sandbox with SECCOMP / AppContainer",
      "Secret scanning before any agent reads a file",
    ],
    stack: ["Electron contextIsolation", "Sigstore", "Ledger HID", "AppContainer"],
    details:
      "Running an autonomous agent on your laptop is a security bet. DAEMON's answer is least-privilege by default: agents declare what they need (read this dir, hit this domain, run this binary), the user approves, and the runtime enforces. The audit log captures every tool call with input, output, timestamp, and a signed hash chain so you can prove what an agent did or didn't do.",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    tagline: "Your settings, plugins, and sessions across machines.",
    description:
      "Encrypted sync of DAEMON state — themes, MCP configs, agent templates, recent sessions — between every machine you use.",
    status: "Planned",
    eta: "V2.4",
    capabilities: [
      "End-to-end encrypted with a passphrase you own",
      "Selective sync per machine (work vs personal)",
      "Resume an agent session on a different device",
      "Versioned config history with rollback",
      "Self-host option using S3 or local filesystem",
      "Zero-knowledge — we never see your config",
    ],
    stack: ["age encryption", "S3-compatible backend", "CRDT for conflict-free merge"],
    details:
      "Cloud Sync is opt-in and zero-knowledge. Your DAEMON state is encrypted with a key derived from your passphrase before it leaves your machine. The backend is just blob storage — anyone can self-host. The killer feature is session portability: start an agent on your desktop, close the laptop, open DAEMON on another machine, resume the same agent mid-task.",
  },
  {
    icon: Users,
    title: "Team Workspaces",
    tagline: "Shared agent templates and MCP configs for your team.",
    description:
      "A team layer on top of DAEMON: shared skills, shared MCP servers, shared agent templates, and per-team Arena boards.",
    status: "Planned",
    eta: "V2.4",
    capabilities: [
      "Team-scoped MCP server bundles",
      "Shared agent templates with role-based access",
      "Centralized API key vault (Anthropic, Helius, etc.)",
      "Usage analytics per team and per agent",
      "Private Arena boards for internal contests",
      "SSO via Clerk or your own OIDC provider",
    ],
    stack: ["Clerk / OIDC", "Postgres", "row-level security", "Stripe billing"],
    details:
      "Today every DAEMON user is solo. Team Workspaces add an org layer: invite teammates, share an MCP bundle so everyone has the same tools, push agent templates so a junior dev gets the same workflow as a staff engineer. API keys live in a team vault with audit logs, so nobody has to paste secrets into Slack again.",
  },
];

const statusStyles: Record<Status, string> = {
  "In Development": "bg-accent/10 text-accent border-accent/20",
  Planned: "bg-muted-foreground/10 text-muted-foreground border-border",
  Research: "bg-yellow-300/10 text-yellow-300 border-yellow-300/20",
};

export function Roadmap() {
  const [active, setActive] = useState<Feature | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="roadmap" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            Roadmap
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold gradient-text text-balance">
            What&apos;s coming next
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            We&apos;re just getting started. Click any card to see capabilities, stack, and timing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.title}
                type="button"
                onClick={() => setActive(feature)}
                className="group relative text-left p-8 rounded-[var(--radius-lg)] border border-dashed border-border bg-card/50 transition-all hover:border-accent/40 hover:bg-card hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              >
                <div
                  className={`absolute top-4 right-4 px-3 py-1 text-[11px] font-medium rounded-full border ${statusStyles[feature.status]}`}
                >
                  {feature.status}
                </div>

                <div className="inline-flex items-center justify-center size-12 rounded-[var(--radius-sm)] bg-card border border-border mb-6">
                  <Icon className="size-6 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-accent/80 mb-3">{feature.tagline}</p>
                <p className="text-muted leading-relaxed text-[15px]">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Target: {feature.eta}</span>
                  <span className="inline-flex items-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Details
                    <ArrowRight className="size-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted mb-6">
            Want to influence the roadmap? Contribute or open an issue.
          </p>
          <a
            href="https://github.com/nullxnothing/daemon/issues"
            className="inline-flex items-center gap-2 text-accent hover:underline underline-offset-4"
          >
            Open an issue on GitHub
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      {active ? <FeatureModal feature={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}

function FeatureModal({ feature, onClose }: { feature: Feature; onClose: () => void }) {
  const Icon = feature.icon;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="roadmap-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-card shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-background/60 transition-colors"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>

        <div className="p-8 sm:p-10">
          <div className="flex items-start gap-4 pr-8">
            <div className="inline-flex items-center justify-center size-12 shrink-0 rounded-[var(--radius-sm)] bg-background border border-border">
              <Icon className="size-6 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span
                  className={`px-3 py-1 text-[11px] font-medium rounded-full border ${statusStyles[feature.status]}`}
                >
                  {feature.status}
                </span>
                <span className="px-3 py-1 text-[11px] font-medium rounded-full border border-border text-muted-foreground">
                  Target: {feature.eta}
                </span>
              </div>
              <h3 id="roadmap-modal-title" className="text-2xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1 text-accent/90 text-sm">{feature.tagline}</p>
            </div>
          </div>

          <p className="mt-8 text-muted leading-relaxed">{feature.details}</p>

          <div className="mt-8">
            <h4 className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5">
              {feature.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3 text-[15px] text-foreground/90">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h4 className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-4">
              Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {feature.stack.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs rounded-full border border-border bg-background/60 text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
