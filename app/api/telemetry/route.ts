import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KEY_PREFIX = "daemon:telemetry:v1";
const MAX_STRING = 160;

type TelemetryEventName = "first_open" | "daily_active";
type RedisValue = string | number;
type RedisCommand = RedisValue[];

type TelemetryPayload = {
  schemaVersion?: unknown;
  eventName?: unknown;
  eventId?: unknown;
  installId?: unknown;
  timestamp?: unknown;
  appVersion?: unknown;
  platform?: unknown;
  arch?: unknown;
  osVersion?: unknown;
  locale?: unknown;
  isPackaged?: unknown;
  isBackfill?: unknown;
  estimatedFirstSeenAt?: unknown;
};

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ??
    process.env.UPSTASH_REDIS_REST_TOKEN ??
    process.env.KV_REST_API_READ_WRITE_TOKEN;
  return url && token ? { url, token } : null;
}

function sanitize(value: unknown, max = MAX_STRING): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function safeTimestamp(value: unknown): number {
  const now = Date.now();
  if (typeof value !== "number" || !Number.isFinite(value)) return now;
  if (value < 1_600_000_000_000 || value > now + 24 * 60 * 60 * 1000) return now;
  return Math.trunc(value);
}

function optionalTimestamp(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (value < 1_600_000_000_000 || value > Date.now() + 24 * 60 * 60 * 1000) return null;
  return Math.trunc(value);
}

function utcDay(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10);
}

async function redisPipeline(commands: RedisCommand[]) {
  const config = redisConfig();
  if (!config) {
    return { ok: false as const, response: NextResponse.json({ error: "Telemetry storage is not configured" }, { status: 501 }) };
  }

  const res = await fetch(`${config.url.replace(/\/$/, "")}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Telemetry Redis pipeline failed:", res.status, text.slice(0, 400));
    return { ok: false as const, response: NextResponse.json({ error: "Telemetry storage failed" }, { status: 502 }) };
  }

  return { ok: true as const };
}

export async function POST(req: NextRequest) {
  let payload: TelemetryPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (payload.schemaVersion !== 1) {
    return NextResponse.json({ error: "Unsupported telemetry schema" }, { status: 400 });
  }

  const eventName = sanitize(payload.eventName, 40) as TelemetryEventName;
  if (eventName !== "first_open" && eventName !== "daily_active") {
    return NextResponse.json({ error: "Unsupported telemetry event" }, { status: 400 });
  }

  const installId = sanitize(payload.installId, 64).toLowerCase();
  if (!isUuid(installId)) {
    return NextResponse.json({ error: "Invalid install ID" }, { status: 400 });
  }

  const eventId = sanitize(payload.eventId, 64).toLowerCase();
  if (!isUuid(eventId)) {
    return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
  }

  const timestamp = safeTimestamp(payload.timestamp);
  const day = utcDay(timestamp);
  const estimatedFirstSeenAt = optionalTimestamp(payload.estimatedFirstSeenAt);
  const isBackfill = payload.isBackfill === true;
  const installKey = `${KEY_PREFIX}:install:${installId}`;
  const eventsKey = `${KEY_PREFIX}:events:${day}`;

  const commands: RedisCommand[] = [
    ["SET", `${KEY_PREFIX}:events:seen:${eventId}`, "1", "EX", 60 * 60 * 24 * 14, "NX"],
    ["PFADD", `${KEY_PREFIX}:installs:all`, installId],
    ["PFADD", `${KEY_PREFIX}:active:${day}`, installId],
    ["HINCRBY", eventsKey, eventName, 1],
    ["HSETNX", installKey, "firstSeenAt", timestamp],
    ["HSET", installKey,
      "lastSeenAt", timestamp,
      "appVersion", sanitize(payload.appVersion, 64),
      "platform", sanitize(payload.platform, 32),
      "arch", sanitize(payload.arch, 32),
      "osVersion", sanitize(payload.osVersion, 96),
      "locale", sanitize(payload.locale, 32),
      "isPackaged", payload.isPackaged === true ? "true" : "false",
    ],
  ];

  if (estimatedFirstSeenAt !== null) {
    commands.push(["HSETNX", installKey, "estimatedFirstSeenAt", estimatedFirstSeenAt]);
  }

  if (eventName === "first_open") {
    commands.push(["PFADD", `${KEY_PREFIX}:first_open:all`, installId]);
    commands.push(["PFADD", `${KEY_PREFIX}:first_open:${day}`, installId]);
  }

  if (isBackfill) {
    commands.push(["PFADD", `${KEY_PREFIX}:backfilled:all`, installId]);
    commands.push(["PFADD", `${KEY_PREFIX}:backfilled:${day}`, installId]);
  }

  const result = await redisPipeline(commands);
  if (!result.ok) return result.response;

  return NextResponse.json({ ok: true });
}
