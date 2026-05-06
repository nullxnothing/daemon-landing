import { Bot, Coins, Zap } from "lucide-react";
import { DaemonAiPanel } from "@/components/portal/daemon-ai-panel";
import { getMe } from "@/lib/me";
import { listAiRuns } from "@/lib/portal-store";

export const metadata = {
  title: "DAEMON Portal · Daemon AI",
  description: "Upcoming hosted Daemon AI runs powered by shared AI credits.",
};

export const dynamic = "force-dynamic";

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

export default async function PortalAiPage() {
  const me = await getMe();
  const runs = me ? await listAiRuns(me.wallet) : [];

  return (
    <>
      <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8 shadow-[0_0_60px_rgba(62,207,142,0.06)]">
        <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Daemon AI</div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.05]">
          Hosted AI for DAEMON builders is coming soon.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted leading-6">
          Credits and staking tiers are being prepared first. Daemon AI will unlock as a
          DAEMON-native assistant for build planning, Solana workflows, token utility design, Forge
          packaging, and agent operations once the hosted model budget is ready.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Stat
            icon={<Coins className="size-4" />}
            label="Available credits"
            value={fmt(me?.credits.ai ?? 0)}
            sub="Shared between portal and app"
          />
          <Stat
            icon={<Bot className="size-4" />}
            label="Run modes"
            value="Soon"
            sub="Fast, Builder, and Deep"
          />
          <Stat
            icon={<Zap className="size-4" />}
            label="Staker boost"
            value={me?.access.staking.qualifiedTier ? "Active" : "Locked"}
            sub="Priority queue comes next"
          />
        </div>
      </section>

      <DaemonAiPanel
        signedIn={Boolean(me)}
        credits={me?.credits.ai ?? 0}
        initialRuns={runs}
      />
    </>
  );
}

function Stat({
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
