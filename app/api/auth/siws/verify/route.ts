import { NextRequest, NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import {
  SIWS_COOKIE,
  consumeChallenge,
  createSession,
  isLikelySolanaAddress,
  verifyRemote,
} from "@/lib/siws";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

function verifySignatureLocal(wallet: string, message: string, signature: string) {
  try {
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = bs58.decode(signature);
    const publicKeyBytes = new PublicKey(wallet).toBytes();
    return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { wallet?: string; signature?: string; message?: string }
    | null;

  const wallet = body?.wallet?.trim();
  const signature = body?.signature?.trim();
  const message = body?.message;

  if (!wallet || !isLikelySolanaAddress(wallet) || !signature || !message) {
    return NextResponse.json(
      { ok: false, error: "wallet, signature, and message are required." },
      { status: 400 },
    );
  }

  if (!verifySignatureLocal(wallet, message, signature)) {
    return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 401 });
  }

  const challengeOk = await consumeChallenge(wallet, message);
  if (!challengeOk) {
    return NextResponse.json(
      { ok: false, error: "Challenge expired, reused, or not issued by DAEMON." },
      { status: 401 },
    );
  }

  await verifyRemote({ wallet, signature, message });
  const session = createSession(wallet);
  const expiresAt = session.expiresAt;

  const response = NextResponse.json({ ok: true, data: { wallet, expiresAt } });
  response.cookies.set({
    name: SIWS_COOKIE,
    value: session.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  response.cookies.set({
    name: `${SIWS_COOKIE}_wallet`,
    value: wallet,
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SIWS_COOKIE);
  response.cookies.delete(`${SIWS_COOKIE}_wallet`);
  return response;
}
