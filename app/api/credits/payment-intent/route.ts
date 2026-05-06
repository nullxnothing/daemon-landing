import { NextRequest, NextResponse } from "next/server";
import { getAccessStatus } from "@/lib/access";
import { CREDIT_BUNDLES } from "@/lib/portal-data";
import { requireWallet } from "@/lib/portal-auth";
import { createPaymentIntent } from "@/lib/portal-store";
import { buildUsdcPaymentTransaction, paymentConfigReady } from "@/lib/usdc-payments";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const wallet = await requireWallet();
  if (!wallet) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  if (!paymentConfigReady()) {
    return NextResponse.json(
      { ok: false, error: "USDC treasury is not configured yet." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { bundleId?: string } | null;
  const bundle = CREDIT_BUNDLES.find((b) => b.id === body?.bundleId);
  if (!bundle) {
    return NextResponse.json({ ok: false, error: "Unknown bundle." }, { status: 400 });
  }

  const access = await getAccessStatus(wallet);
  const intent = await createPaymentIntent({
    wallet,
    bundleId: bundle.id,
    ai: bundle.aiCredits,
    automation: bundle.automationCredits,
    priceUsdc: bundle.priceUsdc,
    tier: access.staking.qualifiedTier,
  });
  const payment = await buildUsdcPaymentTransaction({
    intentId: intent.id,
    wallet,
    amountUsdc: intent.chargedUsdc,
    expiresAt: intent.expiresAt,
  });

  return NextResponse.json({
    ok: true,
    data: {
      intent,
      payment,
    },
  });
}
