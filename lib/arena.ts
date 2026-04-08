const API_BASE = "https://daemon-pro-api-production.up.railway.app";

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
