import { Monitor, Apple, ArrowLeft } from "lucide-react";

const WINDOWS_URL =
  "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-1.2.0-setup.exe";
const MAC_URL =
  "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-1.2.0-setup.exe";

const shortcuts = [
  { keys: "Ctrl+K", action: "Command Drawer (all tools)" },
  { keys: "Ctrl+P", action: "Quick Open (file search)" },
  { keys: "Ctrl+Shift+P", action: "Command Palette" },
  { keys: "Ctrl+Shift+A", action: "Agent Launcher" },
  { keys: "Ctrl+Shift+G", action: "Grind Mode" },
  { keys: "Ctrl+Shift+B", action: "Browser Tab" },
  { keys: "Ctrl+Shift+D", action: "Dashboard Tab" },
  { keys: "Ctrl+Shift+F", action: "Terminal Search" },
  { keys: "Ctrl+`", action: "Toggle Terminal" },
  { keys: "Ctrl+,", action: "Settings" },
];

function SectionHeading({
  id,
  number,
  title,
}: {
  id: string;
  number: string;
  title: string;
}) {
  return (
    <h2 id={id} className="group flex items-center gap-3 text-2xl md:text-3xl font-bold tracking-tight scroll-mt-20">
      <span className="text-accent font-mono text-lg">{number}</span>
      <span className="gradient-text">{title}</span>
      <a
        href={`#${id}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground text-lg"
        aria-label={`Link to ${title}`}
      >
        #
      </a>
    </h2>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <code className="inline-block px-1.5 py-0.5 rounded-md bg-[#1a1a1a] border border-border text-accent font-mono text-[13px]">
      {children}
    </code>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(62,207,142,0.06),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="size-3.5" />
            Back to Home
          </a>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] leading-[0.95] gradient-text">
            Getting Started with DAEMON
          </h1>
          <p className="mt-5 text-lg text-muted max-w-xl leading-relaxed">
            Everything you need to start building with AI agents and Solana
            tools.
          </p>
          {/* TOC */}
          <nav className="mt-10 flex flex-wrap gap-2">
            {[
              { label: "Installation", href: "#installation" },
              { label: "Onboarding", href: "#onboarding" },
              { label: "UI Overview", href: "#ui-overview" },
              { label: "AI Agents", href: "#agents" },
              { label: "Solana", href: "#solana" },
              { label: "Shortcuts", href: "#shortcuts" },
              { label: "Troubleshooting", href: "#troubleshooting" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg border border-border bg-card text-[13px] text-muted hover:text-foreground hover:border-muted transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-20">
        {/* ── Installation ─────────────────────────── */}
        <section>
          <SectionHeading id="installation" number="01" title="Installation" />
          <div className="mt-8 space-y-6 text-muted leading-relaxed">
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WINDOWS_URL}
                download
                className="flex items-center justify-center gap-2.5 bg-foreground text-background px-5 py-3 rounded-xl font-medium text-[15px] transition-all hover:bg-accent hover:text-accent-foreground"
              >
                <Monitor className="size-[18px]" />
                Windows (.exe)
              </a>
              <a
                href={MAC_URL}
                download
                className="flex items-center justify-center gap-2.5 border border-border bg-card px-5 py-3 rounded-xl font-medium text-[15px] text-muted transition-all hover:border-muted hover:text-foreground"
              >
                <Apple className="size-[18px]" />
                macOS (.dmg)
              </a>
            </div>

            <div>
              <h3 className="text-foreground font-semibold text-sm mb-3">Prerequisites</h3>
              <ul className="space-y-2 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span><strong className="text-foreground">Node.js 22+</strong> &mdash; required for agent spawning and terminal sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span><strong className="text-foreground">pnpm</strong> (recommended) &mdash; faster installs, used internally by DAEMON</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-foreground font-semibold text-sm mb-3">First Launch</h3>
              <p className="text-[15px]">
                On first run, DAEMON shows a boot loader sequence followed by the
                onboarding wizard. This walks you through workspace configuration,
                Claude setup, and optional integrations. Takes about 2 minutes.
              </p>
            </div>
          </div>
        </section>

        {/* ── Onboarding Wizard ────────────────────── */}
        <section>
          <SectionHeading id="onboarding" number="02" title="Onboarding Wizard" />
          <div className="mt-8 space-y-6 text-muted leading-relaxed">
            <div className="rounded-xl border border-border bg-card p-5 space-y-5">
              <div>
                <h3 className="text-foreground font-semibold text-sm mb-2">Workspace Profile</h3>
                <p className="text-[15px]">Choose a profile that pre-configures your tool panels and agent skills:</p>
                <ul className="mt-3 space-y-1.5 text-[15px]">
                  <li><strong className="text-foreground">Web</strong> &mdash; Next.js, Vercel, Railway, Browser, Playwright</li>
                  <li><strong className="text-foreground">Solana</strong> &mdash; Wallet, Token Launcher, Jupiter, Helius, Session Registry</li>
                  <li><strong className="text-foreground">Custom</strong> &mdash; Pick exactly which panels and tools to enable</li>
                </ul>
              </div>

              <div className="border-t border-border pt-5">
                <h3 className="text-foreground font-semibold text-sm mb-2">Claude Setup</h3>
                <p className="text-[15px]">
                  DAEMON auto-installs the Claude CLI if not detected. Sign in via
                  OAuth or paste an API key. The CLI powers all agent spawning and
                  Grind Mode.
                </p>
              </div>

              <div className="border-t border-border pt-5">
                <h3 className="text-foreground font-semibold text-sm mb-2">Optional Integrations</h3>
                <p className="text-[15px]">
                  Gmail, Vercel, and Railway connections are optional and fully
                  skippable. You can configure them later in Settings &gt; Integrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── UI Overview ──────────────────────────── */}
        <section>
          <SectionHeading id="ui-overview" number="03" title="UI Overview" />
          <div className="mt-8 space-y-5 text-muted leading-relaxed">
            <div className="rounded-xl border border-border bg-[#0c0c0c] overflow-hidden">
              <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] min-h-[280px]">
                {/* Sidebar */}
                <div className="border-r border-border p-3 flex flex-col items-center gap-3 row-span-2">
                  {["F", "S", "G", "T", "W"].map((letter) => (
                    <div
                      key={letter}
                      className="size-7 rounded-md bg-[#1a1a1a] flex items-center justify-center text-[11px] font-mono text-muted-foreground"
                    >
                      {letter}
                    </div>
                  ))}
                </div>

                {/* Center */}
                <div className="p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1 rounded-md bg-[#1a1a1a] text-[11px] font-mono text-accent">index.ts</div>
                    <div className="px-3 py-1 rounded-md text-[11px] font-mono text-muted-foreground">browser</div>
                    <div className="px-3 py-1 rounded-md text-[11px] font-mono text-muted-foreground">dashboard</div>
                  </div>
                  <div className="flex-1 rounded-lg bg-[#111111] border border-border p-3 font-mono text-[11px] text-muted-foreground leading-relaxed">
                    <span className="text-[#c586c0]">export</span>{" "}
                    <span className="text-[#569cd6]">function</span>{" "}
                    <span className="text-[#dcdcaa]">main</span>
                    <span className="text-muted-foreground">() {"{"}</span>
                    <br />
                    <span className="ml-4 text-[#6a9955]">// your code here</span>
                    <br />
                    <span className="text-muted-foreground">{"}"}</span>
                  </div>
                </div>

                {/* Right panel */}
                <div className="border-l border-border p-3 w-44 row-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="size-1.5 rounded-full bg-accent" />
                    <span className="text-[11px] text-muted-foreground">Claude</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground space-y-1.5">
                    <p>Status: connected</p>
                    <p>MCPs: 4 active</p>
                    <p>Model: opus-4</p>
                  </div>
                </div>

                {/* Terminal */}
                <div className="border-t border-border p-3 font-mono text-[11px]">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-accent">~</span>
                    <span>pnpm run dev</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-[15px]">
              <div className="rounded-lg border border-border p-4">
                <h4 className="text-foreground font-semibold text-sm mb-1.5">Left Sidebar</h4>
                <p>File explorer + icon navigation for all panels (files, search, git, terminal, wallet).</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="text-foreground font-semibold text-sm mb-1.5">Center Area</h4>
                <p>Monaco editor with tabs. Browser and Dashboard are pinned as permanent tabs.</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="text-foreground font-semibold text-sm mb-1.5">Right Panel</h4>
                <p>Claude tab (status, MCPs, skills), Dashboard tab, and Sessions tab.</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="text-foreground font-semibold text-sm mb-1.5">Bottom Terminal</h4>
                <p>xterm.js terminal with multiple tabs and splits. Supports node-pty sessions per project.</p>
              </div>
            </div>

            <p className="text-[15px]">
              <strong className="text-foreground">Status bar</strong> runs
              along the bottom &mdash; shows git branch, market ticker, and wallet
              balance.
            </p>
          </div>
        </section>

        {/* ── Spawning AI Agents ───────────────────── */}
        <section>
          <SectionHeading id="agents" number="04" title="Spawning AI Agents" />
          <div className="mt-8 space-y-6 text-muted leading-relaxed">
            <div>
              <h3 className="text-foreground font-semibold text-sm mb-3">Agent Launcher</h3>
              <p className="text-[15px]">
                Open the Agent Launcher with <CodeBlock>Ctrl+Shift+A</CodeBlock>.
                Select a built-in agent or create a custom one with your own system
                prompt and model selection.
              </p>
            </div>

            <div>
              <h3 className="text-foreground font-semibold text-sm mb-3">Built-in Agents</h3>
              <div className="grid gap-2 sm:grid-cols-2 text-[15px]">
                {[
                  { name: "Debug", desc: "Trace errors and fix stack traces" },
                  { name: "Security Audit", desc: "Scan for vulnerabilities and exploits" },
                  { name: "Code Review", desc: "Review code quality and patterns" },
                  { name: "Git", desc: "Commit, branch, and PR management" },
                  { name: "Test Runner", desc: "Write and run test suites" },
                  { name: "Solana", desc: "On-chain interactions and program dev" },
                ].map((agent) => (
                  <div key={agent.name} className="flex items-start gap-2.5 rounded-lg border border-border p-3">
                    <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <div>
                      <span className="text-foreground font-medium">{agent.name}</span>
                      <span className="text-muted-foreground"> &mdash; {agent.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-foreground font-semibold text-sm mb-3">Grind Mode</h3>
              <p className="text-[15px]">
                Launch a 4-panel parallel agent grid with{" "}
                <CodeBlock>Ctrl+Shift+G</CodeBlock>. Each panel runs an
                independent Claude agent working on your codebase simultaneously.
              </p>
            </div>

            <div>
              <h3 className="text-foreground font-semibold text-sm mb-3">Custom Agents</h3>
              <p className="text-[15px]">
                Create agents with custom system prompts and model selection
                (Opus, Sonnet, Haiku). 41 pre-built Claude agents are also
                available for import from the Agent Launcher.
              </p>
            </div>
          </div>
        </section>

        {/* ── Solana Development ───────────────────── */}
        <section>
          <SectionHeading id="solana" number="05" title="Solana Development" />
          <div className="mt-8 space-y-6 text-muted leading-relaxed">
            <div className="grid gap-4 sm:grid-cols-2 text-[15px]">
              <div className="rounded-lg border border-border p-4 space-y-2">
                <h4 className="text-foreground font-semibold text-sm">Connect Wallet</h4>
                <p>Import an existing keypair (base58 private key) or generate a new wallet directly inside DAEMON.</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-2">
                <h4 className="text-foreground font-semibold text-sm">Launch Tokens</h4>
                <p>One-click token creation on PumpFun via the Launch Wizard. Set name, symbol, image, and socials.</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-2">
                <h4 className="text-foreground font-semibold text-sm">Import Tokens</h4>
                <p>Add existing tokens by mint address or scan your wallet to auto-detect all holdings.</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-2">
                <h4 className="text-foreground font-semibold text-sm">Dashboard</h4>
                <p>Real-time price, holder count, sparkline charts, and market cap for every tracked token.</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-2">
                <h4 className="text-foreground font-semibold text-sm">Jupiter Swaps</h4>
                <p>Swap tokens directly from the wallet panel using Jupiter aggregation for best routes.</p>
              </div>
              <div className="rounded-lg border border-border p-4 space-y-2">
                <h4 className="text-foreground font-semibold text-sm">Session Registry</h4>
                <p>On-chain proof of AI-assisted development. Records agent sessions to Solana for transparency.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Shortcuts ────────────────────────── */}
        <section>
          <SectionHeading id="shortcuts" number="06" title="Key Shortcuts" />
          <div className="mt-8">
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-[15px]">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left px-4 py-3 text-foreground font-semibold text-sm">Shortcut</th>
                    <th className="text-left px-4 py-3 text-foreground font-semibold text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shortcuts.map((s, i) => (
                    <tr
                      key={s.keys}
                      className={i < shortcuts.length - 1 ? "border-b border-border" : ""}
                    >
                      <td className="px-4 py-2.5">
                        <code className="px-2 py-0.5 rounded-md bg-[#1a1a1a] border border-border font-mono text-[13px] text-accent">
                          {s.keys}
                        </code>
                      </td>
                      <td className="px-4 py-2.5 text-muted">{s.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Troubleshooting ──────────────────────── */}
        <section>
          <SectionHeading id="troubleshooting" number="07" title="Troubleshooting" />
          <div className="mt-8 space-y-4">
            {[
              {
                problem: "Editor crash: \"Press Ctrl+K to access tools\"",
                solution:
                  "Click the Retry button in the error boundary. If the editor doesn't recover, close and reopen the tab. DAEMON wraps the Monaco editor in an ErrorBoundary that catches initialization failures.",
              },
              {
                problem: "Claude not connecting",
                solution:
                  "Open Settings > Integrations and verify the Claude CLI is installed and authenticated. Run `claude --version` in the terminal to confirm. Re-run OAuth sign-in if the session expired.",
              },
              {
                problem: "Terminal paste not working",
                solution:
                  "Right-click to paste in the terminal. The xterm.js terminal does not show a context menu — right-click triggers paste directly.",
              },
              {
                problem: "Missing tools or panels",
                solution:
                  "Check your Workspace Profile in Settings > Display. Some panels are only enabled for specific profiles (e.g., Wallet is Solana-only by default). Switch to Custom to enable everything.",
              },
            ].map((item) => (
              <div
                key={item.problem}
                className="rounded-lg border border-border p-4"
              >
                <h4 className="text-foreground font-semibold text-sm">{item.problem}</h4>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{item.solution}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
