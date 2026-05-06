import { Coins, Sparkles, Zap } from "lucide-react";
import { CreditsPanel } from "@/components/portal/credits-panel";
import { CREDIT_BUNDLES } from "@/lib/portal-data";
import { getMe, type MePayload } from "@/lib/me";
import { getWalletState, type LedgerEntry } from "@/lib/portal-store";

export const metadata = {
  title: "DAEMON Portal · Credits",
  description: "AI and automation credit balances, USDC purchases, and ledger.",
};

export const dynamic = "force-dynamic";

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

export default async function PortalCreditsPage() {
  const me = await getMe();
  const balance = me?.credits ?? { ai: 0, automation: 0 };
  const tier = me?.access.staking.qualifiedTier ?? null;
  const ledger = me ? (await getWalletState(me.wallet)).ledger : [];

  return (
    <>
      <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8 shadow-[0_0_60px_rgba(62,207,142,0.06)]">
        <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Credits</div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.05]">
          AI and automation credits, paid in USDC.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted leading-6">
          Buy bundles with USDC, see live balances, and track every consumption event from Daemon
          AI runs and automation jobs. Apex and Vector stakers get bundle discounts.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <BalanceStat
            icon={<Sparkles className="size-4" />}
            label="AI credits"
            value={fmt(balance.ai)}
            sub="Used by Daemon AI conversations"
          />
          <BalanceStat
            icon={<Zap className="size-4" />}
            label="Automation credits"
            value={fmt(balance.automation)}
            sub="Used by background agent jobs"
          />
          <BalanceStat
            icon={<Coins className="size-4" />}
            label="Stake-tier discount"
            value={tierDiscount(tier)}
            sub={tier ? `${tierLabel(tier)} stakers` : "Stake to unlock"}
          />
        </div>
      </section>

      <CreditsPanel bundles={CREDIT_BUNDLES} signedIn={Boolean(me)} tier={tier} />

      <Ledger me={me} ledger={ledger} />
    </>
  );
}

function BalanceStat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4">
      <div className="inline-flex size-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/10 text-accent">
        {icon}
      </div>
      <div className="mt-3 text-[11px] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted leading-5">{sub}</div>
    </div>
  );
}

function Ledger({ me, ledger }: { me: MePayload | null; ledger: LedgerEntry[] }) {
  return (
    <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Ledger</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">Recent activity</h2>

      {!me ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-background/40 p-6 text-center text-sm text-muted leading-6">
          Sign in on the Overview tab to load your ledger.
        </div>
      ) : ledger.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-background/40 p-6 text-center text-sm text-muted leading-6">
          No activity yet. Buy a bundle above to start.
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background/60">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card/50">
              <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-muted">
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Kind</th>
                <th className="px-4 py-3 font-medium">AI</th>
                <th className="px-4 py-3 font-medium">Auto</th>
                <th className="px-4 py-3 font-medium text-right">USDC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ledger.slice(0, 25).map((e) => (
                <tr key={e.id} className="text-foreground">
                  <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">
                    {new Date(e.at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="inline-flex rounded-sm border border-border bg-background/60 px-2 py-0.5 uppercase tracking-[0.12em] text-[10px] text-muted">
                      {e.kind.replace("_", " ")}
                    </span>
                    <span className="ml-2 text-muted">{e.note}</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {e.aiDelta > 0 ? `+${fmt(e.aiDelta)}` : e.aiDelta || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {e.automationDelta > 0 ? `+${fmt(e.automationDelta)}` : e.automationDelta || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-right">${e.usdc.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function tierDiscount(tier: string | null) {
  if (tier === "apex") return "20% off";
  if (tier === "vector") return "10% off";
  if (tier === "signal") return "5% off";
  return "—";
}

function tierLabel(tier: string) {
  return tier[0].toUpperCase() + tier.slice(1);
}
