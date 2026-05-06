import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { ForgePurchaseButton } from "@/components/portal/forge-purchase-button";
import { findForgeItem } from "@/lib/portal-store";
import { getMe } from "@/lib/me";

export const dynamic = "force-dynamic";

const TIER_RANK: Record<string, number> = { signal: 1, vector: 2, apex: 3 };

export default async function ForgeItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await findForgeItem(slug);
  if (!item) notFound();

  const me = await getMe();
  const owned = me?.forge.owned.some((i) => i.slug === item.slug) ?? false;
  const userTier = me?.access.staking.qualifiedTier ?? null;
  const userRank = userTier ? TIER_RANK[userTier] : 0;
  const requiredRank = item.requiresTier ? TIER_RANK[item.requiresTier] : 0;
  const locked = item.requiresTier !== null && userRank < requiredRank;

  return (
    <>
      <Link
        href="/portal/forge"
        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Back to Forge
      </Link>

      <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-accent">
                {item.category}
              </span>
              {item.requiresTier && (
                <span className="inline-flex items-center rounded-full border border-yellow-300/25 bg-yellow-300/8 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-yellow-200">
                  Requires {item.requiresTier}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.05]">
              {item.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted leading-6">{item.tagline}</p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted">
              <Link
                href={`/b/${item.creator}`}
                className="text-foreground hover:text-accent"
              >
                by {item.creator}
              </Link>
              <span className="inline-flex items-center gap-1">
                <Star className="size-3 text-accent" /> {item.rating.toFixed(1)}
              </span>
              <span>{item.installs.toLocaleString()} installs</span>
              <span>v{item.version}</span>
              <span>updated {new Date(item.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl border border-border bg-background/70 p-5 min-w-[220px]">
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted">Price</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">
              {item.priceUsdc === 0 ? "Free" : `${item.priceUsdc} USDC`}
            </div>
            <div className="mt-4">
              <ForgePurchaseButton
                slug={item.slug}
                priceUsdc={item.priceUsdc}
                signedIn={Boolean(me)}
                alreadyOwned={owned}
                locked={locked}
                lockReason={
                  locked ? `Requires ${item.requiresTier} stake` : undefined
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
        <div className="text-[11px] uppercase tracking-[0.18em] text-accent">About</div>
        <p className="mt-3 text-[15px] text-foreground leading-7">{item.description}</p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {item.highlights.map((h) => (
            <div
              key={h}
              className="rounded-2xl border border-border bg-background/70 p-4 text-sm text-muted leading-6"
            >
              {h}
            </div>
          ))}
        </div>
      </section>

      {owned && (
        <section className="rounded-2xl border border-accent/25 bg-accent/8 p-5 text-sm text-accent">
          You own this item. Open in the desktop app to install:{" "}
          <a
            href={`daemon://forge/install?slug=${item.slug}`}
            className="font-semibold underline underline-offset-4"
          >
            daemon://forge/install?slug={item.slug}
          </a>
        </section>
      )}
    </>
  );
}
