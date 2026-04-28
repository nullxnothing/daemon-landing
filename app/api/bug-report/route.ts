import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GITHUB_REPO = "nullxnothing/daemon";
const MAX_TITLE = 200;
const MAX_BODY = 8000;
const MAX_META = 4000;

type BugReportPayload = {
  title?: unknown;
  description?: unknown;
  meta?: unknown;
};

type Meta = {
  version?: string;
  platform?: string;
  osVersion?: string;
  arch?: string;
  electronVersion?: string;
  nodeVersion?: string;
  locale?: string;
  activePanel?: string;
  logs?: string;
};

function sanitize(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function formatMeta(meta: Meta | undefined): string {
  if (!meta || typeof meta !== "object") return "";
  const rows: string[] = [];
  if (meta.version) rows.push(`- **DAEMON version:** \`${sanitize(meta.version, 64)}\``);
  if (meta.platform) rows.push(`- **Platform:** \`${sanitize(meta.platform, 32)}\``);
  if (meta.osVersion) rows.push(`- **OS version:** \`${sanitize(meta.osVersion, 128)}\``);
  if (meta.arch) rows.push(`- **Arch:** \`${sanitize(meta.arch, 32)}\``);
  if (meta.electronVersion) rows.push(`- **Electron:** \`${sanitize(meta.electronVersion, 32)}\``);
  if (meta.nodeVersion) rows.push(`- **Node:** \`${sanitize(meta.nodeVersion, 32)}\``);
  if (meta.locale) rows.push(`- **Locale:** \`${sanitize(meta.locale, 32)}\``);
  if (meta.activePanel) rows.push(`- **Active panel:** \`${sanitize(meta.activePanel, 64)}\``);
  return rows.join("\n");
}

export async function POST(req: NextRequest) {
  const token = process.env.GITHUB_REPORT_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 },
    );
  }

  let payload: BugReportPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = sanitize(payload.title, MAX_TITLE);
  const description = sanitize(payload.description, MAX_BODY);
  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required" },
      { status: 400 },
    );
  }

  const meta = payload.meta as Meta | undefined;
  const logs = sanitize(meta?.logs, MAX_META);
  const metaBlock = formatMeta(meta);

  const body = [
    "_Submitted via in-app bug reporter_",
    "",
    "## Description",
    description,
    "",
    "## Environment",
    metaBlock || "_No environment data provided._",
    logs ? "\n## Recent logs\n```\n" + logs + "\n```" : "",
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: `[user-report] ${title}`,
      body,
      labels: ["user-report"],
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("GitHub issue create failed:", res.status, errText);
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 502 },
    );
  }

  const issue = (await res.json()) as { number?: number; html_url?: string };
  return NextResponse.json({
    ok: true,
    number: issue.number,
    url: issue.html_url,
  });
}
