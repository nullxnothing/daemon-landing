import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { TierLadder } from "@/components/account/tier-ladder";
import { GatedFeatureList } from "@/components/account/gated-feature-list";
import { EntitlementSummary } from "@/components/account/entitlement-summary";
import { getAccessConfig, type AccessStatus } from "@/lib/access";
import { getMe } from "@/lib/me";

export const metadata = {
  title: "DAEMON Portal · Staking",
  description:
    "Stake DAEMON on Streamflow to unlock Signal, Vector, and Apex tiers.",
};

export const dynamic = "force-dynamic";

function fallbackAccess(config: Awaited<ReturnType<typeof getAccessConfig>>): AccessStatus {
  return {
    wallet: "",
    active: false,
    accessSource: null,
    holderStatus: {
      enabled: false,
      eligible: false,
      currentAmount: null,
      minAmount: null,
      symbol: "DAEMON",
    },
    staking: {
      provider: "streamflow",
      available: true,
      poolConfigured: config.poolConfigured,
      entitlementReady: config.poolConfigured,
      poolAddress: config.streamflowPoolAddress,
      streamflowUrl: config.streamflowUrl,
      tokenMint: config.tokenMint,
      currentAmount: null,
      activeEntries: 0,
      qualified: false,
      qualifiedTier: null,
      tiers: config.tiers.map(({ id, label, summary, thresholdAmount, status }) => ({
        id,
        label,
        summary,
        thresholdAmount,
        status,
      })),
      minAmount: null,
      error: null,
    },
  };
}

export default async function PortalStakingPage() {
  const [config, me] = await Promise.all([getAccessConfig(), getMe()]);
  const access = me?.access ?? fallbackAccess(config);

  return (
    <>
      <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8 shadow-[0_0_60px_rgba(62,207,142,0.06)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-accent">
          Staking
        </div>
        <h1 className="mt-4 max-w-3xl text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.05]">
          Stake DAEMON, unlock the supporter tiers.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted leading-6">
          Streamflow handles the on-chain lockup. The portal reads your stake live and unlocks the
          right tier across Pro, priority queues, and gated features.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={config.streamflowUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[12px] font-semibold text-accent-foreground hover:brightness-110 transition-all"
          >
            Stake on Streamflow
            <ExternalLink className="size-3.5" />
          </a>
          {!me && (
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white/5 px-3.5 py-2 text-[12px] text-muted hover:text-foreground hover:border-accent/30 transition-colors"
            >
              Sign in to portal
              <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-3">
          <UtilityCard
            icon={<ShieldCheck className="size-4" />}
            title="Pro via staking"
            copy="Stake at any tier and Pro stays active for as long as you're staked."
          />
          <UtilityCard
            icon={<Zap className="size-4" />}
            title="Priority on launches"
            copy="Vector and Apex move first when scarce demos and partner activations open."
          />
          <UtilityCard
            icon={<Sparkles className="size-4" />}
            title="Visible status"
            copy="Carry Signal, Vector, or Apex status across community surfaces."
          />
        </div>
      </section>

      {me && <EntitlementSummary access={me.access} credits={me.credits} />}
      <TierLadder access={access} />
      {me && <GatedFeatureList access={me.access} />}
    </>
  );
}

function UtilityCard({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4">
      <div className="inline-flex size-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="mt-3 text-base font-semibold">{title}</h3>
      <p className="mt-1.5 text-xs text-muted leading-5">{copy}</p>
    </div>
  );
}
