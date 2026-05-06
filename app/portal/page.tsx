import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { EntitlementSummary } from "@/components/account/entitlement-summary";
import { TierLadder } from "@/components/account/tier-ladder";
import { GatedFeatureList } from "@/components/account/gated-feature-list";
import { DashboardSignIn } from "@/components/account/dashboard-sign-in";
import { getMe } from "@/lib/me";
import { getAccessConfig } from "@/lib/access";

export const metadata = {
  title: "DAEMON Portal",
  description:
    "Holder portal for DAEMON. Pro status, stake tier, holder balance, AI credits, and unlocks.",
};

export const dynamic = "force-dynamic";

export default async function PortalOverviewPage() {
  const [me, config] = await Promise.all([getMe(), getAccessConfig()]);

  if (!me) {
    return <DashboardSignIn streamflowUrl={config.streamflowUrl} />;
  }

  return (
    <>
      <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8 shadow-[0_0_60px_rgba(62,207,142,0.06)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Overview</div>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1]">
              Welcome back.
            </h1>
            <p className="mt-2 font-mono text-xs text-muted">{me.wallet}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/portal/staking"
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[12px] font-semibold text-accent-foreground hover:brightness-110 transition-all"
            >
              Manage staking
              <ArrowRight className="size-3.5" />
            </Link>
            <a
              href={config.streamflowUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white/5 px-3.5 py-2 text-[12px] text-muted hover:text-foreground hover:border-accent/30 transition-colors"
            >
              Streamflow
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      <EntitlementSummary access={me.access} credits={me.credits} />
      <TierLadder access={me.access} />
      <GatedFeatureList access={me.access} />

      <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Owned Forge items</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {me.forge.ownedCount === 0
                ? "Nothing installed yet"
                : `${me.forge.ownedCount} installed`}
            </h2>
          </div>
          <Link
            href="/portal/forge"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white/5 px-3.5 py-2 text-[12px] text-muted hover:text-foreground hover:border-accent/30"
          >
            Browse Forge
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {me.forge.owned.length === 0 ? (
          <p className="mt-4 text-sm text-muted leading-6">
            Install agents, plugins, MCP servers, skills, and automation packs from the Forge tab.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {me.forge.owned.map((i) => (
              <Link
                key={i.slug}
                href={`/portal/forge/${i.slug}`}
                className="rounded-2xl border border-border bg-background/70 p-4 hover:border-accent/30 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.16em] text-accent">
                  {i.category}
                </div>
                <div className="mt-1 text-base font-semibold text-foreground">{i.name}</div>
                <div className="mt-1.5 text-xs text-muted leading-5">{i.tagline}</div>
                <div className="mt-3 text-xs text-muted">v{i.version} · by {i.creator}</div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Builder profile</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              {me.builder?.handle ? `/b/${me.builder.handle}` : "No public handle yet"}
            </h2>
          </div>
          <Link
            href="/portal/builder"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white/5 px-3.5 py-2 text-[12px] text-muted hover:text-foreground hover:border-accent/30"
          >
            {me.builder?.handle ? "Manage profile" : "Claim handle"}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {me.builder?.handle && (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-muted">Reputation</div>
              <div className="mt-2 text-xl font-semibold text-foreground">
                {me.builder.reputation.toLocaleString()}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-muted">Earnings</div>
              <div className="mt-2 text-xl font-semibold text-foreground">
                ${me.builder.earnings.toLocaleString()} USDC
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
