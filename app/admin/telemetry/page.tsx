"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const TOKEN_KEY = "daemon-telemetry-admin-token";

type SummaryEvents = Record<string, number>;

type DailyPoint = {
  day: string;
  activeInstalls: number;
  events: SummaryEvents;
};

type SummaryData = {
  totalInstallIds: number;
  firstOpenInstallIds: number;
  backfilledInstallIds: number;
  activeToday: number;
  active7d: number;
  active30d: number;
  dailyActive: DailyPoint[];
};

type SummaryResponse = { ok: true; data: SummaryData } | { error: string };

export default function TelemetryAdminPage() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [windowDays, setWindowDays] = useState(30);
  const [data, setData] = useState<SummaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      setToken(stored);
      setTokenInput(stored);
    }
  }, []);

  const load = useCallback(
    async (authToken: string, days: number) => {
      if (!authToken) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/telemetry/summary?days=${days}`, {
          headers: { Authorization: `Bearer ${authToken}` },
          cache: "no-store",
        });
        const json = (await res.json()) as SummaryResponse;
        if (!res.ok || "error" in json) {
          setError("error" in json ? json.error : `HTTP ${res.status}`);
          setData(null);
        } else {
          setData(json.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Request failed");
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (token) load(token, windowDays);
  }, [token, windowDays, load]);

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = tokenInput.trim();
    if (!trimmed) return;
    localStorage.setItem(TOKEN_KEY, trimmed);
    setToken(trimmed);
  };

  const handleClearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setTokenInput("");
    setData(null);
  };

  const peakDay = useMemo(() => {
    if (!data?.dailyActive.length) return null;
    return data.dailyActive.reduce((max, point) =>
      point.activeInstalls > max.activeInstalls ? point : max,
    );
  }, [data]);

  const maxActive = useMemo(() => {
    if (!data?.dailyActive.length) return 0;
    return Math.max(1, ...data.dailyActive.map((d) => d.activeInstalls));
  }, [data]);

  return (
    <>
      <Header />
      <main className="relative px-6 pt-28 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
                Internal · Admin only
              </p>
              <h1 className="mt-3 text-[clamp(2rem,3.5vw,2.8rem)] font-bold tracking-[-0.03em]">
                Telemetry
              </h1>
              <p className="mt-2 text-[14px] text-muted">
                Live install + active-user metrics from the desktop app.
              </p>
            </div>
            {token && (
              <div className="flex items-center gap-2">
                <select
                  value={windowDays}
                  onChange={(e) => setWindowDays(Number(e.target.value))}
                  className="rounded-md border border-white/10 bg-white/[0.025] px-3 py-2 text-[13px] text-foreground"
                >
                  <option value={7}>Last 7 days</option>
                  <option value={14}>Last 14 days</option>
                  <option value={30}>Last 30 days</option>
                  <option value={60}>Last 60 days</option>
                  <option value={90}>Last 90 days</option>
                </select>
                <button
                  onClick={() => load(token, windowDays)}
                  className="rounded-md border border-white/10 bg-white/[0.025] px-4 py-2 text-[13px] font-semibold text-foreground transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  {loading ? "Loading…" : "Refresh"}
                </button>
                <button
                  onClick={handleClearToken}
                  className="rounded-md border border-white/10 bg-transparent px-4 py-2 text-[13px] text-muted-foreground transition hover:text-foreground"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          {!token && (
            <form
              onSubmit={handleSaveToken}
              className="mt-10 max-w-md rounded-lg border border-white/[0.055] bg-card/80 p-6"
            >
              <label className="block text-[13px] font-semibold text-foreground">
                Admin token
              </label>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Set <code className="font-mono">TELEMETRY_ADMIN_TOKEN</code> in Vercel env. Stored locally in this browser only.
              </p>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Paste token"
                className="mt-4 w-full rounded-md border border-white/10 bg-white/[0.025] px-3 py-2 font-mono text-[13px] text-foreground outline-none focus:border-accent/40"
                autoFocus
              />
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-accent px-4 py-2.5 text-[13px] font-semibold text-accent-foreground transition hover:brightness-110"
              >
                Sign in
              </button>
            </form>
          )}

          {error && token && (
            <div className="mt-8 rounded-lg border border-red-500/30 bg-red-500/[0.04] p-5 text-[14px] text-red-300">
              {error === "Unauthorized"
                ? "Token rejected. Check the value of TELEMETRY_ADMIN_TOKEN in Vercel."
                : error}
            </div>
          )}

          {data && (
            <>
              <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Stat label="Total installs" value={data.totalInstallIds} hint="All-time unique install IDs" />
                <Stat label="First-opens" value={data.firstOpenInstallIds} hint="Distinct first_open events" />
                <Stat label="Active today" value={data.activeToday} hint={`UTC ${utcToday()}`} />
                <Stat label="Active · 7d" value={data.active7d} hint="Unique installs, last 7 days" />
                <Stat label="Active · 30d" value={data.active30d} hint="Unique installs, last 30 days" />
                <Stat label="Backfilled" value={data.backfilledInstallIds} hint="Installs counted from prior runs" />
              </section>

              <section className="mt-10">
                <div className="flex items-end justify-between">
                  <h2 className="text-[1.4rem] font-semibold tracking-[-0.02em]">
                    Daily active installs
                  </h2>
                  {peakDay && (
                    <span className="font-mono text-[12px] text-muted-foreground">
                      Peak: {peakDay.activeInstalls} on {peakDay.day}
                    </span>
                  )}
                </div>
                <div className="mt-5 overflow-x-auto rounded-lg border border-white/[0.055] bg-card/80 p-6">
                  <div className="flex h-48 min-w-full items-end gap-1">
                    {data.dailyActive.map((point) => {
                      const heightPct = (point.activeInstalls / maxActive) * 100;
                      return (
                        <div
                          key={point.day}
                          className="group relative flex h-full flex-1 min-w-[6px] flex-col justify-end"
                          title={`${point.day}: ${point.activeInstalls} active`}
                        >
                          <div
                            className="w-full rounded-t-sm bg-accent/70 transition group-hover:bg-accent"
                            style={{ height: `${Math.max(heightPct, point.activeInstalls > 0 ? 2 : 0)}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
                    <span>{data.dailyActive[0]?.day}</span>
                    <span>{data.dailyActive[data.dailyActive.length - 1]?.day}</span>
                  </div>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-[1.4rem] font-semibold tracking-[-0.02em]">
                  Recent days
                </h2>
                <div className="mt-5 overflow-hidden rounded-lg border border-white/[0.055]">
                  <table className="w-full text-[13px]">
                    <thead className="bg-white/[0.025] text-left">
                      <tr>
                        <Th>Day</Th>
                        <Th right>Active</Th>
                        <Th right>first_open</Th>
                        <Th right>daily_active</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...data.dailyActive].reverse().slice(0, 14).map((point) => (
                        <tr
                          key={point.day}
                          className="border-t border-white/[0.04]"
                        >
                          <td className="px-5 py-3 font-mono text-foreground">{point.day}</td>
                          <td className="px-5 py-3 text-right font-semibold text-foreground">
                            {point.activeInstalls}
                          </td>
                          <td className="px-5 py-3 text-right text-muted">
                            {point.events.first_open ?? 0}
                          </td>
                          <td className="px-5 py-3 text-right text-muted">
                            {point.events.daily_active ?? 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {loading && !data && token && (
            <div className="mt-10 text-[14px] text-muted-foreground">Loading…</div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="rounded-lg border border-white/[0.055] bg-card/80 p-5">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-3 text-[2rem] font-bold tracking-[-0.02em] text-foreground">
        {value.toLocaleString()}
      </div>
      <div className="mt-1 text-[12px] text-muted">{hint}</div>
    </div>
  );
}

function Th({ children, right = false }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      className={`px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground ${right ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}

function utcToday() {
  return new Date().toISOString().slice(0, 10);
}
