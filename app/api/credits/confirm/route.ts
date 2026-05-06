import { NextRequest, NextResponse } from "next/server";
import { requireWallet } from "@/lib/portal-auth";
import {
  confirmBundlePayment,
  getPaymentIntent,
  savePaymentIntent,
} from "@/lib/portal-store";
import { verifyUsdcPayment } from "@/lib/usdc-payments";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const wallet = await requireWallet();
  if (!wallet) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { intentId?: string; signature?: string }
    | null;
  const intentId = body?.intentId?.trim();
  const signature = body?.signature?.trim();
  if (!intentId || !signature) {
    return NextResponse.json(
      { ok: false, error: "intentId and signature are required." },
      { status: 400 },
    );
  }

  const intent = await getPaymentIntent(intentId);
  if (!intent || intent.wallet !== wallet) {
    return NextResponse.json({ ok: false, error: "Payment intent not found." }, { status: 404 });
  }
  if (intent.status === "confirmed") {
    return NextResponse.json({ ok: true, data: { credits: null, alreadyConfirmed: true } });
  }
  if (Date.now() > Date.parse(intent.expiresAt)) {
    intent.status = "expired";
    await savePaymentIntent(intent);
    return NextResponse.json({ ok: false, error: "Payment intent expired." }, { status: 409 });
  }

  intent.status = "submitted";
  intent.signature = signature;
  await savePaymentIntent(intent);

  const verified = await verifyUsdcPayment({
    signature,
    wallet,
    amountUsdc: intent.chargedUsdc,
  });
  if (!verified.ok) {
    intent.status = "failed";
    await savePaymentIntent(intent);
    return NextResponse.json({ ok: false, error: verified.error }, { status: 400 });
  }

  const result = await confirmBundlePayment(intent, signature);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    data: {
      credits: result.state.credits,
      ledgerEntry: result.entry,
      signature,
    },
  });
}
