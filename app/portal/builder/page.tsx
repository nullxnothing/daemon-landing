import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { BuilderClaimForm } from "@/components/portal/builder-claim";
import { getMe } from "@/lib/me";
import { getBuilder, itemsByCreator } from "@/lib/portal-store";

export const metadata = {
  title: "DAEMON Portal · Builder",
};

export const dynamic = "force-dynamic";

export default async function PortalBuilderPage() {
  const me = await getMe();
  const handle = me?.builder?.handle ?? null;
  const profile = handle ? await getBuilder(handle) : null;
  const shipped = handle ? await itemsByCreator(handle) : [];

  return (
    <>
      <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8 shadow-[0_0_60px_rgba(62,207,142,0.06)]">
        <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Builder</div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.05]">
          {handle ? `Hi, ${handle}.` : "Claim your builder handle."}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted leading-6">
          Your wallet-signed handle. It owns your Forge listings, public profile, reputation, and
          USDC earnings. Transfer requires the same wallet.
        </p>
      </section>

      {!me ? (
        <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8 text-sm text-muted">
          Sign in on the{" "}
          <Link href="/portal" className="text-accent">
            Overview tab
          </Link>{" "}
          to claim a handle.
        </section>
      ) : (
        <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
          <BuilderClaimForm currentHandle={handle} />
        </section>
      )}

      {profile && handle && (
        <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Profile</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{profile.displayName}</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted leading-6">{profile.bio}</p>
            </div>
            <Link
              href={`/b/${handle}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white/5 px-3.5 py-2 text-[12px] text-muted hover:text-foreground hover:border-accent/30 transition-colors"
            >
              View public page
              <ExternalLink className="size-3.5" />
            </Link>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Stat label="Items shipped" value={shipped.length.toString()} />
            <Stat
              label="Total installs"
              value={shipped.reduce((s, i) => s + i.installs, 0).toLocaleString()}
            />
            <Stat label="Reputation" value={profile.reputation.toLocaleString()} />
            <Stat
              label="Earnings"
              value={`$${profile.earningsUsdc.toLocaleString()}`}
              sub="USDC, lifetime"
            />
          </div>
        </section>
      )}

      {handle && (
        <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Your items</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Forge listings under {handle}
              </h2>
            </div>
            <Link
              href="/portal/forge/publish"
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[12px] font-semibold text-accent-foreground hover:brightness-110 transition-all"
            >
              Publish new
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {shipped.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-border bg-background/40 p-6 text-center text-sm text-muted">
              No listings yet. Publish your first item.
            </div>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {shipped.map((i) => (
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
                  <div className="mt-3 flex items-center justify-between text-xs text-muted">
                    <span>{i.installs.toLocaleString()} installs</span>
                    <span className="text-foreground font-semibold">
                      {i.priceUsdc === 0 ? "Free" : `${i.priceUsdc} USDC`}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-2 text-xl font-semibold tracking-tight text-foreground">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
    </div>
  );
}
