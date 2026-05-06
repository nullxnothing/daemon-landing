"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";

export function ForgePurchaseButton({
  slug,
  priceUsdc,
  signedIn,
  alreadyOwned,
  locked,
  lockReason,
}: {
  slug: string;
  priceUsdc: number;
  signedIn: boolean;
  alreadyOwned: boolean;
  locked: boolean;
  lockReason?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (alreadyOwned) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center justify-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-4 py-2 text-[12px] font-semibold text-accent"
      >
        <Check className="size-3.5" /> Already owned
      </button>
    );
  }

  if (!signedIn) {
    return (
      <a
        href="/portal"
        className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-[12px] font-semibold text-accent-foreground hover:brightness-110"
      >
        Sign in to install
      </a>
    );
  }

  if (locked) {
    return (
      <button
        type="button"
        disabled
        title={lockReason}
        className="inline-flex items-center justify-center rounded-md border border-yellow-300/30 bg-yellow-300/8 px-4 py-2 text-[12px] font-semibold text-yellow-200 cursor-not-allowed"
      >
        {lockReason ?? "Locked"}
      </button>
    );
  }

  const buy = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/forge/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const body = (await res.json()) as { ok: boolean; error?: string };
      if (!body.ok) throw new Error(body.error ?? "Purchase failed.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Purchase failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={() => void buy()}
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-[12px] font-semibold text-accent-foreground hover:brightness-110 disabled:opacity-70"
      >
        {busy && <Loader2 className="size-3.5 animate-spin" />}
        {priceUsdc === 0 ? "Install (Free)" : `Buy for ${priceUsdc} USDC`}
      </button>
      {error && <span className="text-xs text-red-200">{error}</span>}
    </div>
  );
}
