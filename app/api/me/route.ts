import { NextResponse } from "next/server";
import { getMe } from "@/lib/me";

export const dynamic = "force-dynamic";

export async function GET() {
  const me = await getMe();
  if (!me) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  return NextResponse.json({ ok: true, data: me });
}
