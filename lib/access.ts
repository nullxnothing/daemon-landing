import { PublicKey } from "@solana/web3.js";
import { SolanaStakingClient } from "@streamflow/staking";
import { getArenaPrice } from "@/lib/arena";

const PRO_API_BASE =
  process.env.DAEMON_PRO_API_BASE ?? "https://daemon-pro-api-production.up.railway.app";
const DEFAULT_STREAMFLOW_APP_URL = "https://app.streamflow.finance/staking";
const STREAMFLOW_APP_URL =
  process.env.NEXT_PUBLIC_STREAMFLOW_POOL_URL ??
  process.env.STREAMFLOW_POOL_URL ??
  DEFAULT_STREAMFLOW_APP_URL;
const STREAMFLOW_STAKE_POOL =
  process.env.STREAMFLOW_STAKE_POOL ?? process.env.NEXT_PUBLIC_STREAMFLOW_STAKE_POOL ?? null;
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL ?? "https://api.mainnet-beta.solana.com";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://daemon.computer");
const DAEMON_TOKEN_MINT =
  process.env.NEXT_PUBLIC_DAEMON_TOKEN_MINT ??
  "4vpf4qNtNVkvz2dm5qL2mT6jBXH9gDY8qH2QsHN5pump";

export type AccessTierId = "pro" | "builder" | "operator";

export type AccessTier = {
  id: AccessTierId;
  label: string;
  threshold: string;
  thresholdAmount: number;
  status: "live" | "planned";
  unlocks: string[];
};

export type AccessConfig = {
  provider: "streamflow";
  appIsFree: true;
  tokenMint: string;
  streamflowUrl: string;
  streamflowPoolAddress: string | null;
  poolConfigured: boolean;
  rpcUrlConfigured: boolean;
  pricing: {
    priceUsdc: number | null;
    durationDays: number | null;
    holderMinAmount: number | null;
  };
  utility: string[];
  tiers: AccessTier[];
};

export type AccessStatus = {
  wallet: string;
  active: boolean;
  accessSource: "payment" | "holder" | "staking" | null;
  holderStatus: {
    enabled: boolean;
    eligible: boolean;
    currentAmount: number | null;
    minAmount: number | null;
    symbol: string;
  };
  staking: {
    provider: "streamflow";
    available: boolean;
    poolConfigured: boolean;
    entitlementReady: boolean;
    poolAddress: string | null;
    streamflowUrl: string;
    tokenMint: string | null;
    currentAmount: number | null;
    activeEntries: number;
    qualified: boolean;
    qualifiedTier: AccessTierId | null;
    tiers: Array<Pick<AccessTier, "id" | "label" | "thresholdAmount" | "status">>;
    minAmount: number | null;
    error: string | null;
  };
};

type HolderStatusPayload = {
  enabled: boolean;
  eligible: boolean;
  currentAmount: number | null;
  minAmount: number | null;
  symbol: string;
};

type RemoteAccessPayload = {
  active: boolean;
  accessSource: "payment" | "holder" | null;
  holderStatus: HolderStatusPayload;
};

type StakeSnapshot = {
  currentAmount: number;
  qualified: boolean;
  qualifiedTier: AccessTierId | null;
  activeEntries: number;
  tokenMint: string | null;
  minAmount: number;
  error: string | null;
};

type StakeTierConfig = Record<AccessTierId, number>;

let stakingClient: SolanaStakingClient | null = null;

function parsePositiveNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function formatThreshold(amount: number) {
  return `${amount.toLocaleString()} DAEMON`;
}

function buildStakeTierConfig(holderMinAmount: number | null): StakeTierConfig {
  const baseThreshold = holderMinAmount && holderMinAmount > 0 ? holderMinAmount : 1_000_000;
  return {
    pro: parsePositiveNumber(process.env.STREAMFLOW_PRO_THRESHOLD, baseThreshold),
    builder: parsePositiveNumber(process.env.STREAMFLOW_BUILDER_THRESHOLD, baseThreshold * 5),
    operator: parsePositiveNumber(process.env.STREAMFLOW_OPERATOR_THRESHOLD, baseThreshold * 10),
  };
}

function buildAccessTiers(holderMinAmount: number | null): AccessTier[] {
  const thresholds = buildStakeTierConfig(holderMinAmount);
  return [
    {
      id: "pro",
      label: "Signal",
      threshold: formatThreshold(thresholds.pro),
      thresholdAmount: thresholds.pro,
      status: "live",
      unlocks: [
        "Guaranteed DAEMON Pro access through staking instead of monthly payment pressure",
        "Early access to major product drops, launch surfaces, and ecosystem moments",
        "Private staker channel and first-line supporter access",
      ],
    },
    {
      id: "builder",
      label: "Vector",
      threshold: formatThreshold(thresholds.builder),
      thresholdAmount: thresholds.builder,
      status: "planned",
      unlocks: [
        "Stronger priority for betas, launches, and limited partner activations",
        "Higher-value access across premium DAEMON surfaces as they roll out",
        "Deeper visibility into major roadmap and ecosystem moves before public rollout",
      ],
    },
    {
      id: "operator",
      label: "Apex",
      threshold: formatThreshold(thresholds.operator),
      thresholdAmount: thresholds.operator,
      status: "planned",
      unlocks: [
        "Top staker status closest to the project and its biggest public moments",
        "Highest-priority access when scarce opportunities or allocations open",
        "Flagship supporter tier across future DAEMON community and ecosystem surfaces",
      ],
    },
  ];
}

function getHighestQualifiedTier(amount: number, tiers: AccessTier[]): AccessTierId | null {
  const ordered = [...tiers].sort((a, b) => b.thresholdAmount - a.thresholdAmount);
  return ordered.find((tier) => amount >= tier.thresholdAmount)?.id ?? null;
}

function getStakingClient() {
  if (!stakingClient) {
    stakingClient = new SolanaStakingClient({
      clusterUrl: SOLANA_RPC_URL,
    });
  }
  return stakingClient;
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${PRO_API_BASE}${path}`, {
      next: { revalidate: 30 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getAccessConfig(): Promise<AccessConfig> {
  const price = await getArenaPrice();
  const poolConfigured = Boolean(STREAMFLOW_STAKE_POOL);
  const tiers = buildAccessTiers(price?.holderMinAmount ?? null);

  return {
    provider: "streamflow",
    appIsFree: true,
    tokenMint: DAEMON_TOKEN_MINT,
    streamflowUrl: STREAMFLOW_APP_URL,
    streamflowPoolAddress: STREAMFLOW_STAKE_POOL,
    poolConfigured,
    rpcUrlConfigured: Boolean(SOLANA_RPC_URL),
    pricing: {
      priceUsdc: price?.priceUsdc ?? null,
      durationDays: price?.durationDays ?? null,
      holderMinAmount: price?.holderMinAmount ?? null,
    },
    utility: [
      "Use the base DAEMON app for free. Staking is for supporters who want to get closer to the project, not a paywall on the IDE.",
      "Stake DAEMON to unlock earlier access to what ships next, stronger priority when limited opportunities open, and visible status as an early backer.",
      "Streamflow gives DAEMON a clean, non-custodial staking path without forcing users into a separate DAEMON-built staking protocol.",
    ],
    tiers,
  };
}

async function getStakeSnapshot(
  wallet: string,
  tiers: AccessTier[],
): Promise<StakeSnapshot> {
  if (!STREAMFLOW_STAKE_POOL) {
    return {
      currentAmount: 0,
      qualified: false,
      qualifiedTier: null,
      activeEntries: 0,
      tokenMint: null,
      minAmount: tiers.find((tier) => tier.id === "pro")?.thresholdAmount ?? 0,
      error: null,
    };
  }

  try {
    const walletKey = new PublicKey(wallet);
    const stakePoolKey = new PublicKey(STREAMFLOW_STAKE_POOL);
    const client = getStakingClient();
    const stakePool = await client.getStakePool(stakePoolKey);
    const entries = await client.searchStakeEntries({
      authority: walletKey,
      stakePool: stakePoolKey,
    });

    const activeEntries = entries.filter((entry) => entry.account.closedTs.toString() === "0");
    const mintAccount = await client.connection.getParsedAccountInfo(stakePool.mint);
    const decimals =
      mintAccount.value &&
      "parsed" in mintAccount.value.data &&
      typeof mintAccount.value.data.parsed === "object" &&
      mintAccount.value.data.parsed !== null
        ? Number(mintAccount.value.data.parsed.info?.decimals ?? 0)
        : 0;

    const rawAmount = activeEntries.reduce(
      (sum, entry) => sum + BigInt(entry.account.amount.toString()),
      BigInt(0),
    );
    const uiAmount = Number(rawAmount) / 10 ** decimals;
    const qualifiedTier = getHighestQualifiedTier(uiAmount, tiers);

    return {
      currentAmount: Number.isFinite(uiAmount) ? uiAmount : 0,
      qualified: qualifiedTier !== null,
      qualifiedTier,
      activeEntries: activeEntries.length,
      tokenMint: stakePool.mint.toBase58(),
      minAmount: tiers.find((tier) => tier.id === "pro")?.thresholdAmount ?? 0,
      error: null,
    };
  } catch (error) {
    return {
      currentAmount: 0,
      qualified: false,
      qualifiedTier: null,
      activeEntries: 0,
      tokenMint: null,
      minAmount: tiers.find((tier) => tier.id === "pro")?.thresholdAmount ?? 0,
      error: error instanceof Error ? error.message : "Stake lookup failed",
    };
  }
}

export async function getAccessStatus(wallet: string): Promise<AccessStatus> {
  const price = await getArenaPrice();
  const tiers = buildAccessTiers(price?.holderMinAmount ?? null);
  const data = await fetchJson<{
    ok?: boolean;
    data?: RemoteAccessPayload;
    active?: boolean;
    accessSource?: "payment" | "holder" | null;
    holderStatus?: HolderStatusPayload;
  }>(`/v1/subscribe/status?wallet=${encodeURIComponent(wallet)}`);
  const stake = await getStakeSnapshot(wallet, tiers);
  const payload = data?.data ?? data;
  const activeViaRemote = payload?.active ?? false;
  const stakingActive = stake.qualified;
  const accessSource =
    payload?.accessSource ?? (stakingActive ? "staking" : null);

  return {
    wallet,
    active: activeViaRemote || stakingActive,
    accessSource,
    holderStatus: payload?.holderStatus ?? {
      enabled: false,
      eligible: false,
      currentAmount: null,
      minAmount: null,
      symbol: "DAEMON",
    },
    staking: {
      provider: "streamflow",
      available: true,
      poolConfigured: Boolean(STREAMFLOW_STAKE_POOL),
      entitlementReady: Boolean(STREAMFLOW_STAKE_POOL && !stake.error),
      poolAddress: STREAMFLOW_STAKE_POOL,
      streamflowUrl: STREAMFLOW_APP_URL,
      tokenMint: stake.tokenMint,
      currentAmount: stake.currentAmount,
      activeEntries: stake.activeEntries,
      qualified: stake.qualified,
      qualifiedTier: stake.qualifiedTier,
      tiers: tiers.map(({ id, label, thresholdAmount, status }) => ({
        id,
        label,
        thresholdAmount,
        status,
      })),
      minAmount: stake.minAmount,
      error: stake.error,
    },
  };
}

export function getSiteUrl() {
  return SITE_URL;
}
