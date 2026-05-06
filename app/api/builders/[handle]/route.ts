import { NextResponse } from "next/server";
import { getBuilder } from "@/lib/portal-store";

export const dynamic = "force-dynamic";

export async function GET(_: Request, ctx: { params: Promise<{ handle: string }> }) {
  const { handle } = await ctx.params;
  const builder = await getBuilder(handle);
  if (!builder) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: builder });
}
