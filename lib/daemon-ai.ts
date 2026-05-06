import type { AiRunMode } from "@/lib/portal-store";

type ChatCompletionResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  usage?: { total_tokens?: number };
  error?: { message?: string };
};

const MODE_CREDITS: Record<AiRunMode, number> = {
  fast: 50,
  builder: 150,
  deep: 400,
};

const MODE_SYSTEM: Record<AiRunMode, string> = {
  fast: "You are Daemon AI. Give concise, practical answers for developers building with DAEMON.",
  builder:
    "You are Daemon AI in builder mode. Help users plan and ship DAEMON, Solana, agent, and token-utility work with concrete steps and implementation detail.",
  deep:
    "You are Daemon AI in deep mode. Think carefully, call out assumptions, and produce production-minded technical guidance for DAEMON builders.",
};

export function aiCreditCost(mode: AiRunMode, totalTokens?: number) {
  const base = MODE_CREDITS[mode];
  if (!totalTokens) return base;
  return Math.max(base, Math.ceil(totalTokens / 20));
}

export function isAiMode(value: string): value is AiRunMode {
  return value === "fast" || value === "builder" || value === "deep";
}

export function daemonAiConfigured() {
  if (process.env.DAEMON_AI_STATUS === "coming_soon") return false;
  return Boolean(process.env.DAEMON_AI_API_KEY ?? process.env.OPENAI_API_KEY);
}

export async function runDaemonAi(input: {
  prompt: string;
  mode: AiRunMode;
}): Promise<{ response: string; totalTokens?: number }> {
  const apiKey = process.env.DAEMON_AI_API_KEY ?? process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("DAEMON_AI_API_KEY or OPENAI_API_KEY is not configured.");
  }

  const baseUrl = process.env.DAEMON_AI_API_BASE ?? "https://api.openai.com/v1";
  const model =
    process.env.DAEMON_AI_MODEL ??
    (input.mode === "deep" ? "gpt-4o" : "gpt-4o-mini");

  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: MODE_SYSTEM[input.mode] },
        { role: "user", content: input.prompt },
      ],
      temperature: input.mode === "deep" ? 0.4 : 0.2,
    }),
  });

  const body = (await res.json().catch(() => null)) as ChatCompletionResponse | null;
  if (!res.ok) {
    throw new Error(body?.error?.message ?? "Daemon AI provider request failed.");
  }

  const response = body?.choices?.[0]?.message?.content?.trim();
  if (!response) {
    throw new Error("Daemon AI returned an empty response.");
  }

  return { response, totalTokens: body?.usage?.total_tokens };
}
