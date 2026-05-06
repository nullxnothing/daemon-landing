import { NextRequest, NextResponse } from "next/server";
import { requireWallet } from "@/lib/portal-auth";
import { claimBuilderHandle } from "@/lib/portal-store";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const wallet = await requireWallet();
  if (!wallet) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { handle?: string } | null;
  if (!body?.handle) {
    return NextResponse.json({ ok: false, error: "Handle is required." }, { status: 400 });
  }

  const result = await claimBuilderHandle(wallet, body.handle);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json({ ok: true, data: { handle: result.handle } });
}
