import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

const sections = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", desc: "What is DAEMON and why it exists" },
      { label: "Installation", desc: "Download, prerequisites, and first launch" },
      { label: "Onboarding", desc: "Workspace profiles, Claude setup, integrations" },
    ],
  },
  {
    title: "Core Features",
    items: [
      { label: "UI Overview", desc: "Panel layout, sidebar, editor, terminal" },
      { label: "AI Agents", desc: "Agent launcher, built-in agents, custom agents" },
      { label: "Grind Mode", desc: "Multi-panel parallel agent execution" },
      { label: "Solana Development", desc: "Wallet, tokens, swaps, dashboard" },
    ],
  },
  {
    title: "Editor & Tools",
    items: [
      { label: "Monaco Editor & Terminal", desc: "Offline editor, real PTY terminal" },
      { label: "Git Integration", desc: "Visual git workflow" },
      { label: "Deployment", desc: "One-click Vercel and Railway deploys" },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "Architecture", desc: "Tech stack, IPC, process isolation" },
      { label: "Keyboard Shortcuts", desc: "Full shortcut reference" },
      { label: "Troubleshooting", desc: "Common issues and fixes" },
    ],
  },
];

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
            DAEMON Documentation
          </h1>
          <p className="mt-5 text-lg text-muted max-w-xl leading-relaxed">
            Everything you need to build on Solana&apos;s first IDE.
          </p>

          {/* GitBook link */}
          <a
            href="https://github.com/nullxnothing/daemon-landing/tree/main/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 mt-8 bg-foreground text-background px-5 py-3 rounded-xl font-medium text-[15px] transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <BookOpen className="size-[18px]" />
            Read the Full Docs
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </section>

      {/* Docs index */}
      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-12">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-accent text-[13px] font-medium tracking-wider uppercase mb-4">
              {section.title}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-[#222] hover:bg-card-hover"
                >
                  <h3 className="text-[15px] font-semibold text-foreground mb-1">
                    {item.label}
                  </h3>
                  <p className="text-[13px] text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
