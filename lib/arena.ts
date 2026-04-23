const API_BASE = "https://daemon-pro-api-production.up.railway.app";
const DEXSCREENER_TOKEN_URL =
  "https://api.dexscreener.com/latest/dex/tokens/4vpf4qNtNVkvz2dm5qL2mT6jBXH9gDY8qH2QsHN5pump";

export const ARENA_TARGET_MARKET_CAP = 100_000;
export const DAEMON_ARENA_TOKEN_MINT = "4vpf4qNtNVkvz2dm5qL2mT6jBXH9gDY8qH2QsHN5pump";

export type ArenaContest = {
  slug: string;
  name: string;
  duration: string;
  submissionWindow: string;
  prizes: string[];
  judging: string;
};

export type ArenaSubmission = {
  id: string;
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  status: string;
  submittedAt: number;
  votes: number;
  pitch?: string | null;
  demoUrl?: string | null;
  xHandle?: string | null;
  discordHandle?: string | null;
  themeWeek?: string | null;
};

export type ArenaPrice = {
  priceUsdc: number;
  durationDays: number;
  network: string;
  payTo: string;
  holderMint?: string;
  holderMinAmount?: number;
};

type DexScreenerPair = {
  marketCap?: number;
  liquidity?: {
    usd?: number;
  };
  url?: string;
};

export type ArenaMarketCap = {
  tokenMint: string;
  marketCap: number | null;
  targetMarketCap: number;
  trackerUrl: string | null;
};

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getArenaData() {
  const arena = await fetchJson<{
    ok: boolean;
    contest: ArenaContest;
    data: ArenaSubmission[];
  }>("/v1/arena/public");

  return {
    contest: arena?.contest ?? null,
    submissions: arena?.data ?? [],
  };
}

export async function getArenaPrice() {
  const price = await fetchJson<{ ok: boolean; data: ArenaPrice }>("/v1/subscribe/price");
  return price?.data ?? null;
}

export async function getArenaMarketCap(): Promise<ArenaMarketCap> {
  try {
    const res = await fetch(DEXSCREENER_TOKEN_URL, {
      next: { revalidate: 30 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`DexScreener returned ${res.status}`);
    }

    const data = (await res.json()) as { pairs?: DexScreenerPair[] };
    const bestPair =
      data.pairs?.sort(
        (a, b) => (b.liquidity?.usd ?? b.marketCap ?? 0) - (a.liquidity?.usd ?? a.marketCap ?? 0),
      )[0] ?? null;

    return {
      tokenMint: DAEMON_ARENA_TOKEN_MINT,
      marketCap: bestPair?.marketCap ?? null,
      targetMarketCap: ARENA_TARGET_MARKET_CAP,
      trackerUrl: bestPair?.url ?? null,
    };
  } catch {
    return {
      tokenMint: DAEMON_ARENA_TOKEN_MINT,
      marketCap: null,
      targetMarketCap: ARENA_TARGET_MARKET_CAP,
      trackerUrl: null,
    };
  }
}
