import Link from "next/link";
import { ArrowRight, Hammer } from "lucide-react";
import { ForgeGrid } from "@/components/portal/forge-grid";
import { listForgeItems } from "@/lib/portal-store";
import { getMe } from "@/lib/me";

export const metadata = {
  title: "DAEMON Portal · Forge",
  description: "Marketplace for DAEMON agents, plugins, MCP servers, skills, and automation packs.",
};

export const dynamic = "force-dynamic";

export default async function PortalForgePage() {
  const me = await getMe();
  const ownedSlugs = me?.forge.owned.map((i) => i.slug) ?? [];
  const tier = me?.access.staking.qualifiedTier ?? null;
  const items = await listForgeItems();

  return (
    <>
      <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8 shadow-[0_0_60px_rgba(62,207,142,0.06)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Forge</div>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.05]">
              Agents, plugins, MCP, skills, automation.
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted leading-6">
              Install once on the website, use across the desktop app. Tier-gated items unlock as
              you stake. Creators publish here and earn USDC on every install.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/portal/forge/publish"
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[12px] font-semibold text-accent-foreground hover:brightness-110 transition-all"
            >
              <Hammer className="size-3.5" />
              Publish to Forge
            </Link>
            <Link
              href="/portal/builder"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white/5 px-3.5 py-2 text-[12px] text-muted hover:text-foreground hover:border-accent/30 transition-colors"
            >
              Builder profile
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="rounded-[28px] border border-dashed border-border bg-card/40 p-10 text-center">
          <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Empty</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">No listings yet</h2>
          <p className="mt-2 max-w-md mx-auto text-sm text-muted leading-6">
            The Forge is open. Be the first to publish an agent, plugin, MCP server, skill, or
            automation pack.
          </p>
          <Link
            href="/portal/forge/publish"
            className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-[12px] font-semibold text-accent-foreground hover:brightness-110"
          >
            <Hammer className="size-3.5" />
            Publish first listing
          </Link>
        </section>
      ) : (
        <ForgeGrid items={items} ownedSlugs={ownedSlugs} userTier={tier} />
      )}
    </>
  );
}
