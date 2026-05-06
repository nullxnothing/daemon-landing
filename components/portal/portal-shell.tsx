"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  Coins,
  Hammer,
  LayoutDashboard,
  Lock,
  Search,
  Trophy,
  UserSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabDef = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const TABS: TabDef[] = [
  { href: "/portal", label: "Overview", icon: LayoutDashboard },
  { href: "/portal/staking", label: "Staking", icon: Lock },
  { href: "/portal/credits", label: "Credits", icon: Coins },
  { href: "/portal/ai", label: "Daemon AI", icon: Bot },
  { href: "/portal/forge", label: "Forge", icon: Hammer },
  { href: "/portal/builder", label: "Builder", icon: UserSquare },
  { href: "/portal/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/portal/lookup", label: "Lookup", icon: Search },
];

export function PortalShell({
  wallet,
  tier,
  children,
}: {
  wallet: string | null;
  tier: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card/60 p-2">
          <div className="px-3 py-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted">Holder Portal</div>
            <div className="mt-2 text-sm font-semibold text-foreground">
              {wallet ? truncate(wallet) : "Not signed in"}
            </div>
            {tier && (
              <div className="mt-1.5 inline-flex items-center rounded-sm border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-accent">
                {tier}
              </div>
            )}
          </div>
          <nav className="mt-1 flex flex-col gap-0.5">
            {TABS.map((tab) => {
              const isActive =
                tab.href === "/portal"
                  ? pathname === "/portal"
                  : pathname.startsWith(tab.href);
              const Icon = tab.icon;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-card hover:text-foreground",
                  )}
                >
                  <Icon className="size-[14px]" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="min-w-0 space-y-6">{children}</div>
    </div>
  );
}

function truncate(addr: string) {
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}
