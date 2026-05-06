import { NextRequest, NextResponse } from "next/server";
import { requireWallet } from "@/lib/portal-auth";
import { findForgeItem, purchaseForgeItem } from "@/lib/portal-store";
import { getAccessStatus } from "@/lib/access";

export const dynamic = "force-dynamic";

const TIER_RANK: Record<string, number> = { signal: 1, vector: 2, apex: 3 };

export async function POST(request: NextRequest) {
  const wallet = await requireWallet();
  if (!wallet) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { slug?: string } | null;
  const item = body?.slug ? await findForgeItem(body.slug) : null;
  if (!item) {
    return NextResponse.json({ ok: false, error: "Unknown item." }, { status: 400 });
  }

  if (item.requiresTier) {
    const access = await getAccessStatus(wallet);
    const userTier = access.staking.qualifiedTier;
    const userRank = userTier ? TIER_RANK[userTier] : 0;
    if (userRank < TIER_RANK[item.requiresTier]) {
      return NextResponse.json(
        {
          ok: false,
          error: `Requires ${item.requiresTier[0].toUpperCase()}${item.requiresTier.slice(1)} stake.`,
        },
        { status: 403 },
      );
    }
  }

  const result = await purchaseForgeItem(wallet, item);
  return NextResponse.json({ ok: true, data: result });
}
