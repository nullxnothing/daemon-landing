import type { AccessTierId } from "@/lib/access";

export type GateRequirement =
  | { kind: "pro" }
  | { kind: "holder" }
  | { kind: "tier"; tier: AccessTierId };

export type GatedFeature = {
  id: string;
  label: string;
  copy: string;
  requires: GateRequirement;
  cta?: { label: string; href: string; external?: boolean };
};

export const GATED_FEATURES: GatedFeature[] = [
  {
    id: "pro-ide",
    label: "DAEMON Pro features",
    copy: "Pro skills, MCP sync, Arena Pro, and priority API in the desktop app.",
    requires: { kind: "pro" },
    cta: { label: "Open in app", href: "daemon://open" },
  },
  {
    id: "stakers-channel",
    label: "Private staker channel",
    copy: "First-line supporter access and direct line to the team.",
    requires: { kind: "tier", tier: "signal" },
    cta: { label: "Join Discord", href: "https://discord.gg/WYdGJY9Fx", external: true },
  },
  {
    id: "early-drops",
    label: "Early access to drops",
    copy: "See major product drops, partner surfaces, and ecosystem moments first.",
    requires: { kind: "tier", tier: "signal" },
  },
  {
    id: "vector-priority",
    label: "Priority queue for limited launches",
    copy: "Vector and above move first when scarce demos and partner activations open.",
    requires: { kind: "tier", tier: "vector" },
  },
  {
    id: "vector-briefings",
    label: "Private roadmap briefings",
    copy: "What DAEMON is shipping next, before it goes public.",
    requires: { kind: "tier", tier: "vector" },
  },
  {
    id: "apex-firstlook",
    label: "Apex first-look access",
    copy: "Direct first-look on major ecosystem pushes before public announcements.",
    requires: { kind: "tier", tier: "apex" },
  },
];

const TIER_ORDER: Record<AccessTierId, number> = { signal: 1, vector: 2, apex: 3 };

export function meetsRequirement(
  req: GateRequirement,
  ctx: { isPro: boolean; isHolder: boolean; tier: AccessTierId | null },
) {
  switch (req.kind) {
    case "pro":
      return ctx.isPro;
    case "holder":
      return ctx.isHolder;
    case "tier":
      return ctx.tier !== null && TIER_ORDER[ctx.tier] >= TIER_ORDER[req.tier];
  }
}

export function describeRequirement(req: GateRequirement): string {
  switch (req.kind) {
    case "pro":
      return "Requires DAEMON Pro";
    case "holder":
      return "Requires DAEMON holder status";
    case "tier":
      return `Requires ${req.tier[0].toUpperCase()}${req.tier.slice(1)} stake`;
  }
}
