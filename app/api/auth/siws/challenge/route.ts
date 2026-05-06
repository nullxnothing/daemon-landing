import { NextRequest, NextResponse } from "next/server";
import { buildLocalChallenge, isLikelySolanaAddress, requestRemoteChallenge } from "@/lib/siws";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { wallet?: string } | null;
  const wallet = body?.wallet?.trim();

  if (!wallet || !isLikelySolanaAddress(wallet)) {
    return NextResponse.json(
      { ok: false, error: "Valid Solana wallet address required." },
      { status: 400 },
    );
  }

  const remote = await requestRemoteChallenge(wallet);
  const challenge = remote ?? buildLocalChallenge(wallet);

  return NextResponse.json({ ok: true, data: challenge });
}
