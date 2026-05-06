"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Lock, Sparkles, Star } from "lucide-react";
import type { ForgeCategory, ForgeItem } from "@/lib/portal-data";
import { cn } from "@/lib/utils";

type Filter = "all" | ForgeCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "agent", label: "Agents" },
  { id: "plugin", label: "Plugins" },
  { id: "mcp", label: "MCP servers" },
  { id: "skill", label: "Skills" },
  { id: "automation", label: "Automation" },
];

const TIER_RANK: Record<string, number> = { signal: 1, vector: 2, apex: 3 };

export function ForgeGrid({
  items,
  ownedSlugs,
  userTier,
}: {
  items: ForgeItem[];
  ownedSlugs: string[];
  userTier: string | null;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const ownedSet = useMemo(() => new Set(ownedSlugs), [ownedSlugs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (filter !== "all" && i.category !== filter) return false;
      if (!q) return true;
      return (
        i.name.toLowerCase().includes(q) ||
        i.tagline.toLowerCase().includes(q) ||
        i.creator.toLowerCase().includes(q)
      );
    });
  }, [filter, query, items]);

  return (
    <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
                filter === f.id
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border bg-background/60 text-muted hover:border-accent/30 hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Forge…"
          className="w-full md:w-64 rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-foreground placeholder:text-muted outline-none focus:border-accent/50"
        />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => {
          const owned = ownedSet.has(item.slug);
          const requiresRank = item.requiresTier ? TIER_RANK[item.requiresTier] : 0;
          const userRank = userTier ? TIER_RANK[userTier] : 0;
          const locked = item.requiresTier !== null && userRank < requiresRank;
          return (
            <Link
              key={item.slug}
              href={`/portal/forge/${item.slug}`}
              className="group rounded-2xl border border-border bg-background/70 p-5 transition-colors hover:border-accent/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-accent">
                    {item.category}
                  </div>
                  <div className="mt-1 text-base font-semibold tracking-tight text-foreground">
                    {item.name}
                  </div>
                </div>
                {owned ? (
                  <span className="inline-flex items-center gap-1 rounded-sm border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-accent">
                    <Sparkles className="size-3" /> Owned
                  </span>
                ) : locked ? (
                  <span className="inline-flex items-center gap-1 rounded-sm border border-yellow-300/25 bg-yellow-300/8 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-yellow-200">
                    <Lock className="size-3" /> {item.requiresTier}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-muted leading-6">{item.tagline}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>by {item.creator}</span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3 text-accent" />
                    {item.rating.toFixed(1)}
                  </span>
                  <span>{item.installs.toLocaleString()} installs</span>
                </span>
              </div>
              <div className="mt-3 text-sm font-semibold text-foreground">
                {item.priceUsdc === 0 ? "Free" : `${item.priceUsdc} USDC`}
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-dashed border-border bg-background/40 p-8 text-center text-sm text-muted">
            No items match.
          </div>
        )}
      </div>
    </section>
  );
}
