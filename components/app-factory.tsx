"use client";

import { useMemo, useState } from "react";
import {
  Bot,
  Check,
  ChevronRight,
  Copy,
  Globe2,
  LayoutDashboard,
  Lock,
  Megaphone,
  MessageSquareText,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";

type SolanaProvider = {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect?: () => Promise<void>;
};

type WindowWithSolana = Window & {
  solana?: SolanaProvider;
};

const quickPrompts = [
  "Build my token a clean website with chart, socials, roadmap, and buy button.",
  "Create a holder dashboard with token stats, top holders, and community links.",
  "Generate a raid board and Telegram bot plan for my community.",
  "Create a token-gated page for holders with project updates and resources.",
];

const buildOptions = [
  { label: "Website", icon: Globe2 },
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Telegram bot", icon: Bot },
  { label: "Raid board", icon: Megaphone },
  { label: "Token gate", icon: Lock },
  { label: "Updates", icon: MessageSquareText },
];

const generatedModules = [
  "Hero section + token identity",
  "Chart and CA copy block",
  "Holder/community section",
  "Social links and buy routing",
  "Launch-ready project structure",
];

function shorten(address: string) {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function getSolanaProvider() {
  if (typeof window === "undefined") return undefined;
  return (window as WindowWithSolana).solana;
}

export function AppFactory() {
  const [wallet, setWallet] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [prompt, setPrompt] = useState(quickPrompts[0]);
  const [selected, setSelected] = useState("Website");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const canGenerate = tokenAddress.trim().length > 20 && prompt.trim().length > 12;

  const projectName = useMemo(() => {
    if (!tokenAddress.trim()) return "Your token";
    return `${tokenAddress.trim().slice(0, 4).toUpperCase()} Token`;
  }, [tokenAddress]);

  const handleConnect = async () => {
    const provider = getSolanaProvider();
    if (!provider) {
      window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
      return;
    }

    setConnecting(true);
    try {
      const response = await provider.connect();
      setWallet(response.publicKey.toString());
    } catch {
      // User rejected or wallet unavailable. Keep the UI calm.
    } finally {
      setConnecting(false);
    }
  };

  const handleGenerate = () => {
    if (!canGenerate) return;
    setGenerated(true);
  };

  const handleCopy = async () => {
    const text = `Token: ${tokenAddress}\nBuild type: ${selected}\nPrompt: ${prompt}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <section id="app-factory" className="relative py-28 md:py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 section-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_35%,rgba(62,207,142,0.08),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/8 text-[13px] text-accent mb-6">
              <Sparkles className="size-3.5" />
              App Factory preview
            </div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.035em] leading-[1.02] gradient-text">
              Turn a token CA
              <br />
              into a starting app.
            </h2>

            <p className="mt-6 text-[17px] md:text-lg text-muted leading-relaxed max-w-xl">
              The DAEMON website is becoming the front door for Solana communities. Connect a wallet, enter a token, describe what the project needs, and generate the first version of a website, dashboard, bot, raid board, or holder tool.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              {buildOptions.map((option) => {
                const Icon = option.icon;
                const active = selected === option.label;
                return (
                  <button
                    key={option.label}
                    onClick={() => setSelected(option.label)}
                    className={`group flex items-center gap-2 rounded-2xl border px-4 py-3 text-left transition-all ${
                      active
                        ? "border-accent/35 bg-accent/10 text-foreground"
                        : "border-white/[0.07] bg-white/[0.03] text-muted hover:text-foreground hover:border-white/15"
                    }`}
                  >
                    <Icon className={`size-4 ${active ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
                    <span className="text-[13px] font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-accent/5 rounded-[40px] blur-3xl" />
            <div className="relative rounded-[32px] border border-white/[0.08] bg-[#0d0d0d]/95 shadow-2xl shadow-black/40 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-white/[0.025]">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-red-400/70" />
                  <div className="size-2.5 rounded-full bg-yellow-400/70" />
                  <div className="size-2.5 rounded-full bg-accent/80" />
                </div>
                <div className="text-[12px] font-mono text-muted-foreground">daemon.app/factory</div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.18em] text-accent font-semibold mb-1">
                      What does your token need?
                    </p>
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">Generate a community tool</h3>
                  </div>
                  <button
                    onClick={handleConnect}
                    className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-muted hover:text-foreground hover:border-accent/30 transition-colors"
                  >
                    <Wallet className="size-4 text-accent" />
                    {wallet ? shorten(wallet) : connecting ? "Connecting" : "Connect"}
                  </button>
                </div>

                <label className="block text-[13px] text-muted mb-2">Token contract address</label>
                <input
                  value={tokenAddress}
                  onChange={(event) => {
                    setTokenAddress(event.target.value);
                    setGenerated(false);
                  }}
                  placeholder="Paste Solana token CA"
                  className="w-full rounded-2xl border border-white/[0.08] bg-black/35 px-4 py-3.5 font-mono text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent/40"
                />

                <label className="block text-[13px] text-muted mt-5 mb-2">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(event) => {
                    setPrompt(event.target.value);
                    setGenerated(false);
                  }}
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-white/[0.08] bg-black/35 px-4 py-3.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent/40 leading-relaxed"
                />

                <div className="mt-4 flex flex-wrap gap-2">
                  {quickPrompts.slice(1).map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setPrompt(item);
                        setGenerated(false);
                      }}
                      className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[12px] text-muted hover:text-foreground hover:border-accent/25 transition-colors"
                    >
                      {item.split(" ").slice(0, 4).join(" ")}...
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="group mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3.5 text-[15px] font-semibold text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
                >
                  <Zap className="size-4" />
                  Generate starting point
                  <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                <div className="mt-5 rounded-2xl border border-white/[0.07] bg-black/30 p-4 min-h-[210px]">
                  {!generated ? (
                    <div className="h-full min-h-[178px] flex flex-col items-center justify-center text-center px-6">
                      <Sparkles className="size-8 text-accent/70 mb-3" />
                      <p className="text-[14px] text-muted leading-relaxed max-w-sm">
                        Enter a CA and describe the tool. DAEMON will prepare a launch-ready blueprint that can be opened in the desktop app for deeper editing.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <p className="text-[12px] text-muted-foreground mb-1">Generated preview</p>
                          <h4 className="text-lg font-semibold tracking-[-0.02em]">{projectName} {selected}</h4>
                        </div>
                        <button
                          onClick={handleCopy}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5 text-[12px] text-muted hover:text-foreground hover:border-accent/25 transition-colors"
                        >
                          {copied ? <Check className="size-3.5 text-accent" /> : <Copy className="size-3.5" />}
                          {copied ? "Copied" : "Copy spec"}
                        </button>
                      </div>

                      <div className="grid gap-2.5">
                        {generatedModules.map((module) => (
                          <div key={module} className="flex items-center gap-3 rounded-xl bg-white/[0.035] px-3 py-2.5">
                            <Check className="size-4 text-accent" />
                            <span className="text-[13px] text-muted">{module}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <button className="flex-1 rounded-xl border border-accent/25 bg-accent/10 px-4 py-2.5 text-[13px] font-medium text-accent hover:bg-accent/15 transition-colors">
                          Open in DAEMON soon
                        </button>
                        <button className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[13px] font-medium text-muted hover:text-foreground transition-colors">
                          Export preview soon
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
