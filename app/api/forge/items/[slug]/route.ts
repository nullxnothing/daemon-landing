import { NextResponse } from "next/server";
import { findForgeItem } from "@/lib/portal-store";

export const dynamic = "force-dynamic";

export async function GET(_: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const item = await findForgeItem(slug);
  if (!item) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: item });
}
