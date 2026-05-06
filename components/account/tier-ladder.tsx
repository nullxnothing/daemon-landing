import type { AccessStatus, AccessTierId } from "@/lib/access";

const TIER_ORDER: Record<AccessTierId, number> = { signal: 1, vector: 2, apex: 3 };

function formatAmount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function TierLadder({ access }: { access: AccessStatus }) {
  const current = access.staking.qualifiedTier;
  const currentRank = current ? TIER_ORDER[current] : 0;

  return (
    <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Tier ladder</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            One staking model. Three live supporter tiers.
          </h2>
        </div>
        {access.staking.poolAddress && (
          <div className="hidden md:block text-xs text-muted">
            Pool {access.staking.poolAddress.slice(0, 6)}…{access.staking.poolAddress.slice(-4)}
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {access.staking.tiers.map((tier) => {
          const reached = TIER_ORDER[tier.id] <= currentRank;
          const isCurrent = tier.id === current;
          return (
            <div
              key={tier.id}
              className={`rounded-[22px] border p-5 transition-colors ${
                reached
                  ? "border-accent/40 bg-accent/8"
                  : "border-border bg-background/70"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold tracking-tight">{tier.label}</div>
                  <div className="mt-1 text-xs text-muted">
                    {formatAmount(tier.thresholdAmount)} DAEMON
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] ${
                    isCurrent
                      ? "border border-accent/40 bg-accent/15 text-accent"
                      : reached
                        ? "border border-accent/25 bg-accent/8 text-accent"
                        : "border border-border bg-background/60 text-muted"
                  }`}
                >
                  {isCurrent ? "Current" : reached ? "Cleared" : "Locked"}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted leading-6">{tier.summary}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
