import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getBuilder, itemsByCreator } from "@/lib/portal-store";

export const dynamic = "force-dynamic";

const TIER_LABEL: Record<string, string> = {
  signal: "Signal",
  vector: "Vector",
  apex: "Apex",
};

export default async function PublicBuilderPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const profile = await getBuilder(handle);
  if (!profile) notFound();

  const items = await itemsByCreator(profile.handle);
  const totalInstalls = items.reduce((s, i) => s + i.installs, 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <section className="rounded-[28px] border border-border bg-card/70 p-6 md:p-8 shadow-[0_0_60px_rgba(62,207,142,0.06)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.18em] text-accent">Builder</span>
              {profile.tier && (
                <span className="inline-flex items-center rounded-sm border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-accent">
                  {TIER_LABEL[profile.tier]}
                </span>
              )}
              {profile.pro && (
                <span className="inline-flex items-center rounded-sm border border-border bg-background/60 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted">
                  Pro
                </span>
              )}
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] leading-[1]">
              {profile.displayName}
            </h1>
            <p className="mt-2 font-mono text-sm text-muted">/b/{profile.handle}</p>
            <p className="mt-4 max-w-2xl text-[15px] text-foreground leading-7">{profile.bio}</p>

            <div className="mt-6 grid gap-3 md:grid-cols-4">
              <Stat label="Items shipped" value={items.length.toString()} />
              <Stat label="Installs" value={totalInstalls.toLocaleString()} />
              <Stat
                label="Reputation"
                value={
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-4 text-accent" />
                    {profile.reputation.toLocaleString()}
                  </span>
                }
              />
              <Stat label="Joined" value={new Date(profile.joinedAt).toLocaleDateString()} />
            </div>
          </section>

          <section className="rounded-[28px] border border-border bg-card/60 p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-accent">Listings</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Forge items</h2>

            {items.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-border bg-background/40 p-6 text-center text-sm text-muted">
                Nothing shipped yet.
              </div>
            ) : (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {items.map((i) => (
                  <Link
                    key={i.slug}
                    href={`/portal/forge/${i.slug}`}
                    className="rounded-2xl border border-border bg-background/70 p-4 hover:border-accent/30 transition-colors"
                  >
                    <div className="text-[10px] uppercase tracking-[0.16em] text-accent">
                      {i.category}
                    </div>
                    <div className="mt-1 text-base font-semibold text-foreground">{i.name}</div>
                    <div className="mt-1.5 text-xs text-muted leading-5">{i.tagline}</div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted">
                      <span>{i.installs.toLocaleString()} installs</span>
                      <span className="text-foreground font-semibold">
                        {i.priceUsdc === 0 ? "Free" : `${i.priceUsdc} USDC`}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4">
      <div className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className="mt-2 text-xl font-semibold tracking-tight text-foreground">{value}</div>
    </div>
  );
}
