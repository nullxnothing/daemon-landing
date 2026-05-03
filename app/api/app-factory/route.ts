import { NextResponse } from "next/server";
import {
  createAppFactoryBlueprint,
  isValidBuildType,
  type AppFactoryBuildType,
} from "@/lib/app-factory";

type RequestBody = {
  wallet?: string;
  tokenAddress?: string;
  prompt?: string;
  buildType?: string;
};

function error(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  let body: RequestBody;

  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return error("Invalid JSON body.");
  }

  const tokenAddress = body.tokenAddress?.trim() ?? "";
  const prompt = body.prompt?.trim() ?? "";
  const buildType = body.buildType?.trim() ?? "";

  if (tokenAddress.length < 20) {
    return error("Enter a valid Solana token contract address.");
  }

  if (prompt.length < 12) {
    return error("Describe what you want DAEMON to generate.");
  }

  if (!isValidBuildType(buildType)) {
    return error("Choose a valid build type.");
  }

  const blueprint = createAppFactoryBlueprint({
    wallet: body.wallet,
    tokenAddress,
    prompt,
    buildType: buildType as AppFactoryBuildType,
  });

  return NextResponse.json({ ok: true, blueprint });
}
