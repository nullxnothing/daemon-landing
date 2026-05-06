import { cookies } from "next/headers";
import { SIWS_COOKIE, verifySessionToken } from "@/lib/siws";

export async function requireWallet(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(SIWS_COOKIE)?.value;
  const wallet = jar.get(`${SIWS_COOKIE}_wallet`)?.value;
  if (!token || !wallet) return null;
  const session = verifySessionToken(token);
  if (!session || session.wallet !== wallet) return null;
  return session.wallet;
}
