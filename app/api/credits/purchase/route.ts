import { NextRequest, NextResponse } from "next/server";
import { requireWallet } from "@/lib/portal-auth";
import { purchaseBundle } from "@/lib/portal-store";
import { CREDIT_BUNDLES } from "@/lib/portal-data";
import { getAccessStatus } from "@/lib/access";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const wallet = await requireWallet();
  if (!wallet) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { bundleId?: string } | null;
  const bundleId = body?.bundleId;
  const bundle = CREDIT_BUNDLES.find((b) => b.id === bundleId);
  if (!bundle) {
    return NextResponse.json({ ok: false, error: "Unknown bundle." }, { status: 400 });
  }

  const access = await getAccessStatus(wallet);
  const tier = access.staking.qualifiedTier;
  const result = await purchaseBundle({
    wallet,
    bundleId: bundle.id,
    ai: bundle.aiCredits,
    automation: bundle.automationCredits,
    priceUsdc: bundle.priceUsdc,
    tier,
  });

  return NextResponse.json({
    ok: true,
    data: {
      credits: result.state.credits,
      ledgerEntry: result.entry,
      charged: result.charged,
    },
  });
}
