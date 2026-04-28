"use client";

import { useState } from "react";

type AccessTierId = "signal" | "vector" | "apex";

type AccessStatusResponse = {
  wallet: string;
  active: boolean;
  accessSource: "payment" | "holder" | "staking" | null;
  holderStatus: {
    enabled: boolean;
    eligible: boolean;
    currentAmount: number | null;
    minAmount: number | null;
    symbol: string;
  };
  staking: {
    provider: "streamflow";
    available: boolean;
    poolConfigured: boolean;
    entitlementReady: boolean;
    poolAddress: string | null;
    streamflowUrl: string;
    tokenMint: string | null;
    currentAmount: number | null;
    activeEntries: number;
    qualified: boolean;
    qualifiedTier: AccessTierId | null;
    tiers: Array<{
      id: AccessTierId;
      label: string;
      summary: string;
      thresholdAmount: number;
      status: "live" | "planned";
    }>;
    minAmount: number | null;
    error: string | null;
  };
};

export function AccessStatusChecker() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<AccessStatusResponse | null>(null);
  const qualifiedTier = status?.staking.tiers.find(
    (tier) => tier.id === status.staking.qualifiedTier,
  );

  const handleCheck = async () => {
    if (!wallet.trim()) {
      setError("Enter a Solana wallet address to check access.");
      setStatus(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/access/status?wallet=${encodeURIComponent(wallet.trim())}`, {
        method: "GET",
      });
      const body = (await res.json()) as
        | { ok: true; data: AccessStatusResponse }
        | { ok: false; error: string };

      if (!body.ok) {
        setError(body.error);
        setStatus(null);
        return;
      }

      setStatus(body.data);
    } catch {
      setError("Access status check failed.");
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Wallet access check
      </div>
      <h3 className="mt-3 text-2xl font-semibold leading-tight">
        Check current DAEMON access by wallet
      </h3>
      <p className="mt-3 max-w-2xl text-[15px] text-muted leading-7">
        This checks the live DAEMON Pro backend for current paid or holder access, then overlays
        the configured Streamflow pool to see whether the wallet already qualifies through staking.
      </p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <input
          value={wallet}
          onChange={(event) => setWallet(event.target.value)}
          placeholder="Paste Solana wallet address"
          className="w-full rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent/50"
        />
        <button
          onClick={() => {
            void handleCheck();
          }}
          disabled={loading}
          className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Checking..." : "Check access"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {status && (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatusCard
            label="Current source"
            value={
              status.accessSource === "holder"
                ? "Holder"
                : status.accessSource === "payment"
                  ? "Paid"
                  : status.accessSource === "staking"
                    ? "Staking"
                    : "None"
            }
          />
          <StatusCard
            label="Current DAEMON"
            value={formatAmount(status.holderStatus.currentAmount)}
          />
          <StatusCard
            label="Holder threshold"
            value={formatAmount(status.holderStatus.minAmount)}
          />
          <StatusCard
            label="Staked DAEMON"
            value={formatAmount(status.staking.currentAmount)}
          />
          <StatusCard
            label="Stake tier"
            value={
              qualifiedTier
                ? qualifiedTier.label
                : status.staking.poolConfigured
                  ? "Not qualified"
                  : "Pool not set"
            }
          />
          <StatusCard label="Stake entries" value={String(status.staking.activeEntries)} />
        </div>
      )}

      {status && (
        <div className="mt-4 rounded-2xl border border-border bg-background/60 px-4 py-4 text-sm text-muted leading-7">
          {status.staking.qualified
            ? `This wallet qualifies for ${qualifiedTier?.label ?? "staking"} access through Streamflow. ${qualifiedTier?.summary ?? ""}`
            : status.active
            ? "This wallet already has an active DAEMON access path."
            : status.holderStatus.eligible
              ? "This wallet qualifies for live holder access in DAEMON today."
              : "This wallet does not currently qualify for holder access. The base DAEMON app remains free; staking is intended as an optional upgrade path."}
        </div>
      )}

      {status?.staking.error && (
        <div className="mt-4 rounded-2xl border border-yellow-500/25 bg-yellow-500/8 px-4 py-3 text-sm text-yellow-100">
          Streamflow lookup error: {status.staking.error}
        </div>
      )}

      {status && status.staking.poolConfigured && (
        <div className="mt-4 rounded-2xl border border-border bg-background/60 px-4 py-4 text-sm text-muted leading-7">
          <div>
            Streamflow pool:{" "}
            <a
              href={status.staking.streamflowUrl}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              open staking page
            </a>
          </div>
          <div className="mt-1">Pool address: {status.staking.poolAddress ?? "Unavailable"}</div>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {status.staking.tiers.map((tier) => (
              <div key={tier.id} className="rounded-xl border border-border bg-card/50 px-3 py-3">
                <div className="text-[11px] uppercase tracking-[0.14em] text-accent">
                  {tier.label}
                </div>
                <div className="mt-1 text-foreground">
                  {formatAmount(tier.thresholdAmount)} DAEMON
                </div>
                <div className="mt-1 text-xs text-muted">{tier.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 px-4 py-4">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-3 text-lg font-semibold text-foreground">{value}</div>
    </div>
  );
}

function formatAmount(value: number | null) {
  if (value === null) return "Unavailable";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}
