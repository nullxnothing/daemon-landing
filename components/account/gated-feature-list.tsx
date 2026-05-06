import { Check, Lock } from "lucide-react";
import type { AccessStatus } from "@/lib/access";
import {
  GATED_FEATURES,
  describeRequirement,
  meetsRequirement,
} from "@/lib/gated-features";

export function GatedFeatureList({ access }: { access: AccessStatus }) {
  const ctx = {
    isPro: access.active,
    isHolder: access.holderStatus.eligible,
    tier: access.staking.qualifiedTier,
  };

  return (
    <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Token-gated features
      </div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">
        What this wallet currently unlocks
      </h2>

      <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-background/60">
        {GATED_FEATURES.map((feat) => {
          const unlocked = meetsRequirement(feat.requires, ctx);
          return (
            <div
              key={feat.id}
              className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex size-7 items-center justify-center rounded-full ${
                    unlocked
                      ? "bg-accent/15 text-accent"
                      : "bg-background/80 text-muted"
                  }`}
                >
                  {unlocked ? <Check className="size-3.5" /> : <Lock className="size-3.5" />}
                </div>
                <div>
                  <div className="text-[15px] font-medium text-foreground">{feat.label}</div>
                  <div className="mt-0.5 text-sm text-muted leading-6">{feat.copy}</div>
                  {!unlocked && (
                    <div className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">
                      {describeRequirement(feat.requires)}
                    </div>
                  )}
                </div>
              </div>
              {unlocked && feat.cta && (
                <a
                  href={feat.cta.href}
                  target={feat.cta.external ? "_blank" : undefined}
                  rel={feat.cta.external ? "noreferrer" : undefined}
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent hover:bg-accent/15"
                >
                  {feat.cta.label}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
