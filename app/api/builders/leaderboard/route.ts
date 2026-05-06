import { NextResponse } from "next/server";
import { listBuilders } from "@/lib/portal-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: true, data: await listBuilders() });
}
