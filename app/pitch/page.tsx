import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Download,
  GitCommit,
  Github,
  Package,
  Radio,
  Star,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pitch Deck | DAEMON",
  description:
    "DAEMON, the Solana operator console for developers — Frontier Hackathon 2026 submission.",
};

const TRACTION = [
  { value: "510", label: "Downloads across releases", icon: Download },
  { value: "34", label: "Releases in 37 days", icon: Package },
  { value: "151", label: "Commits in last 30 days", icon: GitCommit },
  { value: "MIT", label: "Open source from day one", icon: Github },
];

const TOOL_STACK = [
  "Editor",
  "Terminal",
  "Wallet",
  "Explorer",
  "RPC",
  "Docs",
  "Discord",
  "Swap UI",
];

const SOLUTION_FLOW = [
  "Write Anchor",
  "Run checks",
  "Deploy program",
  "Mint asset",
  "Execute swap",
  "Watch events",
];

const EVENTS = [
  { label: "slot", value: "335421900" },
  { label: "program", value: "Daem...x91" },
  { label: "event", value: "SwapExecuted" },
  { label: "cu", value: "142,880" },
  { label: "status", value: "confirmed" },
];

const PRICING_REASONS = [
  {
    value: "Hours saved",
    label: "Not seats sold",
    detail: "Pro tier is priced against the time devs already lose stitching tools together. One saved deploy pays for the month.",
  },
  {
    value: "$99-199",
    label: "Pro / month",
    detail: "Solo operator tier. Live event stream, one-click deploy, integrated wallet, agent assist.",
  },
  {
    value: "Free core",
    label: "MIT, always",
    detail: "Editor, terminal, and wallet stay open source. Pro layers on infrastructure, not gatekeeping.",
  },
];

const SHIPPED = [
  "Integrated Solana wallet (sign in-app)",
  "One-click Anchor deploy",
  "Live mainnet event pane",
  "Replay engine (v3.0.5)",
  "34 releases shipped publicly",
];

const NEXT_UP = [
  "Jito bundle path",
  "VS Code + JetBrains extensions",
  "Multi-program workspace",
  "Team mode (shared deploys)",
];

const PITCH_IMAGES = {
  readiness: "/Screenshot%202026-04-29%20144734.png",
  toolboxVideo: "/pitch/solana-toolbox.mp4",
  integrationsVideo: "/pitch/integrations.mp4",
};

export default function PitchPage() {
  return (
    <>
      <Header />
      <main className="relative bg-background pt-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(88,200,138,0.045),transparent_18%)]" />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
        <DeckNav />

        <Slide id="problem" kicker="Slide 01 / Hook + Problem">
          <div className="grid min-h-[calc(100vh-5rem)] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <KickerLogo />
              <h1 className="mt-7 text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.86] tracking-[-0.055em]">
                The Solana Operator Console.
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-muted">
                Solana devs today: 8 tools. Terminal. Discord. Docs. Wallets off-screen.
                Manual signing risk. No single view of truth.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <Metric value="8+" label="tools" />
                <Metric value="2h" label="contract to deployed + first swap" />
                <Metric value="0" label="shared source of truth" />
              </div>
            </div>

            <ToolMess title="Today's Solana dev stack" items={TOOL_STACK} />
          </div>
        </Slide>

        <Slide id="solution" kicker="Slide 02 / Solution">
          <div className="grid min-h-[calc(100vh-5rem)] items-center gap-10">
            <div>
              <h2 className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.86] tracking-[-0.055em]">
                One screen. End to end.
              </h2>
              <p className="mt-7 max-w-3xl text-xl leading-8 text-muted">
                Write Anchor contract. Deploy. Mint. Swap. Sign in-app. No tab switches. No
                off-screen wallet confusion. One unbroken operator flow.
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
              <VideoFrame
                src={PITCH_IMAGES.toolboxVideo}
                poster={PITCH_IMAGES.readiness}
                label="Live capture · Solana toolbox"
              />
              <FlowStack />
            </div>
          </div>
        </Slide>

        <Slide id="wedge" kicker="Slide 03 / Tech Wedge">
          <div className="grid min-h-[calc(100vh-5rem)] items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.055em]">
                Live program events streaming.
              </h2>
              <p className="mt-7 text-xl leading-8 text-muted">
                A live mainnet stream for deployed programs: transactions, state changes, CU
                consumption, and confirmations rendered directly inside the editor.
              </p>
              <div className="mt-8 grid gap-3">
                <Punch icon={Radio} text="Real-time program events" />
                <Punch icon={Activity} text="State and transaction visibility" />
                <Punch icon={Zap} text="Compute units at the moment of execution" />
              </div>
            </div>
            <EventPane />
          </div>
        </Slide>

        <Slide id="traction" kicker="Slide 04 / Real Users Check">
          <div className="min-h-[calc(100vh-5rem)] py-16">
            <h2 className="max-w-5xl text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.055em]">
              37 days. Public proof.
            </h2>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-muted">
              Started March 31. Shipping a release almost every day, in the open, on GitHub.
              Numbers below are not projections — they are the repo.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TRACTION.map((item) => (
                <TractionCard key={item.label} {...item} />
              ))}
            </div>
            <div className="mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-card/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <Star className="size-3.5 text-accent" />
              Verifiable at github.com/nullxnothing/daemon
            </div>
          </div>
        </Slide>

        <Slide id="monetization" kicker="Slide 05 / Why people pay">
          <div className="min-h-[calc(100vh-5rem)] py-16">
            <h2 className="text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.055em]">
              Priced on hours saved.
            </h2>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-muted">
              Solana devs already pay for RPC, indexing, and explorer access. DAEMON wraps the
              workflow on top — the editor where those services finally feel like one product.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {PRICING_REASONS.map((item) => (
                <RevenueCard key={item.label} {...item} />
              ))}
            </div>
          </div>
        </Slide>

        <Slide id="team" kicker="Slide 06 / Shipped vs next">
          <div className="min-h-[calc(100vh-5rem)] py-16">
            <h2 className="text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.055em]">
              Working today. Bigger tomorrow.
            </h2>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-muted">
              DAEMON is not a deck. The features below are downloadable now. The roadmap is the
              same cadence applied to deeper Solana tooling.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <ShipColumn title="Shipped" tone="accent" items={SHIPPED} />
              <ShipColumn title="Next 90 days" tone="muted" items={NEXT_UP} />
            </div>
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                <span className="h-px w-5 bg-accent/50" />
                Live integrations · Solana ecosystem
              </div>
              <VideoFrame
                src={PITCH_IMAGES.integrationsVideo}
                label="Recorded · in-app"
              />
            </div>
          </div>
        </Slide>

        <Slide id="ask" kicker="Slide 07 / Try it">
          <div className="grid min-h-[calc(100vh-5rem)] items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.055em]">
                Run DAEMON yourself.
              </h2>
              <p className="mt-7 text-xl leading-8 text-muted">
                The fastest review is a 5-minute install. Download the latest release, deploy a
                program, watch the event pane light up. The deck stops here — the product
                doesn&apos;t.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/docs/installation#download"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
                >
                  Download DAEMON
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="https://github.com/nullxnothing/daemon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card/70 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/40"
                >
                  <Github className="size-4" />
                  Read the source
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-muted">
                <span className="rounded border border-border bg-card/60 px-2 py-1">Frontier Hackathon 2026</span>
                <span className="rounded border border-border bg-card/60 px-2 py-1">MIT licensed</span>
                <span className="rounded border border-border bg-card/60 px-2 py-1">v3.0.10</span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card/75 p-6">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                What changes after the hackathon
              </div>
              <div className="mt-6 grid gap-3">
                {NEXT_UP.map((item, index) => (
                  <RoadmapRow key={item} index={index + 1} text={item} />
                ))}
              </div>
            </div>
          </div>
        </Slide>
      </main>
      <Footer />
    </>
  );
}

function DeckNav() {
  const items = [
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "wedge", label: "Tech Wedge" },
    { id: "traction", label: "Traction" },
    { id: "monetization", label: "Revenue" },
    { id: "team", label: "Team" },
    { id: "ask", label: "Ask" },
  ];
  return (
    <nav className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1.5 xl:flex">
      {items.map((item, index) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="group relative flex size-8 items-center justify-center rounded-md border border-border bg-background/80 font-mono text-[10px] text-muted backdrop-blur-sm transition hover:border-accent/50 hover:bg-card hover:text-accent"
        >
          {index + 1}
          <span className="pointer-events-none absolute right-10 whitespace-nowrap rounded border border-border bg-card/95 px-2 py-1 text-[10px] font-medium text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}

function Slide({
  id,
  kicker,
  children,
}: {
  id: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative mx-auto max-w-7xl scroll-mt-20 border-b border-white/6 px-5 pt-14 pb-20 sm:px-8 sm:pt-20 sm:pb-28"
    >
      <div className="mb-2 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
        <span className="h-px w-5 bg-accent/50" />
        {kicker}
      </div>
      {children}
    </section>
  );
}

function KickerLogo() {
  return (
    <div className="inline-flex items-center gap-3 rounded-md border border-border bg-card/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
      <Image src="/images/daemon-mark-white.png" alt="DAEMON" width={18} height={18} />
      Pitch deck 2026
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-card/75 p-4">
      <div className="text-4xl font-bold leading-none tracking-[-0.04em] text-accent">{value}</div>
      <div className="mt-2 text-xs font-medium leading-5 text-muted">{label}</div>
    </div>
  );
}

function ScreenshotFrame({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(88,200,138,0.07),transparent_65%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-lg border border-border/80 bg-card/75 shadow-[0_28px_90px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />
        <Image src={src} alt={alt} width={2200} height={1370} className="h-auto w-full" priority />
      </div>
    </div>
  );
}

function ToolMess({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="relative rounded-lg border border-red-400/25 bg-red-400/[0.035] p-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-red-200">
          {title}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-200/70">
          {items.length} apps · {items.length} contexts
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">
        What a Solana dev opens to ship one feature today. Each box is a separate window, account,
        and tab.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {items.map((item, index) => (
          <div
            key={item}
            className="rounded-md border border-red-400/15 bg-background/70 px-3 py-2 text-sm text-muted/80 line-through decoration-red-300/30 decoration-1"
            style={{ transform: `rotate(${(index % 2 === 0 ? -0.4 : 0.4)}deg)` }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 border-t border-red-400/15 pt-4 text-xs font-medium text-red-200/80">
        <span className="font-mono uppercase tracking-[0.16em]">DAEMON →</span>
        <span className="text-foreground">replaces all of this with one window.</span>
      </div>
    </div>
  );
}

function FlowStack() {
  return (
    <div className="grid content-center gap-3 rounded-lg border border-border bg-card/75 p-5">
      {SOLUTION_FLOW.map((item, index) => (
        <div key={item} className="flex items-center gap-3 rounded-md border border-border bg-background/70 p-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-foreground">{item}</span>
        </div>
      ))}
    </div>
  );
}

function Punch({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card/70 p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/8">
        <Icon className="size-5 text-accent" />
      </div>
      <div className="text-lg font-semibold leading-7 text-foreground">{text}</div>
    </div>
  );
}

function EventPane() {
  return (
    <div className="rounded-lg border border-border bg-[#090b0a] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          <Radio className="size-4" />
          Mainnet event stream
        </div>
        <span className="flex items-center gap-1.5 rounded-sm border border-accent/30 bg-accent/10 px-2 py-1 text-[10px] text-accent">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />
          live
        </span>
      </div>
      <div className="mt-5 grid gap-3">
        {EVENTS.map((item) => (
          <div key={item.label} className="grid grid-cols-[110px_1fr] gap-3 rounded-md border border-border bg-card/45 px-4 py-3 font-mono text-sm">
            <span className="uppercase tracking-[0.14em] text-muted">{item.label}</span>
            <span className="text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
      <pre className="mt-5 overflow-hidden rounded-md border border-border bg-background/80 p-4 text-[12px] leading-6 text-muted">
{`event SwapExecuted {
  signer: 7bA...m19
  input: 2.4 SOL
  output: 389.22 USDC
  compute_units: 142880
}`}
      </pre>
    </div>
  );
}

function TractionCard({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card/75 p-5">
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-accent/0 via-accent/50 to-accent/0" />
      <Icon className="size-5 text-accent" />
      <div className="mt-5 text-[clamp(2.5rem,5vw,4.8rem)] font-bold leading-none tracking-[-0.045em] text-foreground">
        {value}
      </div>
      <div className="mt-3 text-sm font-medium text-muted">{label}</div>
    </div>
  );
}

function RevenueCard({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-lg border border-border bg-card/75 p-6">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />
      <div className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.045em] text-accent">
        {value}
      </div>
      <div className="mt-4 text-lg font-semibold text-foreground">{label}</div>
      <div className="mt-2 text-sm leading-6 text-muted">{detail}</div>
    </article>
  );
}

function ShipColumn({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "accent" | "muted";
  items: string[];
}) {
  const isAccent = tone === "accent";
  return (
    <div className={`rounded-lg border bg-card/75 p-6 ${isAccent ? "border-accent/30" : "border-border border-dashed"}`}>
      <div className={`font-mono text-[11px] font-semibold uppercase tracking-[0.18em] ${isAccent ? "text-accent" : "text-muted"}`}>
        {title}
      </div>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-md border border-border bg-background/60 p-3">
            <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${isAccent ? "text-accent" : "text-muted/60"}`} />
            <span className="text-sm leading-6 font-medium text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function VideoFrame({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label?: string;
}) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(88,200,138,0.07),transparent_65%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-lg border border-border/80 bg-card/75 shadow-[0_28px_90px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />
        {label ? (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded border border-accent/30 bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent backdrop-blur-sm">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            {label}
          </div>
        ) : null}
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

function RoadmapRow({ index, text }: { index: number; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-md border border-border bg-background/70 p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent font-mono text-sm font-bold text-accent-foreground">
        {index}
      </span>
      <span className="text-lg font-semibold leading-7 text-foreground">{text}</span>
    </div>
  );
}
