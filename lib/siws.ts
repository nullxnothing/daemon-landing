import { PublicKey } from "@solana/web3.js";

export const SIWS_COOKIE = "daemon_session";
export const SIWS_DOMAIN = "daemon.computer";

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
