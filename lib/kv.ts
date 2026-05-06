import { kv as vercelKv } from "@vercel/kv";

/**
 * KV abstraction. Uses Vercel KV (Upstash) when KV_REST_API_URL+KV_REST_API_TOKEN
 * are set in the environment; otherwise falls back to in-process Maps so local
 * development works without provisioning anything.
 *
 * In-memory fallback is per-process and resets on every reload. Production must
 * set the KV env vars.
 */

const KV_ENABLED = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
);

const memJson = new Map<string, unknown>();
const memSets = new Map<string, Set<string>>();
const memLists = new Map<string, string[]>();

export const kv = {
  enabled: KV_ENABLED,

  async getJson<T>(key: string): Promise<T | null> {
    if (KV_ENABLED) {
      const value = await vercelKv.get<T>(key);
      return value ?? null;
    }
    return (memJson.get(key) as T | undefined) ?? null;
  },

  async setJson<T>(key: string, value: T): Promise<void> {
    if (KV_ENABLED) {
      await vercelKv.set(key, value as object);
      return;
    }
    memJson.set(key, value);
  },

  async del(key: string): Promise<void> {
    if (KV_ENABLED) {
      await vercelKv.del(key);
      return;
    }
    memJson.delete(key);
    memSets.delete(key);
    memLists.delete(key);
  },

  async sadd(key: string, member: string): Promise<void> {
    if (KV_ENABLED) {
      await vercelKv.sadd(key, member);
      return;
    }
    let set = memSets.get(key);
    if (!set) {
      set = new Set();
      memSets.set(key, set);
    }
    set.add(member);
  },

  async smembers(key: string): Promise<string[]> {
    if (KV_ENABLED) {
      return await vercelKv.smembers(key);
    }
    return [...(memSets.get(key) ?? [])];
  },

  async lpush(key: string, value: string): Promise<void> {
    if (KV_ENABLED) {
      await vercelKv.lpush(key, value);
      return;
    }
    let list = memLists.get(key);
    if (!list) {
      list = [];
      memLists.set(key, list);
    }
    list.unshift(value);
  },

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    if (KV_ENABLED) {
      return await vercelKv.lrange(key, start, stop);
    }
    const list = memLists.get(key) ?? [];
    const end = stop === -1 ? list.length : stop + 1;
    return list.slice(start, end);
  },
};
