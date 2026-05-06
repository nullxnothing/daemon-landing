import { cookies } from "next/headers";
import { SIWS_COOKIE, verifySessionToken } from "@/lib/siws";
import { getAccessStatus, type AccessStatus } from "@/lib/access";
import { getWalletState, ownedForgeItems, getBuilder } from "@/lib/portal-store";
import type { ForgeItem } from "@/lib/portal-data";

export type MePayload = {
  wallet: string;
  access: AccessStatus;
  credits: { ai: number; automation: number };
  forge: { ownedCount: number; owned: ForgeItem[] };
  builder: { handle: string | null; reputation: number; earnings: number } | null;
};

export async function getMe(): Promise<MePayload | null> {
  const jar = await cookies();
  const token = jar.get(SIWS_COOKIE)?.value;
  const wallet = jar.get(`${SIWS_COOKIE}_wallet`)?.value;
  if (!token || !wallet) return null;
  const session = verifySessionToken(token);
  if (!session || session.wallet !== wallet) return null;

  const [access, state, owned] = await Promise.all([
    getAccessStatus(wallet),
    getWalletState(wallet),
    ownedForgeItems(wallet),
  ]);
  const builderProfile = state.builderHandle ? await getBuilder(state.builderHandle) : null;

  return {
    wallet,
    access,
    credits: { ...state.credits },
    forge: { ownedCount: owned.length, owned },
    builder: builderProfile
      ? {
          handle: builderProfile.handle,
          reputation: builderProfile.reputation,
          earnings: builderProfile.earningsUsdc,
        }
      : state.builderHandle
        ? { handle: state.builderHandle, reputation: 0, earnings: 0 }
        : null,
  };
}
