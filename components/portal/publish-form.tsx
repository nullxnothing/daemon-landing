"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

const CATEGORIES = ["agent", "plugin", "mcp", "skill", "automation"] as const;

export function PublishForm({ disabledReason }: { disabledReason?: string }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("plugin");
  const [description, setDescription] = useState("");
  const [priceUsdc, setPriceUsdc] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/forge/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, description, priceUsdc }),
      });
      const body = (await res.json()) as
        | { ok: true; data: { id: string } }
        | { ok: false; error: string };
      if (!body.ok) throw new Error(body.error);
      setSubmittedId(body.data.id);
      setName("");
      setDescription("");
      setPriceUsdc(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setBusy(false);
    }
  };

  if (disabledReason) {
    return (
      <div className="rounded-2xl border border-yellow-300/25 bg-yellow-300/8 p-5 text-sm text-yellow-100 leading-6">
        {disabledReason}
      </div>
    );
  }

  if (submittedId) {
    return (
      <div className="rounded-2xl border border-accent/25 bg-accent/8 p-5 text-sm text-accent leading-6">
        <div className="inline-flex items-center gap-2 font-semibold">
          <Check className="size-4" /> Submitted for review
        </div>
        <div className="mt-2 text-foreground/80">
          Submission ID <span className="font-mono text-xs">{submittedId}</span>. We&apos;ll review,
          test the install, and approve onto the public Forge.
        </div>
        <button
          type="button"
          onClick={() => setSubmittedId(null)}
          className="mt-4 inline-flex rounded-md border border-border bg-background/60 px-3 py-1.5 text-[12px] font-medium text-muted hover:text-foreground hover:border-accent/30"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Name">
        <input
          required
          minLength={3}
          maxLength={60}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Solana Trace MCP"
          className="w-full rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
        />
      </Field>

      <Field label="Category">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as (typeof CATEGORIES)[number])}
          className="w-full rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Description">
        <textarea
          required
          minLength={20}
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does it do, who is it for, what does it depend on?"
          className="w-full rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
        />
      </Field>

      <Field label="Price (USDC)">
        <input
          type="number"
          min={0}
          max={10000}
          step={1}
          value={priceUsdc}
          onChange={(e) => setPriceUsdc(Number(e.target.value))}
          className="w-full rounded-md border border-border bg-background/80 px-3 py-2 text-sm text-foreground outline-none focus:border-accent/50"
        />
        <span className="mt-1 block text-xs text-muted">
          0 means free. Daemon takes a 15% platform fee on paid installs.
        </span>
      </Field>

      {error && (
        <div className="rounded-md border border-red-500/25 bg-red-500/8 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-[12px] font-semibold text-accent-foreground hover:brightness-110 disabled:opacity-70"
      >
        {busy && <Loader2 className="size-3.5 animate-spin" />}
        Submit for review
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
