import { NextRequest, NextResponse } from "next/server";
import {
  aiCreditCost,
  daemonAiConfigured,
  isAiMode,
  runDaemonAi,
} from "@/lib/daemon-ai";
import { requireWallet } from "@/lib/portal-auth";
import {
  completeAiRun,
  createAiRun,
  failAiRun,
  getWalletState,
  listAiRuns,
} from "@/lib/portal-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const wallet = await requireWallet();
  if (!wallet) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }

  const runs = await listAiRuns(wallet);
  return NextResponse.json({ ok: true, data: { runs } });
}

export async function POST(request: NextRequest) {
  const wallet = await requireWallet();
  if (!wallet) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  if (!daemonAiConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Daemon AI is coming soon." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { prompt?: string; mode?: string }
    | null;
  const prompt = body?.prompt?.trim();
  const mode = body?.mode && isAiMode(body.mode) ? body.mode : "fast";
  if (!prompt || prompt.length < 4) {
    return NextResponse.json({ ok: false, error: "Prompt is required." }, { status: 400 });
  }
  if (prompt.length > 8000) {
    return NextResponse.json(
      { ok: false, error: "Prompt is too long. Keep it under 8,000 characters." },
      { status: 400 },
    );
  }

  const minimumCost = aiCreditCost(mode);
  const state = await getWalletState(wallet);
  if (state.credits.ai < minimumCost) {
    return NextResponse.json(
      { ok: false, error: `Insufficient AI credits. This run needs at least ${minimumCost}.` },
      { status: 402 },
    );
  }

  const run = await createAiRun({ wallet, mode, prompt, creditsCharged: minimumCost });
  try {
    const result = await runDaemonAi({ prompt, mode });
    const creditsCharged = aiCreditCost(mode, result.totalTokens);
    const completed = await completeAiRun(run, {
      response: result.response,
      creditsCharged,
    });
    if (!completed.ok) {
      return NextResponse.json({ ok: false, error: completed.error }, { status: 402 });
    }

    return NextResponse.json({
      ok: true,
      data: {
        run: completed.run,
        credits: completed.state.credits,
      },
    });
  } catch (error) {
    const failed = await failAiRun(
      run,
      error instanceof Error ? error.message : "Daemon AI failed.",
    );
    return NextResponse.json({ ok: false, error: failed.error }, { status: 500 });
  }
}
