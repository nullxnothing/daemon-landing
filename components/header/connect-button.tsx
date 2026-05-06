"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, Wallet } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { cn } from "@/lib/utils";

type TierId = "signal" | "vector" | "apex";

type StatusPayload = {
  active: boolean;
  accessSource: "payment" | "holder" | "staking" | null;
  staking: { qualifiedTier: TierId | null };
};

const TIER_LABEL: Record<TierId, string> = {
  signal: "Signal",
  vector: "Vector",
  apex: "Apex",
};

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function ConnectButton() {
  const { publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const wallet = publicKey?.toBase58() ?? null;

  useEffect(() => {
    if (!wallet) {
      setStatus(null);
      return;
    }
    let cancelled = false;
    fetch(`/api/access/status?wallet=${encodeURIComponent(wallet)}`)
      .then((r) => r.json())
      .then((body) => {
        if (cancelled) return;
        if (body?.ok) setStatus(body.data as StatusPayload);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [wallet]);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  if (!wallet) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        disabled={connecting}
        className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/90 px-3 py-1.5 text-[12px] font-semibold text-accent-foreground transition-all hover:bg-accent hover:shadow-[0_0_18px_rgba(88,200,138,0.2)] disabled:opacity-70"
      >
        <Wallet className="size-[12px]" />
        {connecting ? "…" : "Connect"}
      </button>
    );
  }

  const tier = status?.staking.qualifiedTier;
  const tierLabel = tier ? TIER_LABEL[tier] : status?.active ? "Pro" : null;

  return (
    <div ref={menuRef} className="relative ml-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/60 px-2.5 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:border-accent/40"
      >
        {tierLabel && (
          <span className="rounded-sm border border-accent/30 bg-accent/10 px-1.5 py-0 text-[9px] uppercase tracking-[0.12em] text-accent">
            {tierLabel}
          </span>
        )}
        <span className="font-mono text-[11px]">{truncate(wallet)}</span>
        <ChevronDown className={cn("size-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-background/95 p-1.5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <Link
            href="/portal"
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2 text-[13px] font-medium text-foreground hover:bg-card"
          >
            Portal
          </Link>
          <Link
            href="/portal/staking"
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-card hover:text-foreground"
          >
            Staking
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              void disconnect();
            }}
            className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-card hover:text-foreground"
          >
            <LogOut className="size-3.5" />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
