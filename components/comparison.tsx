"use client";

import { Check, X, Minus } from "lucide-react";

type Support = "yes" | "no" | "partial";

interface Feature {
  name: string;
  daemon: Support;
  vscode: Support;
  cursor: Support;
  note?: string;
}

const features: Feature[] = [
  { name: "Built for Solana", daemon: "yes", vscode: "no", cursor: "no" },
  { name: "Native AI agent spawning", daemon: "yes", vscode: "no", cursor: "partial", note: "Cursor has AI, but no agent spawning" },
  { name: "Built-in Solana wallet", daemon: "yes", vscode: "no", cursor: "no" },
  { name: "Live portfolio tracking", daemon: "yes", vscode: "no", cursor: "no" },
  { name: "MCP server management", daemon: "yes", vscode: "no", cursor: "no" },
  { name: "On-chain session registry", daemon: "yes", vscode: "no", cursor: "no" },
  { name: "Integrated PumpFun launches", daemon: "yes", vscode: "no", cursor: "no" },
  { name: "Real PTY terminals", daemon: "yes", vscode: "yes", cursor: "yes" },
  { name: "Offline Monaco editor", daemon: "yes", vscode: "partial", cursor: "partial", note: "VS Code/Cursor phone home" },
  { name: "Zero extensions needed", daemon: "yes", vscode: "no", cursor: "partial" },
  { name: "No subscription required", daemon: "yes", vscode: "yes", cursor: "no" },
  { name: "Not a VS Code fork", daemon: "yes", vscode: "yes", cursor: "no" },
];

function Icon({ support }: { support: Support }) {
  if (support === "yes") {
    return (
      <span className="inline-flex items-center justify-center size-6 rounded-full bg-accent/15">
        <Check className="size-3.5 text-accent" strokeWidth={3} />
      </span>
    );
  }
  if (support === "partial") {
    return (
      <span className="inline-flex items-center justify-center size-6 rounded-full bg-amber-500/15">
        <Minus className="size-3.5 text-amber-400" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center size-6 rounded-full bg-red-500/10">
      <X className="size-3.5 text-red-400/70" strokeWidth={3} />
    </span>
  );
}

export function Comparison() {
  return (
    <section id="comparison" className="relative py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase mb-5">
            Comparison
          </p>
          <h2 className="text-4xl md:text-[3.25rem] font-bold tracking-[-0.02em] leading-[1.1] gradient-text text-balance">
            Why DAEMON?
          </h2>
          <p className="mt-6 text-[17px] text-muted leading-relaxed max-w-lg mx-auto">
            One purpose-built app vs. a general-purpose editor held together by extensions.
          </p>
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl overflow-hidden card-premium">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-[11px] font-semibold text-muted-foreground/80 px-6 py-4 uppercase tracking-[0.15em] min-w-[200px]">
                    Feature
                  </th>
                  <th className="text-center text-[13px] font-bold text-accent px-6 py-4 tracking-[-0.01em] min-w-[100px]">
                    DAEMON
                  </th>
                  <th className="text-center text-[11px] font-semibold text-muted-foreground/80 px-6 py-4 uppercase tracking-[0.15em] min-w-[100px]">
                    VS Code
                  </th>
                  <th className="text-center text-[11px] font-semibold text-muted-foreground/80 px-6 py-4 uppercase tracking-[0.15em] min-w-[100px]">
                    Cursor
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={feature.name}
                    className={`border-b border-white/[0.03] last:border-0 transition-colors hover:bg-white/[0.02] ${
                      index % 2 === 0 ? "" : "bg-white/[0.01]"
                    }`}
                  >
                    <td className="px-6 py-3.5 text-[13px] text-foreground">
                      {feature.name}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-flex justify-center">
                        <Icon support={feature.daemon} />
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-flex justify-center">
                        <Icon support={feature.vscode} />
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <span className="inline-flex justify-center">
                        <Icon support={feature.cursor} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom callouts */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className="p-6 rounded-2xl card-premium">
            <p className="text-accent font-mono text-[13px] font-semibold mb-2">DAEMON</p>
            <p className="text-[13px] text-muted leading-[1.7]">
              Purpose-built for Solana. Wallet, agents, token launches, and deploys ship as first-class features, not afterthoughts.
            </p>
          </div>
          <div className="p-6 rounded-2xl card-premium">
            <p className="text-muted-foreground font-mono text-[13px] font-semibold mb-2">VS Code</p>
            <p className="text-[13px] text-muted leading-[1.7]">
              General-purpose editor. Requires 10+ extensions for comparable Solana workflow. Extensions can conflict and degrade performance.
            </p>
          </div>
          <div className="p-6 rounded-2xl card-premium">
            <p className="text-muted-foreground font-mono text-[13px] font-semibold mb-2">Cursor</p>
            <p className="text-[13px] text-muted leading-[1.7]">
              AI-focused but VS Code fork. No wallet, no on-chain integration, no Solana tooling. Subscription required for AI features.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
