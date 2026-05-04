import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KEY_PREFIX = "daemon:telemetry:v1";
type RedisValue = string | number;
type RedisCommand = RedisValue[];

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ??
    process.env.UPSTASH_REDIS_REST_TOKEN ??
    process.env.KV_REST_API_READ_WRITE_TOKEN;
  return url && token ? { url, token } : null;
}

function utcDay(offsetDays = 0): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function daysBack(days: number): string[] {
  return Array.from({ length: days }, (_, index) => utcDay(-index)).reverse();
}

async function redisPipeline(commands: RedisCommand[]) {
  const config = redisConfig();
  if (!config) throw new Error("Telemetry storage is not configured");

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
    throw new Error(`Telemetry storage failed (${res.status}): ${text.slice(0, 200)}`);
  }

  return (await res.json()) as Array<{ result?: unknown; error?: string }>;
}

function numberResult(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function hashResult(value: unknown): Record<string, number> {
  if (Array.isArray(value)) {
    const out: Record<string, number> = {};
    for (let i = 0; i < value.length; i += 2) {
      const key = typeof value[i] === "string" ? value[i] : "";
      if (!key) continue;
      out[key] = numberResult(value[i + 1]);
    }
    return out;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, numberResult(entry)]),
    );
  }
  return {};
}

function requireAdmin(request: NextRequest): NextResponse | null {
  const token = process.env.TELEMETRY_ADMIN_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Telemetry summary token is not configured" }, { status: 500 });
  }

  const header = request.headers.get("authorization") ?? "";
  const bearer = header.startsWith("Bearer ") ? header.slice("Bearer ".length).trim() : "";
  if (bearer !== token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const requestedDays = Number(request.nextUrl.searchParams.get("days") ?? "30");
  const windowDays = Number.isFinite(requestedDays)
    ? Math.min(Math.max(Math.trunc(requestedDays), 1), 90)
    : 30;
  const chartDays = daysBack(windowDays);
  const last7 = daysBack(7);
  const last30 = daysBack(30);
  const today = utcDay();

  const commands: RedisCommand[] = [
    ["PFCOUNT", `${KEY_PREFIX}:installs:all`],
    ["PFCOUNT", `${KEY_PREFIX}:first_open:all`],
    ["PFCOUNT", `${KEY_PREFIX}:backfilled:all`],
    ["PFCOUNT", `${KEY_PREFIX}:active:${today}`],
    ["PFCOUNT", ...last7.map((day) => `${KEY_PREFIX}:active:${day}`)],
    ["PFCOUNT", ...last30.map((day) => `${KEY_PREFIX}:active:${day}`)],
    ...chartDays.map((day): RedisCommand => ["PFCOUNT", `${KEY_PREFIX}:active:${day}`]),
    ...chartDays.map((day): RedisCommand => ["HGETALL", `${KEY_PREFIX}:events:${day}`]),
  ];

  try {
    const results = await redisPipeline(commands);
    const dailyStart = 6;
    const eventsStart = dailyStart + chartDays.length;

    const dailyActive = chartDays.map((day, index) => ({
      day,
      activeInstalls: numberResult(results[dailyStart + index]?.result),
      events: hashResult(results[eventsStart + index]?.result),
    }));

    return NextResponse.json({
      ok: true,
      data: {
        totalInstallIds: numberResult(results[0]?.result),
        firstOpenInstallIds: numberResult(results[1]?.result),
        backfilledInstallIds: numberResult(results[2]?.result),
        activeToday: numberResult(results[3]?.result),
        active7d: numberResult(results[4]?.result),
        active30d: numberResult(results[5]?.result),
        dailyActive,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Telemetry summary failed" },
      { status: 502 },
    );
  }
}
