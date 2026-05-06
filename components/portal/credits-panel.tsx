"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Check, Loader2 } from "lucide-react";
import type { CreditBundle } from "@/lib/portal-data";
import { cn } from "@/lib/utils";

const TIER_DISCOUNT: Record<string, number> = {
  apex: 0.2,
  vector: 0.1,
  signal: 0.05,
};

export function CreditsPanel({
  bundles,
  signedIn,
  tier,
}: {
  bundles: CreditBundle[];
  signedIn: boolean;
  tier: string | null;
}) {
  const router = useRouter();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const discount = tier ? TIER_DISCOUNT[tier] ?? 0 : 0;

  const buy = async (bundleId: string) => {
    if (!signedIn) {
      setError("Sign in on the Overview tab to buy credits.");
      return;
    }
    if (!publicKey) {
      setError("Connect the same wallet in the header before paying.");
      return;
    }
    setBusyId(bundleId);
    setError(null);
    setSuccess(null);
    try {
      const intentRes = await fetch("/api/credits/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bundleId }),
      });
      const intentBody = (await intentRes.json()) as
        | {
            ok: true;
            data: {
              intent: { id: string; chargedUsdc: number };
              payment: { transaction: string; amountUsdc: number };
            };
          }
        | { ok: false; error: string };
      if (!intentBody.ok) throw new Error(intentBody.error);

      const transaction = Transaction.from(base64ToBytes(intentBody.data.payment.transaction));
      const signature = await sendTransaction(transaction, connection);
      setSuccess("Payment sent. Confirming USDC transfer...");
      await connection.confirmTransaction(signature, "confirmed");

      const confirmRes = await fetch("/api/credits/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intentId: intentBody.data.intent.id, signature }),
      });
      const confirmBody = (await confirmRes.json()) as
        | { ok: true; data: { signature: string } }
        | { ok: false; error: string };
      if (!confirmBody.ok) throw new Error(confirmBody.error);

      setSuccess(`Paid ${intentBody.data.payment.amountUsdc} USDC. Credits added.`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Purchase failed.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Credit bundles</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">Buy in USDC, use anywhere</h2>
      <p className="mt-2 text-sm text-muted leading-6">
        One balance, used by Daemon AI conversations and background automation jobs across both the
        desktop app and the website.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {bundles.map((b) => {
          const final = +(b.priceUsdc * (1 - discount)).toFixed(2);
          return (
            <div
              key={b.id}
              className="flex flex-col rounded-2xl border border-border bg-background/70 p-5"
            >
              <div className="text-[11px] uppercase tracking-[0.16em] text-accent">{b.label}</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight">${final}</span>
                {discount > 0 && (
                  <span className="text-xs text-muted line-through">${b.priceUsdc}</span>
                )}
              </div>
              <div className="mt-3 space-y-1 text-sm text-foreground">
                <div>{b.aiCredits.toLocaleString()} AI credits</div>
                <div className="text-muted">{b.automationCredits.toLocaleString()} automation</div>
              </div>
              <div className="mt-3 text-xs text-muted leading-5">{b.bestFor}</div>
              <button
                type="button"
                onClick={() => void buy(b.id)}
                disabled={busyId !== null}
                className={cn(
                  "mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-[12px] font-semibold text-accent-foreground transition-all hover:brightness-110 disabled:opacity-70",
                  !signedIn && "opacity-70",
                )}
              >
                {busyId === b.id ? <Loader2 className="size-3.5 animate-spin" /> : null}
                {signedIn ? `Buy ${b.label}` : "Sign in to buy"}
              </button>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-accent/25 bg-accent/8 px-4 py-3 text-sm text-accent">
          <Check className="size-3.5" />
          {success}
        </div>
      )}
    </section>
  );
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
