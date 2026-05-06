"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";

export function BuilderClaimForm({ currentHandle }: { currentHandle: string | null }) {
  const router = useRouter();
  const [handle, setHandle] = useState(currentHandle ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setClaimed(false);
    try {
      const res = await fetch("/api/builders/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle }),
      });
      const body = (await res.json()) as { ok: boolean; error?: string };
      if (!body.ok) throw new Error(body.error ?? "Claim failed.");
      setClaimed(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Claim failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block">
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted">Handle</div>
        <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
          <div className="flex flex-1 items-center rounded-md border border-border bg-background/80 px-3">
            <span className="text-muted text-sm">/b/</span>
            <input
              required
              pattern="^[a-z0-9_]{3,24}$"
              value={handle}
              onChange={(e) => setHandle(e.target.value.toLowerCase())}
              placeholder="yourname"
              className="w-full bg-transparent px-2 py-2 text-sm text-foreground outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-[12px] font-semibold text-accent-foreground hover:brightness-110 disabled:opacity-70"
          >
            {busy && <Loader2 className="size-3.5 animate-spin" />}
            {currentHandle ? "Update handle" : "Claim handle"}
          </button>
        </div>
      </label>
      <p className="text-xs text-muted leading-5">
        3–24 chars, lowercase letters, numbers, underscore. Owned by your wallet.
      </p>
      {error && (
        <div className="rounded-md border border-red-500/25 bg-red-500/8 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}
      {claimed && (
        <div className="inline-flex items-center gap-2 rounded-md border border-accent/25 bg-accent/8 px-3 py-2 text-sm text-accent">
          <Check className="size-3.5" /> Handle saved.
        </div>
      )}
    </form>
  );
}
