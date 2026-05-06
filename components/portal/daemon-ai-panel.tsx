"use client";

import { Sparkles } from "lucide-react";
import type { AiRun, AiRunMode } from "@/lib/portal-store";
import { cn } from "@/lib/utils";

const MODES: Array<{ id: AiRunMode; label: string; cost: string }> = [
  { id: "fast", label: "Fast", cost: "Lower-cost quick answers" },
  { id: "builder", label: "Builder", cost: "Project and Solana workflows" },
  { id: "deep", label: "Deep", cost: "Long-form architecture runs" },
];

export function DaemonAiPanel({
  signedIn,
  credits,
  initialRuns,
}: {
  signedIn: boolean;
  credits: number;
  initialRuns: AiRun[];
}) {
  const runs = initialRuns;

  return (
    <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Daemon AI</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Hosted AI is coming soon</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Daemon AI will use the same credit balance as the desktop app, but provider-backed runs
            are paused until the hosted model budget is ready. Credits, staking discounts, and the
            payment rails can launch first.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-background/70 px-4 py-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-muted">AI Credits</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">
            {credits.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-background/70 p-4">
        <div className="inline-flex rounded-sm border border-accent/30 bg-accent/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
          Coming soon
        </div>
        <div className="mt-3 text-sm leading-6 text-muted">
          The first release will focus on DAEMON-specific help: Solana build planning, Forge package
          reviews, agent workflow design, and token utility strategy. Holder and staker tiers will
          control limits, priority, and credit discounts when the service goes live.
        </div>

        <div className="flex flex-wrap gap-2">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled
              className={cn(
                "mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-3 py-2 text-xs font-semibold text-muted opacity-80",
              )}
            >
              <Sparkles className="size-3.5" />
              {item.label}
              <span className="text-[10px] font-medium text-muted">{item.cost}</span>
            </button>
          ))}
        </div>

        <textarea
          disabled
          value=""
          placeholder="Daemon AI prompt box will unlock here when hosted runs are live."
          className="mt-4 min-h-32 w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm leading-6 text-muted outline-none placeholder:text-muted"
        />

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted">
            {signedIn
              ? "Your credits are ready for AI once hosted runs open."
              : "Sign in to track credits before Daemon AI opens."}
          </div>
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card/60 px-4 py-2 text-[12px] font-semibold text-muted"
          >
            Coming soon
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted">Recent runs</div>
        {runs.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-dashed border-border bg-background/40 p-6 text-center text-sm text-muted">
            No Daemon AI runs yet.
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {runs.map((run) => (
              <article key={run.id} className="rounded-2xl border border-border bg-background/70 p-4">
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-muted">
                  <span>{run.mode}</span>
                  <span>{run.status}</span>
                  <span>{run.creditsCharged.toLocaleString()} credits</span>
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">{run.prompt}</div>
                {run.response && (
                  <div className="mt-3 whitespace-pre-wrap rounded-xl border border-border bg-card/50 p-4 text-sm leading-6 text-muted">
                    {run.response}
                  </div>
                )}
                {run.error && <div className="mt-3 text-sm text-red-200">{run.error}</div>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
