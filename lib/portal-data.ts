import type { AccessTierId } from "@/lib/access";

export type ForgeCategory = "agent" | "plugin" | "mcp" | "skill" | "automation";

export type ForgeItem = {
  slug: string;
  name: string;
  tagline: string;
  category: ForgeCategory;
  priceUsdc: number;
  requiresTier: AccessTierId | null;
  creator: string;
  installs: number;
  rating: number;
  version: string;
  updatedAt: string;
  description: string;
  highlights: string[];
};

export type Builder = {
  handle: string;
  displayName: string;
  bio: string;
  tier: AccessTierId | null;
  pro: boolean;
  itemsShipped: number;
  totalInstalls: number;
  reputation: number;
  earningsUsdc: number;
  joinedAt: string;
};

export type CreditBundle = {
  id: string;
  label: string;
  aiCredits: number;
  automationCredits: number;
  priceUsdc: number;
  bestFor: string;
};

export const CREDIT_BUNDLES: CreditBundle[] = [
  {
    id: "starter",
    label: "Starter",
    aiCredits: 1_000,
    automationCredits: 200,
    priceUsdc: 5,
    bestFor: "Trying Daemon AI on a single project",
  },
  {
    id: "operator",
    label: "Operator",
    aiCredits: 5_000,
    automationCredits: 1_500,
    priceUsdc: 20,
    bestFor: "Active daily use, multiple workspaces",
  },
  {
    id: "fleet",
    label: "Fleet",
    aiCredits: 25_000,
    automationCredits: 10_000,
    priceUsdc: 80,
    bestFor: "Teams running long-horizon agent jobs",
  },
];
