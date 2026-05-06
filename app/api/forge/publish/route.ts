import { NextRequest, NextResponse } from "next/server";
import { requireWallet } from "@/lib/portal-auth";
import { getAccessStatus } from "@/lib/access";
import { getWalletState, submitForgeListing } from "@/lib/portal-store";

export const dynamic = "force-dynamic";

const VALID_CATEGORIES = ["agent", "plugin", "mcp", "skill", "automation"] as const;
type Category = (typeof VALID_CATEGORIES)[number];

function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (VALID_CATEGORIES as readonly string[]).includes(value);
}

export async function POST(request: NextRequest) {
  const wallet = await requireWallet();
  if (!wallet) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  const access = await getAccessStatus(wallet);
  const isPro = access.active;
  if (!isPro) {
    return NextResponse.json(
      { ok: false, error: "Forge publishing requires DAEMON Pro (stake or paid)." },
      { status: 403 },
    );
  }

  const state = await getWalletState(wallet);
  if (!state.builderHandle) {
    return NextResponse.json(
      { ok: false, error: "Claim a builder handle first on the Builder tab." },
      { status: 400 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { name?: string; category?: string; description?: string; priceUsdc?: number }
    | null;

  const name = body?.name?.trim();
  const description = body?.description?.trim();
  const category = body?.category;
  const priceUsdc = Number(body?.priceUsdc ?? 0);

  if (!name || name.length < 3 || name.length > 60) {
    return NextResponse.json({ ok: false, error: "Name is 3-60 characters." }, { status: 400 });
  }
  if (!description || description.length < 20) {
    return NextResponse.json({ ok: false, error: "Description must be at least 20 chars." }, { status: 400 });
  }
  if (!isCategory(category)) {
    return NextResponse.json({ ok: false, error: "Invalid category." }, { status: 400 });
  }
  if (!Number.isFinite(priceUsdc) || priceUsdc < 0 || priceUsdc > 10_000) {
    return NextResponse.json({ ok: false, error: "Price must be 0-10000 USDC." }, { status: 400 });
  }

  const { submission, item } = await submitForgeListing({
    wallet,
    creator: state.builderHandle,
    name,
    description,
    category,
    priceUsdc,
  });

  return NextResponse.json({ ok: true, data: { ...submission, slug: item.slug } });
}
