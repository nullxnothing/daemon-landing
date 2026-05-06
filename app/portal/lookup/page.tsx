import { AccessStatusChecker } from "@/components/access/access-status-checker";

export const metadata = {
  title: "DAEMON Portal · Lookup",
  description: "Public wallet lookup for DAEMON access status.",
};

export const dynamic = "force-dynamic";

export default function PortalLookupPage() {
  return (
    <>
      <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8">
        <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Public lookup</div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.05]">
          Check DAEMON access for any wallet.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted leading-6">
          Paste any Solana wallet address to see its current Pro status, holder balance, and stake
          tier. Read-only, no signature required.
        </p>
      </section>

      <AccessStatusChecker />
    </>
  );
}
