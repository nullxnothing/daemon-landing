import { NextResponse } from "next/server";
import { requireWallet } from "@/lib/portal-auth";
import { getWalletState } from "@/lib/portal-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const wallet = await requireWallet();
  if (!wallet) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  const state = await getWalletState(wallet);
  return NextResponse.json({
    ok: true,
    data: {
      wallet,
      credits: state.credits,
      ledger: state.ledger,
    },
  });
}
