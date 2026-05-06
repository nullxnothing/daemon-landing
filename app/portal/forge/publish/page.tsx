import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PublishForm } from "@/components/portal/publish-form";
import { getMe } from "@/lib/me";

export const metadata = {
  title: "DAEMON Portal · Publish to Forge",
};

export const dynamic = "force-dynamic";

export default async function PublishPage() {
  const me = await getMe();

  let disabledReason: string | undefined;
  if (!me) disabledReason = "Sign in on the Overview tab to publish.";
  else if (!me.access.active)
    disabledReason = "Forge publishing requires DAEMON Pro. Stake DAEMON or activate Pro first.";
  else if (!me.builder?.handle)
    disabledReason = "Claim a builder handle on the Builder tab before publishing.";

  return (
    <>
      <Link
        href="/portal/forge"
        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Back to Forge
      </Link>

      <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8">
        <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Publish</div>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.05]">
          Ship a Forge item.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted leading-6">
          Submit your agent, plugin, MCP server, skill, or automation pack for review. Approved
          listings show up under your builder handle and earn USDC on every install.
        </p>
      </section>

      <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
        <PublishForm disabledReason={disabledReason} />
      </section>
    </>
  );
}
