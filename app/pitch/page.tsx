import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Activity,
  ArrowRight,
  Code2,
  Download,
  Github,
  Radio,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pitch Deck | DAEMON",
  description:
    "Seven-slide pitch deck for DAEMON, the Solana operator console for developers.",
};

const TRACTION = [
  { value: "$3.90K", label: "Income so far", icon: Activity },
  { value: "500+", label: "Community followers", icon: Users },
  { value: "250+", label: "Downloads", icon: Download },
  { value: "24/7", label: "Build velocity", icon: Github },
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

const REVENUE_MODEL = [
  { value: "$99-199", label: "Pro / month", detail: "Power-user Solana operator tier" },
  { value: "1K", label: "devs @ $150", detail: "$1.8M ARR model" },
  { value: "10K", label: "devs @ $150", detail: "$18M ARR model" },
  { value: "Teams", label: "enterprise path", detail: "Seats, support, private integrations" },
];

const TEAM = [
  { role: "Founder / builder", name: "nullxnothing", detail: "Shipping DAEMON in public with daily product velocity." },
  { role: "Open seat", name: "Solana systems lead", detail: "Rust, Anchor, transaction simulation, RPC reliability." },
  { role: "Open seat", name: "Product engineer", detail: "Desktop IDE, wallet UX, extensions, and developer workflows." },
  { role: "Advisor target", name: "Solana infra operator", detail: "Helius, Anza, Superteam, Jito, or RPC ecosystem." },
];

const ROADMAP = [
  "Live program events pane",
  "Jito bundle path",
  "VS Code extension",
  "JetBrains extension",
];

const PITCH_IMAGES = {
  readiness: "/Screenshot%202026-04-29%20144734.png",
};

export default function PitchPage() {
  return (
    <>
      <Header />
      <main className="relative bg-background pt-20">
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

            <ToolMess title="Today" items={TOOL_STACK} />
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
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <ScreenshotFrame
                src={PITCH_IMAGES.readiness}
                alt="DAEMON project readiness workspace"
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
                A Laserstream-style pane for deployed program events: transactions, state changes,
                CU consumption, and confirmations directly inside the editor.
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
              Real traction. Real velocity.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TRACTION.map((item) => (
                <TractionCard key={item.label} {...item} />
              ))}
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <Quote text="Deployed faster because wallet, terminal, and repo context stayed together." />
              <Quote text="The app finally treats Solana work like an operator workflow, not a set of browser tabs." />
              <Quote text="Daily commits. Fast iteration. This is the kind of desktop shell Solana devs need." />
            </div>
          </div>
        </Slide>

        <Slide id="monetization" kicker="Slide 05 / Monetization">
          <div className="min-h-[calc(100vh-5rem)] py-16">
            <h2 className="text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.055em]">
              Clear path to $18M ARR.
            </h2>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-muted">
              Developer tools monetize when they save hours. DAEMON starts with solo operators,
              expands to teams, then becomes the standard Solana workflow surface.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {REVENUE_MODEL.map((item) => (
                <RevenueCard key={item.label} {...item} />
              ))}
            </div>
            <RevenueTable />
          </div>
        </Slide>

        <Slide id="team" kicker="Slide 06 / Team + Momentum">
          <div className="min-h-[calc(100vh-5rem)] py-16">
            <h2 className="text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.055em]">
              Founder-led. Builder-first.
            </h2>
            <p className="mt-7 max-w-3xl text-xl leading-8 text-muted">
              The product is shipping before the full company is filled out. The next step is
              surrounding the working app with Solana systems, product, and infra depth.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {TEAM.map((item) => (
                <TeamCard key={`${item.role}-${item.name}`} {...item} />
              ))}
            </div>
          </div>
        </Slide>

        <Slide id="ask" kicker="Slide 07 / Ask + Roadmap">
          <div className="grid min-h-[calc(100vh-5rem)] items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-[clamp(3rem,7.5vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.055em]">
                Make DAEMON the Solana dev stack.
              </h2>
              <p className="mt-7 text-xl leading-8 text-muted">
                Immediate focus: win operator workflows, prove the Pro tier, and ship the
                integrations Solana developers already stitch together by hand.
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
                  href="https://x.com/DaemonTerminal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card/70 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/40"
                >
                  Talk on X
                </a>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card/75 p-6">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                6-month roadmap
              </div>
              <div className="mt-6 grid gap-3">
                {ROADMAP.map((item, index) => (
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
  const items = ["problem", "solution", "wedge", "traction", "monetization", "team", "ask"];
  return (
    <nav className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 xl:flex">
      {items.map((item, index) => (
        <a
          key={item}
          href={`#${item}`}
          className="flex size-8 items-center justify-center rounded-md border border-border bg-background/80 font-mono text-[10px] text-muted transition hover:border-accent/40 hover:text-accent"
        >
          {index + 1}
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
      className="mx-auto max-w-7xl scroll-mt-24 border-b border-white/[0.06] px-5 py-8 sm:px-8"
    >
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
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
    <div className="overflow-hidden rounded-lg border border-border bg-card/75 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <Image src={src} alt={alt} width={2200} height={1370} className="h-auto w-full" priority />
    </div>
  );
}

function ToolMess({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-red-400/20 bg-red-400/[0.035] p-5">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-red-200">
        {title}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-border bg-background/70 px-3 py-2 text-sm text-muted">
            {item}
          </div>
        ))}
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
          Laserstream events
        </div>
        <span className="rounded-sm border border-accent/30 bg-accent/10 px-2 py-1 text-[10px] text-accent">
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
    <div className="rounded-lg border border-border bg-card/75 p-5">
      <Icon className="size-5 text-accent" />
      <div className="mt-5 text-[clamp(2.5rem,5vw,4.8rem)] font-bold leading-none tracking-[-0.045em]">
        {value}
      </div>
      <div className="mt-3 text-sm font-medium text-muted">{label}</div>
    </div>
  );
}

function Quote({ text }: { text: string }) {
  return (
    <blockquote className="rounded-lg border border-border bg-card/75 p-5 text-lg font-semibold leading-8 text-foreground">
      &quot;{text}&quot;
    </blockquote>
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
    <article className="rounded-lg border border-border bg-card/75 p-6">
      <div className="text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.045em] text-accent">
        {value}
      </div>
      <div className="mt-4 text-lg font-semibold text-foreground">{label}</div>
      <div className="mt-2 text-sm leading-6 text-muted">{detail}</div>
    </article>
  );
}

function RevenueTable() {
  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card/75">
      <div className="grid grid-cols-3 border-b border-border bg-background/50 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <span>Scenario</span>
        <span>ARPU</span>
        <span>ARR</span>
      </div>
      {[
        ["1K operators", "$150/mo", "$1.8M"],
        ["10K operators", "$150/mo", "$18M"],
        ["50K operators", "$150/mo", "$90M"],
      ].map(([scenario, arpu, arr]) => (
        <div key={scenario} className="grid grid-cols-3 border-b border-border px-5 py-4 text-sm last:border-b-0">
          <span className="font-semibold text-foreground">{scenario}</span>
          <span className="text-muted">{arpu}</span>
          <span className="font-semibold text-accent">{arr}</span>
        </div>
      ))}
    </div>
  );
}

function TeamCard({ role, name, detail }: { role: string; name: string; detail: string }) {
  return (
    <article className="rounded-lg border border-border bg-card/75 p-6">
      <div className="flex size-14 items-center justify-center rounded-md border border-accent/20 bg-accent/8">
        <Code2 className="size-6 text-accent" />
      </div>
      <div className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {role}
      </div>
      <div className="mt-2 text-2xl font-bold tracking-[-0.035em] text-foreground">{name}</div>
      <div className="mt-3 text-sm leading-6 text-muted">{detail}</div>
    </article>
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
