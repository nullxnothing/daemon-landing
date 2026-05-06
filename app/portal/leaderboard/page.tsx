import Link from "next/link";
import { Star } from "lucide-react";
import { listBuilders, listForgeItems } from "@/lib/portal-store";

export const metadata = {
  title: "DAEMON Portal · Leaderboard",
};

export const dynamic = "force-dynamic";

const TIER_LABEL: Record<string, string> = {
  signal: "Signal",
  vector: "Vector",
  apex: "Apex",
};

export default async function LeaderboardPage() {
  const [builders, allItems] = await Promise.all([listBuilders(), listForgeItems()]);
  const itemCounts = new Map<string, number>();
  for (const item of allItems) {
    const key = item.creator.toLowerCase();
    itemCounts.set(key, (itemCounts.get(key) ?? 0) + 1);
  }

  return (
    <>
      <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8 shadow-[0_0_60px_rgba(62,207,142,0.06)]">
        <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Leaderboard</div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.05]">
          Top DAEMON builders.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted leading-6">
          Ranked by reputation, total installs, and shipped items. Reputation is earned by shipping
          Forge items, holding stake, and active community contribution.
        </p>
      </section>

      {builders.length === 0 ? (
        <section className="rounded-[28px] border border-dashed border-border bg-card/40 p-10 text-center">
          <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Empty</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">No builders yet</h2>
          <p className="mt-2 max-w-md mx-auto text-sm text-muted leading-6">
            The leaderboard fills as wallets claim handles and ship Forge items. Be the first
            from the{" "}
            <a href="/portal/builder" className="text-accent hover:underline">
              Builder tab
            </a>
            .
          </p>
        </section>
      ) : (
      <section className="rounded-[28px] border border-border bg-card/60 p-2 md:p-3">
        <div className="overflow-hidden rounded-2xl border border-border bg-background/60">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card/50">
              <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-muted">
                <th className="px-4 py-3 font-medium w-12">#</th>
                <th className="px-4 py-3 font-medium">Builder</th>
                <th className="px-4 py-3 font-medium">Tier</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Installs</th>
                <th className="px-4 py-3 font-medium text-right">Reputation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {builders.map((b, i) => {
                const itemCount = itemCounts.get(b.handle.toLowerCase()) ?? 0;
                return (
                  <tr key={b.handle} className="hover:bg-card/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted">{i + 1}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/b/${b.handle}`}
                        className="text-foreground hover:text-accent font-medium"
                      >
                        {b.displayName}
                      </Link>
                      <div className="text-xs text-muted line-clamp-1">{b.bio}</div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {b.tier ? (
                        <span className="rounded-sm border border-accent/30 bg-accent/10 px-1.5 py-0.5 uppercase tracking-[0.12em] text-[10px] text-accent">
                          {TIER_LABEL[b.tier]}
                        </span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-foreground">{itemCount}</td>
                    <td className="px-4 py-3 text-xs text-foreground">
                      {b.totalInstalls.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-right text-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3 text-accent" />
                        {b.reputation.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      )}
    </>
  );
}
