import { PublicKey } from "@solana/web3.js";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { kv } from "@/lib/kv";

export const SIWS_COOKIE = "daemon_session";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://daemonide.tech");
export const SIWS_DOMAIN = hostnameFromUrl(SITE_URL);
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const K_CHALLENGE = (nonce: string) => `daemon:siws:challenge:${nonce}`;

const PRO_API_BASE =
  process.env.DAEMON_PRO_API_BASE ?? "https://daemon-pro-api-production.up.railway.app";

export type SiwsChallenge = {
  nonce: string;
  message: string;
  issuedAt: string;
  expiresAt: string;
};

export type SiwsVerifyInput = {
  wallet: string;
  signature: string;
  message: string;
};

export type SiwsSession = {
  token: string;
  wallet: string;
  expiresAt: string;
};

type StoredChallenge = SiwsChallenge & {
  wallet: string;
  used: boolean;
};

type SessionPayload = {
  sid: string;
  wallet: string;
  iat: number;
  exp: number;
};

export function buildLocalChallenge(wallet: string): SiwsChallenge {
  const now = new Date();
  const expires = new Date(now.getTime() + 5 * 60 * 1000);
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const message = [
    `${SIWS_DOMAIN} wants you to sign in with your Solana account:`,
    wallet,
    "",
    "Sign in to DAEMON.",
    "",
    `URI: https://${SIWS_DOMAIN}`,
    "Version: 1",
    `Nonce: ${nonce}`,
    `Issued At: ${now.toISOString()}`,
    `Expires At: ${expires.toISOString()}`,
  ].join("\n");

  return { nonce, message, issuedAt: now.toISOString(), expiresAt: expires.toISOString() };
}

export async function storeChallenge(wallet: string, challenge: SiwsChallenge): Promise<void> {
  await kv.setJson<StoredChallenge>(K_CHALLENGE(challenge.nonce), {
    ...challenge,
    wallet,
    used: false,
  });
}

export async function consumeChallenge(wallet: string, message: string): Promise<boolean> {
  const nonce = extractMessageField(message, "Nonce");
  if (!nonce) return false;

  const stored = await kv.getJson<StoredChallenge>(K_CHALLENGE(nonce));
  if (!stored || stored.used || stored.wallet !== wallet || stored.message !== message) {
    return false;
  }
  if (Date.now() > Date.parse(stored.expiresAt)) {
    return false;
  }

  stored.used = true;
  await kv.setJson(K_CHALLENGE(nonce), stored);
  return true;
}

export function createSession(wallet: string): SiwsSession {
  const now = Math.floor(Date.now() / 1000);
  const expires = now + SESSION_TTL_SECONDS;
  const payload: SessionPayload = {
    sid: randomUUID(),
    wallet,
    iat: now,
    exp: expires,
  };
  return {
    token: signSession(payload),
    wallet,
    expiresAt: new Date(expires * 1000).toISOString(),
  };
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  const expected = hmac(encodedPayload);
  if (!safeEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(base64urlDecode(encodedPayload)) as SessionPayload;
    if (!payload.wallet || !payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function requestRemoteChallenge(wallet: string): Promise<SiwsChallenge | null> {
  try {
    const res = await fetch(`${PRO_API_BASE}/v1/auth/siws/challenge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet }),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { ok?: boolean; data?: SiwsChallenge };
    return body?.data ?? null;
  } catch {
    return null;
  }
}

export async function verifyRemote(input: SiwsVerifyInput): Promise<SiwsSession | null> {
  try {
    const res = await fetch(`${PRO_API_BASE}/v1/auth/siws/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { ok?: boolean; data?: SiwsSession };
    return body?.data ?? null;
  } catch {
    return null;
  }
}

export function isLikelySolanaAddress(value: string) {
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value)) return false;
  try {
    return new PublicKey(value).toBase58() === value;
  } catch {
    return false;
  }
}

function signSession(payload: SessionPayload) {
  const encodedPayload = base64urlEncode(JSON.stringify(payload));
  return `${encodedPayload}.${hmac(encodedPayload)}`;
}

function hmac(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function sessionSecret() {
  const secret = process.env.SESSION_SECRET ?? process.env.DAEMON_SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET is required in production.");
  }
  return "daemon-local-dev-session-secret";
}

function base64urlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64urlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function extractMessageField(message: string, label: string) {
  const prefix = `${label}: `;
  return message
    .split("\n")
    .find((line) => line.startsWith(prefix))
    ?.slice(prefix.length)
    .trim();
}

function hostnameFromUrl(value: string) {
  try {
    return new URL(value).hostname;
  } catch {
    return "daemonide.tech";
  }
}
