"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ExternalLink, Wallet } from "lucide-react";
import bs58 from "bs58";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

type Phase = "idle" | "challenging" | "signing" | "verifying" | "error";

export function DashboardSignIn({ streamflowUrl }: { streamflowUrl: string }) {
  const { publicKey, signMessage, connected, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);

  const wallet = publicKey?.toBase58() ?? null;

  const signIn = useCallback(async () => {
    if (!wallet || !signMessage) {
      setError("Wallet does not support message signing.");
      setPhase("error");
      return;
    }
    setError(null);
    setPhase("challenging");

    try {
      const challengeRes = await fetch("/api/auth/siws/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet }),
      });
      const challengeBody = (await challengeRes.json()) as
        | { ok: true; data: { message: string } }
        | { ok: false; error: string };
      if (!challengeBody.ok) throw new Error(challengeBody.error);

      setPhase("signing");
      const messageBytes = new TextEncoder().encode(challengeBody.data.message);
      const signature = await signMessage(messageBytes);
      const signatureB58 = bs58.encode(signature);

      setPhase("verifying");
      const verifyRes = await fetch("/api/auth/siws/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet,
          message: challengeBody.data.message,
          signature: signatureB58,
        }),
      });
      const verifyBody = (await verifyRes.json()) as
        | { ok: true; data: unknown }
        | { ok: false; error: string };
      if (!verifyBody.ok) throw new Error(verifyBody.error);

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      setPhase("error");
    }
  }, [wallet, signMessage, router]);

  useEffect(() => {
    if (connected && wallet && phase === "idle") {
      void signIn();
    }
  }, [connected, wallet, phase, signIn]);

  const phaseLabel: Record<Phase, string> = {
    idle: "Sign in with wallet",
    challenging: "Preparing challenge…",
    signing: "Waiting for signature…",
    verifying: "Verifying…",
    error: "Try again",
  };

  return (
    <section className="rounded-[36px] border border-border bg-card/70 p-8 md:p-12 shadow-[0_0_80px_rgba(62,207,142,0.08)]">
      <div className="inline-flex items-center gap-3 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-accent">
        Token utility hub
      </div>
      <h1 className="mt-6 max-w-3xl text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[0.95]">
        Connect your wallet to see your DAEMON status.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
        Sign in with Solana to view your Pro status, stake tier, holder balance, AI credits, and
        unlocked features. The base DAEMON app stays free, this is for supporters who want to manage
        access in one place.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {!connected ? (
          <button
            type="button"
            onClick={() => setVisible(true)}
            disabled={connecting}
            className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-70"
          >
            <Wallet className="size-4" />
            {connecting ? "Connecting…" : "Connect wallet"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void signIn()}
            disabled={phase === "challenging" || phase === "signing" || phase === "verifying"}
            className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-70"
          >
            {phaseLabel[phase]}
            <ArrowRight className="size-4" />
          </button>
        )}

        <a
          href={streamflowUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-5 py-3 text-sm text-muted hover:text-foreground hover:border-accent/30 transition-colors"
        >
          Stake on Streamflow
          <ExternalLink className="size-4" />
        </a>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Hint
          title="Wallet-signed identity"
          copy="Sign once, the dashboard remembers your wallet. No password, no email, no custodial account."
        />
        <Hint
          title="Backend is the source of truth"
          copy="Pro, holder, stake, credits — all read from DAEMON's backend, not decided by the website or the app."
        />
        <Hint
          title="Heavy flows live here"
          copy="Stake, buy credits, manage Pro, and publish to Forge happen on the website. The desktop app stays focused on building."
        />
      </div>
    </section>
  );
}

function Hint({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-[24px] border border-border bg-background/70 p-5">
      <div className="text-[12px] uppercase tracking-[0.16em] text-accent">{title}</div>
      <p className="mt-3 text-sm text-muted leading-6">{copy}</p>
    </div>
  );
}
