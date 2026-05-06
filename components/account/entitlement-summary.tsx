import type { AccessStatus } from "@/lib/access";

const TIER_LABEL = { signal: "Signal", vector: "Vector", apex: "Apex" } as const;

function formatAmount(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

function formatSource(source: AccessStatus["accessSource"]) {
  switch (source) {
    case "staking":
      return "via staking";
    case "holder":
      return "via holder status";
    case "payment":
      return "via paid subscription";
    default:
      return "no active path";
  }
}

export function EntitlementSummary({
  access,
  credits,
}: {
  access: AccessStatus;
  credits: { ai: number; automation: number } | null;
}) {
  const tier = access.staking.qualifiedTier;
  const nextTier = access.staking.tiers.find((t) => {
    if (!tier) return true;
    const order = { signal: 1, vector: 2, apex: 3 } as const;
    return order[t.id] > order[tier];
  });
  const stakedAmount = access.staking.currentAmount ?? 0;

  return (
    <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Entitlements</div>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <Stat
          label="Pro"
          value={access.active ? "Active" : "Inactive"}
          sub={formatSource(access.accessSource)}
        />
        <Stat
          label="Stake tier"
          value={tier ? TIER_LABEL[tier] : "Not staking"}
          sub={
            tier && nextTier
              ? `${formatAmount(stakedAmount)} staked → next ${TIER_LABEL[nextTier.id]} (${formatAmount(nextTier.thresholdAmount)})`
              : tier
                ? `${formatAmount(stakedAmount)} DAEMON staked`
                : access.staking.poolConfigured
                  ? "Stake on Streamflow to unlock"
                  : "Pool pending"
          }
        />
        <Stat
          label="Holder balance"
          value={`${formatAmount(access.holderStatus.currentAmount)} DAEMON`}
          sub={
            access.holderStatus.minAmount
              ? access.holderStatus.eligible
                ? `Above ${formatAmount(access.holderStatus.minAmount)} min`
                : `Below ${formatAmount(access.holderStatus.minAmount)} min`
              : "—"
          }
        />
        <Stat
          label="Credits"
          value={
            credits
              ? `${formatAmount(credits.ai)} AI`
              : "—"
          }
          sub={
            credits
              ? `${formatAmount(credits.automation)} automation`
              : "Backend pending"
          }
        />
      </div>
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-2 text-xl font-semibold tracking-tight">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted leading-5">{sub}</div>}
    </div>
  );
}
