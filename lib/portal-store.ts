import { kv } from "@/lib/kv";
import type { Builder, ForgeCategory, ForgeItem } from "@/lib/portal-data";

/**
 * Schema in KV (or in-memory fallback):
 *   daemon:wallet:<addr>     JSON  WalletState
 *   daemon:handle:<handle>   JSON  string (wallet that owns the handle)
 *   daemon:builder:<handle>  JSON  Builder
 *   daemon:builders          SET   handle (lowercased)
 *   daemon:listing:<slug>    JSON  ForgeItem
 *   daemon:listings          SET   slug
 *   daemon:submissions       LIST  JSON ForgeSubmission
 *
 * Race notes: read-modify-write paths (purchases, claims) are not atomic. With
 * single-user write rates (one wallet at a time) this is fine. If multi-tab
 * write contention becomes a real issue, switch hot paths to KV pipelines /
 * MULTI or compute deltas with INCRBY.
 */

export type LedgerEntry = {
  id: string;
  at: string;
  kind: "purchase" | "ai_run" | "automation_run" | "grant";
  aiDelta: number;
  automationDelta: number;
  usdc: number;
  note: string;
  paymentIntentId?: string;
  signature?: string;
  aiRunId?: string;
};

export type WalletState = {
  wallet: string;
  credits: { ai: number; automation: number };
  ledger: LedgerEntry[];
  ownedForge: string[];
  builderHandle: string | null;
};

export type ForgeSubmission = {
  id: string;
  at: string;
  wallet: string;
  creator: string;
  name: string;
  category: ForgeCategory;
  description: string;
  priceUsdc: number;
  status: "submitted" | "approved" | "rejected";
};

export type PaymentIntentStatus = "pending" | "submitted" | "confirmed" | "expired" | "failed";

export type PaymentIntent = {
  id: string;
  wallet: string;
  bundleId: string;
  ai: number;
  automation: number;
  priceUsdc: number;
  chargedUsdc: number;
  status: PaymentIntentStatus;
  createdAt: string;
  expiresAt: string;
  signature: string | null;
  confirmedAt: string | null;
};

export type AiRunMode = "fast" | "builder" | "deep";

export type AiRunStatus = "running" | "completed" | "failed";

export type AiRun = {
  id: string;
  wallet: string;
  mode: AiRunMode;
  prompt: string;
  response: string | null;
  status: AiRunStatus;
  creditsCharged: number;
  error: string | null;
  createdAt: string;
  completedAt: string | null;
};

const K_WALLET = (a: string) => `daemon:wallet:${a}`;
const K_HANDLE = (h: string) => `daemon:handle:${h.toLowerCase()}`;
const K_BUILDER = (h: string) => `daemon:builder:${h.toLowerCase()}`;
const K_BUILDERS = "daemon:builders";
const K_LISTING = (s: string) => `daemon:listing:${s}`;
const K_LISTINGS = "daemon:listings";
const K_SUBMISSIONS = "daemon:submissions";
const K_PAYMENT_INTENT = (id: string) => `daemon:payment-intent:${id}`;
const K_WALLET_PAYMENT_INTENTS = (wallet: string) => `daemon:wallet:${wallet}:payment-intents`;
const K_AI_RUN = (id: string) => `daemon:ai-run:${id}`;
const K_WALLET_AI_RUNS = (wallet: string) => `daemon:wallet:${wallet}:ai-runs`;

function defaultState(wallet: string): WalletState {
  return {
    wallet,
    credits: { ai: 0, automation: 0 },
    ledger: [],
    ownedForge: [],
    builderHandle: null,
  };
}

export async function getWalletState(wallet: string): Promise<WalletState> {
  const stored = await kv.getJson<WalletState>(K_WALLET(wallet));
  if (stored) return stored;
  const fresh = defaultState(wallet);
  await kv.setJson(K_WALLET(wallet), fresh);
  return fresh;
}

async function saveWalletState(state: WalletState) {
  await kv.setJson(K_WALLET(state.wallet), state);
}

export function tierDiscountRate(tier: string | null): number {
  if (tier === "apex") return 0.2;
  if (tier === "vector") return 0.1;
  if (tier === "signal") return 0.05;
  return 0;
}

export type PurchaseBundleInput = {
  wallet: string;
  bundleId: string;
  ai: number;
  automation: number;
  priceUsdc: number;
  tier: string | null;
};

export async function purchaseBundle(input: PurchaseBundleInput) {
  const state = await getWalletState(input.wallet);
  const discount = tierDiscountRate(input.tier);
  const charged = +(input.priceUsdc * (1 - discount)).toFixed(2);
  const entry: LedgerEntry = {
    id: cryptoId(),
    at: new Date().toISOString(),
    kind: "purchase",
    aiDelta: input.ai,
    automationDelta: input.automation,
    usdc: charged,
    note: `Bundle ${input.bundleId} (${discount > 0 ? `${(discount * 100).toFixed(0)}% off` : "no discount"})`,
  };
  state.credits.ai += input.ai;
  state.credits.automation += input.automation;
  state.ledger.unshift(entry);
  await saveWalletState(state);
  return { state, entry, charged };
}

export async function createPaymentIntent(input: PurchaseBundleInput): Promise<PaymentIntent> {
  const discount = tierDiscountRate(input.tier);
  const chargedUsdc = +(input.priceUsdc * (1 - discount)).toFixed(2);
  const now = new Date();
  const intent: PaymentIntent = {
    id: cryptoId(),
    wallet: input.wallet,
    bundleId: input.bundleId,
    ai: input.ai,
    automation: input.automation,
    priceUsdc: input.priceUsdc,
    chargedUsdc,
    status: "pending",
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 15 * 60 * 1000).toISOString(),
    signature: null,
    confirmedAt: null,
  };
  await kv.setJson(K_PAYMENT_INTENT(intent.id), intent);
  await kv.lpush(K_WALLET_PAYMENT_INTENTS(input.wallet), intent.id);
  return intent;
}

export async function getPaymentIntent(id: string): Promise<PaymentIntent | null> {
  return kv.getJson<PaymentIntent>(K_PAYMENT_INTENT(id));
}

export async function savePaymentIntent(intent: PaymentIntent): Promise<void> {
  await kv.setJson(K_PAYMENT_INTENT(intent.id), intent);
}

export async function confirmBundlePayment(intent: PaymentIntent, signature: string) {
  const stored = await getPaymentIntent(intent.id);
  if (!stored) return { ok: false as const, error: "Payment intent was not found." };
  if (stored.status === "confirmed") {
    return { ok: true as const, state: await getWalletState(stored.wallet), entry: null };
  }

  stored.status = "confirmed";
  stored.signature = signature;
  stored.confirmedAt = new Date().toISOString();

  const state = await getWalletState(stored.wallet);
  const entry: LedgerEntry = {
    id: cryptoId(),
    at: stored.confirmedAt,
    kind: "purchase",
    aiDelta: stored.ai,
    automationDelta: stored.automation,
    usdc: stored.chargedUsdc,
    note: `Bundle ${stored.bundleId}`,
    paymentIntentId: stored.id,
    signature,
  };
  state.credits.ai += stored.ai;
  state.credits.automation += stored.automation;
  state.ledger.unshift(entry);
  await Promise.all([saveWalletState(state), savePaymentIntent(stored)]);
  return { ok: true as const, state, entry };
}

export async function listAiRuns(wallet: string, limit = 25): Promise<AiRun[]> {
  const ids = await kv.lrange(K_WALLET_AI_RUNS(wallet), 0, limit - 1);
  if (ids.length === 0) return [];
  const runs = await Promise.all(ids.map((id) => kv.getJson<AiRun>(K_AI_RUN(id))));
  return runs.filter((run): run is AiRun => Boolean(run));
}

export async function createAiRun(input: {
  wallet: string;
  mode: AiRunMode;
  prompt: string;
  creditsCharged: number;
}): Promise<AiRun> {
  const run: AiRun = {
    id: cryptoId(),
    wallet: input.wallet,
    mode: input.mode,
    prompt: input.prompt,
    response: null,
    status: "running",
    creditsCharged: input.creditsCharged,
    error: null,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
  await kv.setJson(K_AI_RUN(run.id), run);
  await kv.lpush(K_WALLET_AI_RUNS(input.wallet), run.id);
  return run;
}

export async function completeAiRun(
  run: AiRun,
  result: { response: string; creditsCharged: number },
): Promise<{ ok: true; state: WalletState; run: AiRun } | { ok: false; error: string; run: AiRun }> {
  const state = await getWalletState(run.wallet);
  if (state.credits.ai < result.creditsCharged) {
    run.status = "failed";
    run.error = "Insufficient AI credits.";
    run.completedAt = new Date().toISOString();
    await kv.setJson(K_AI_RUN(run.id), run);
    return { ok: false, error: run.error, run };
  }

  state.credits.ai -= result.creditsCharged;
  state.ledger.unshift({
    id: cryptoId(),
    at: new Date().toISOString(),
    kind: "ai_run",
    aiDelta: -result.creditsCharged,
    automationDelta: 0,
    usdc: 0,
    note: `Daemon AI ${run.mode} run`,
    aiRunId: run.id,
  });

  run.status = "completed";
  run.response = result.response;
  run.creditsCharged = result.creditsCharged;
  run.completedAt = new Date().toISOString();
  await Promise.all([saveWalletState(state), kv.setJson(K_AI_RUN(run.id), run)]);
  return { ok: true, state, run };
}

export async function failAiRun(run: AiRun, error: string): Promise<AiRun> {
  run.status = "failed";
  run.error = error;
  run.completedAt = new Date().toISOString();
  await kv.setJson(K_AI_RUN(run.id), run);
  return run;
}

export async function listForgeItems(): Promise<ForgeItem[]> {
  const slugs = await kv.smembers(K_LISTINGS);
  if (slugs.length === 0) return [];
  const items = await Promise.all(
    slugs.map((slug) => kv.getJson<ForgeItem>(K_LISTING(slug))),
  );
  return items
    .filter((i): i is ForgeItem => Boolean(i))
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export async function findForgeItem(slug: string): Promise<ForgeItem | null> {
  return kv.getJson<ForgeItem>(K_LISTING(slug));
}

export async function itemsByCreator(handle: string): Promise<ForgeItem[]> {
  const all = await listForgeItems();
  const lower = handle.toLowerCase();
  return all.filter((i) => i.creator.toLowerCase() === lower);
}

export async function ownedForgeItems(wallet: string): Promise<ForgeItem[]> {
  const state = await getWalletState(wallet);
  if (state.ownedForge.length === 0) return [];
  const items = await Promise.all(
    state.ownedForge.map((slug) => kv.getJson<ForgeItem>(K_LISTING(slug))),
  );
  return items.filter((i): i is ForgeItem => Boolean(i));
}

export type PurchaseForgeResult =
  | { ok: true; alreadyOwned: boolean }
  | { ok: false; error: string };

export async function purchaseForgeItem(
  wallet: string,
  item: ForgeItem,
): Promise<PurchaseForgeResult> {
  const state = await getWalletState(wallet);
  if (state.ownedForge.includes(item.slug)) {
    return { ok: true, alreadyOwned: true };
  }
  state.ownedForge.push(item.slug);
  state.ledger.unshift({
    id: cryptoId(),
    at: new Date().toISOString(),
    kind: "grant",
    aiDelta: 0,
    automationDelta: 0,
    usdc: item.priceUsdc,
    note: `Forge install: ${item.name}`,
  });
  await saveWalletState(state);

  const stored = await kv.getJson<ForgeItem>(K_LISTING(item.slug));
  if (stored) {
    stored.installs += 1;
    await kv.setJson(K_LISTING(item.slug), stored);

    const builder = await kv.getJson<Builder>(K_BUILDER(stored.creator));
    if (builder) {
      builder.totalInstalls += 1;
      builder.earningsUsdc += stored.priceUsdc * 0.85;
      builder.reputation += 1;
      await kv.setJson(K_BUILDER(builder.handle), builder);
    }
  }

  return { ok: true, alreadyOwned: false };
}

export type ClaimHandleResult =
  | { ok: true; handle: string }
  | { ok: false; error: string };

const HANDLE_RE = /^[a-z0-9_]{3,24}$/;

export async function claimBuilderHandle(
  wallet: string,
  rawHandle: string,
): Promise<ClaimHandleResult> {
  const handle = rawHandle.trim().toLowerCase();
  if (!HANDLE_RE.test(handle)) {
    return {
      ok: false,
      error: "Handles are 3-24 chars: lowercase letters, numbers, underscore.",
    };
  }
  const owner = await kv.getJson<string>(K_HANDLE(handle));
  const state = await getWalletState(wallet);
  if (owner && owner !== wallet) {
    return { ok: false, error: "Handle is already taken." };
  }
  if (state.builderHandle && state.builderHandle.toLowerCase() !== handle) {
    return { ok: false, error: "This wallet already owns a different handle." };
  }
  state.builderHandle = handle;
  await saveWalletState(state);
  await kv.setJson(K_HANDLE(handle), wallet);

  const existing = await kv.getJson<Builder>(K_BUILDER(handle));
  if (!existing) {
    const fresh: Builder = {
      handle,
      displayName: handle,
      bio: "New DAEMON builder.",
      tier: null,
      pro: false,
      itemsShipped: 0,
      totalInstalls: 0,
      reputation: 0,
      earningsUsdc: 0,
      joinedAt: new Date().toISOString(),
    };
    await kv.setJson(K_BUILDER(handle), fresh);
    await kv.sadd(K_BUILDERS, handle);
  }

  return { ok: true, handle };
}

export async function getBuilder(handle: string): Promise<Builder | null> {
  return kv.getJson<Builder>(K_BUILDER(handle));
}

export async function listBuilders(): Promise<Builder[]> {
  const handles = await kv.smembers(K_BUILDERS);
  if (handles.length === 0) return [];
  const builders = await Promise.all(
    handles.map((h) => kv.getJson<Builder>(K_BUILDER(h))),
  );
  return builders
    .filter((b): b is Builder => Boolean(b))
    .sort((a, b) => b.reputation - a.reputation);
}

/**
 * Submit a Forge listing for review. Auto-approves and publishes immediately.
 * Wire an admin moderation route later by defaulting status to "submitted".
 */
export async function submitForgeListing(input: {
  wallet: string;
  creator: string;
  name: string;
  category: ForgeCategory;
  description: string;
  priceUsdc: number;
}) {
  const slug = await freshSlug(input.name, input.creator);
  const submission: ForgeSubmission = {
    id: cryptoId(),
    at: new Date().toISOString(),
    wallet: input.wallet,
    creator: input.creator,
    name: input.name,
    category: input.category,
    description: input.description,
    priceUsdc: input.priceUsdc,
    status: "approved",
  };
  await kv.lpush(K_SUBMISSIONS, JSON.stringify(submission));

  const item: ForgeItem = {
    slug,
    name: input.name,
    tagline: input.description.slice(0, 120),
    category: input.category,
    priceUsdc: input.priceUsdc,
    requiresTier: null,
    creator: input.creator,
    installs: 0,
    rating: 0,
    version: "0.1.0",
    updatedAt: new Date().toISOString(),
    description: input.description,
    highlights: [],
  };
  await kv.setJson(K_LISTING(slug), item);
  await kv.sadd(K_LISTINGS, slug);

  const builder = await kv.getJson<Builder>(K_BUILDER(input.creator));
  if (builder) {
    builder.itemsShipped += 1;
    await kv.setJson(K_BUILDER(builder.handle), builder);
  }

  return { submission, item };
}

export async function listSubmissions(): Promise<ForgeSubmission[]> {
  const raw = await kv.lrange(K_SUBMISSIONS, 0, -1);
  return raw
    .map((entry) => {
      try {
        return JSON.parse(entry) as ForgeSubmission;
      } catch {
        return null;
      }
    })
    .filter((s): s is ForgeSubmission => Boolean(s));
}

async function freshSlug(name: string, creator: string): Promise<string> {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const seed = `${base}-${creator.toLowerCase()}`;
  const exists = await kv.getJson<ForgeItem>(K_LISTING(seed));
  if (!exists) return seed;
  return `${seed}-${Math.random().toString(36).slice(2, 6)}`;
}

function cryptoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}
