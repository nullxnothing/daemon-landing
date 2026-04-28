import { NextRequest, NextResponse } from "next/server";
import { getAccessStatus } from "@/lib/access";

export const dynamic = "force-dynamic";

function isLikelySolanaAddress(value: string) {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
}

export async function GET(request: NextRequest) {
  const wallet = request.nextUrl.searchParams.get("wallet")?.trim() ?? "";
  if (!wallet) {
    return NextResponse.json(
      { ok: false, error: "Missing wallet query parameter." },
      { status: 400 },
    );
  }

  if (!isLikelySolanaAddress(wallet)) {
    return NextResponse.json(
      { ok: false, error: "Wallet address does not look like a valid Solana address." },
      { status: 400 },
    );
  }

  const status = await getAccessStatus(wallet);
  return NextResponse.json({ ok: true, data: status });
}
