import { NextResponse } from "next/server";
import { getAccessConfig } from "@/lib/access";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getAccessConfig();
  return NextResponse.json({ ok: true, data: config });
}
