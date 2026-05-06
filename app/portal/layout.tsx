import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PortalShell } from "@/components/portal/portal-shell";
import { getMe } from "@/lib/me";

export const dynamic = "force-dynamic";

const TIER_LABEL: Record<string, string> = {
  signal: "Signal",
  vector: "Vector",
  apex: "Apex",
};

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const me = await getMe();
  const tier =
    (me?.access.staking.qualifiedTier && TIER_LABEL[me.access.staking.qualifiedTier]) ??
    (me?.access.active ? "Pro" : null);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <PortalShell wallet={me?.wallet ?? null} tier={tier}>
            {children}
          </PortalShell>
        </div>
      </main>
      <Footer />
    </>
  );
}
