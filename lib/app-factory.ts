export type AppFactoryBuildType =
  | "Website"
  | "Dashboard"
  | "Telegram bot"
  | "Raid board"
  | "Token gate"
  | "Updates";

export type AppFactoryRequest = {
  wallet?: string;
  tokenAddress: string;
  prompt: string;
  buildType: AppFactoryBuildType;
};

export type AppFactoryModule = {
  title: string;
  description: string;
  files: string[];
};

export type AppFactoryBlueprint = {
  projectName: string;
  buildType: AppFactoryBuildType;
  tokenAddress: string;
  wallet?: string;
  summary: string;
  modules: AppFactoryModule[];
  suggestedStack: string[];
  nextSteps: string[];
  openInDaemonPayload: {
    version: 1;
    source: "daemon-web-app-factory";
    projectName: string;
    tokenAddress: string;
    buildType: AppFactoryBuildType;
    prompt: string;
    modules: string[];
  };
};

const allowedBuildTypes: AppFactoryBuildType[] = [
  "Website",
  "Dashboard",
  "Telegram bot",
  "Raid board",
  "Token gate",
  "Updates",
];

const buildTypeModules: Record<AppFactoryBuildType, AppFactoryModule[]> = {
  Website: [
    {
      title: "Token landing page",
      description: "Hero, token identity, CA copy block, social links, chart embed, and buy routing.",
      files: ["app/page.tsx", "components/token-hero.tsx", "components/chart-panel.tsx"],
    },
    {
      title: "Community sections",
      description: "Roadmap, holder callout, project updates, and clean CTA sections for the token community.",
      files: ["components/community.tsx", "components/roadmap.tsx"],
    },
    {
      title: "Launch handoff",
      description: "A DAEMON-ready project spec that can be opened in the desktop workspace for customization.",
      files: ["daemon.project.json", "README.md"],
    },
  ],
  Dashboard: [
    {
      title: "Token intelligence dashboard",
      description: "Market stats, holder overview, liquidity card, chart area, and project links in one interface.",
      files: ["app/dashboard/page.tsx", "components/token-stats.tsx", "components/holder-table.tsx"],
    },
    {
      title: "Wallet-aware actions",
      description: "Wallet connection state, holder CTAs, token actions, and community links.",
      files: ["components/wallet-actions.tsx", "lib/token-data.ts"],
    },
    {
      title: "Launch handoff",
      description: "A DAEMON-ready project spec that can be opened in the desktop workspace for customization.",
      files: ["daemon.project.json", "README.md"],
    },
  ],
  "Telegram bot": [
    {
      title: "Community bot starter",
      description: "Command map for price checks, raid reminders, project updates, and holder-focused actions.",
      files: ["bot/index.ts", "bot/commands.ts", "bot/config.ts"],
    },
    {
      title: "Alert system",
      description: "Starter flow for buy alerts, update alerts, and community broadcast messages.",
      files: ["bot/alerts.ts", "bot/templates.ts"],
    },
    {
      title: "Launch handoff",
      description: "A DAEMON-ready project spec that can be opened in the desktop workspace for customization.",
      files: ["daemon.project.json", "README.md"],
    },
  ],
  "Raid board": [
    {
      title: "Raid coordination board",
      description: "Post queue, target links, completion states, and leaderboard-ready UI for community pushes.",
      files: ["app/raids/page.tsx", "components/raid-card.tsx", "components/raid-leaderboard.tsx"],
    },
    {
      title: "Content kit",
      description: "Reusable raid copy, announcement snippets, and project messaging prompts.",
      files: ["lib/raid-copy.ts", "components/content-kit.tsx"],
    },
    {
      title: "Launch handoff",
      description: "A DAEMON-ready project spec that can be opened in the desktop workspace for customization.",
      files: ["daemon.project.json", "README.md"],
    },
  ],
  "Token gate": [
    {
      title: "Holder-gated page",
      description: "Wallet connect, token balance gate, gated content area, and fallback access state.",
      files: ["app/holders/page.tsx", "components/token-gate.tsx", "lib/holder-check.ts"],
    },
    {
      title: "Private community resources",
      description: "Holder-only updates, files, links, and project resources behind the token gate.",
      files: ["components/holder-resources.tsx", "components/holder-updates.tsx"],
    },
    {
      title: "Launch handoff",
      description: "A DAEMON-ready project spec that can be opened in the desktop workspace for customization.",
      files: ["daemon.project.json", "README.md"],
    },
  ],
  Updates: [
    {
      title: "AI-powered update hub",
      description: "Project update feed, announcement builder, X post drafts, and community status cards.",
      files: ["app/updates/page.tsx", "components/update-feed.tsx", "components/post-generator.tsx"],
    },
    {
      title: "Launch content system",
      description: "Pinned post, launch thread, daily update, and community call-to-action templates.",
      files: ["lib/content-templates.ts", "components/announcement-kit.tsx"],
    },
    {
      title: "Launch handoff",
      description: "A DAEMON-ready project spec that can be opened in the desktop workspace for customization.",
      files: ["daemon.project.json", "README.md"],
    },
  ],
};

function sanitizeTokenAddress(value: string) {
  return value.trim().replace(/[^1-9A-HJ-NP-Za-km-z]/g, "").slice(0, 64);
}

function projectNameFromToken(tokenAddress: string, buildType: AppFactoryBuildType) {
  const prefix = tokenAddress.slice(0, 4).toUpperCase() || "TOKEN";
  return `${prefix} ${buildType}`;
}

function formatPrompt(prompt: string) {
  const trimmed = prompt.trim().replace(/\s+/g, " ");
  return trimmed.length > 220 ? `${trimmed.slice(0, 217)}...` : trimmed;
}

export function isValidBuildType(value: string): value is AppFactoryBuildType {
  return allowedBuildTypes.includes(value as AppFactoryBuildType);
}

export function createAppFactoryBlueprint(input: AppFactoryRequest): AppFactoryBlueprint {
  const tokenAddress = sanitizeTokenAddress(input.tokenAddress);
  const projectName = projectNameFromToken(tokenAddress, input.buildType);
  const formattedPrompt = formatPrompt(input.prompt);
  const modules = buildTypeModules[input.buildType] ?? buildTypeModules.Website;

  return {
    projectName,
    buildType: input.buildType,
    tokenAddress,
    wallet: input.wallet,
    summary: `${projectName} generated from a token CA and prompt. The first version focuses on ${input.buildType.toLowerCase()} infrastructure for a Solana community: ${formattedPrompt}`,
    modules,
    suggestedStack: [
      "Next.js app router",
      "React + TypeScript",
      "Solana wallet provider",
      "Token metadata lookup",
      "Chart/data provider integration",
      "Open in DAEMON project handoff",
    ],
    nextSteps: [
      "Review generated structure and copy.",
      "Open the project inside DAEMON for deeper editing.",
      "Connect real token data APIs, chart embeds, and wallet gates.",
      "Run build checks, customize branding, and deploy.",
    ],
    openInDaemonPayload: {
      version: 1,
      source: "daemon-web-app-factory",
      projectName,
      tokenAddress,
      buildType: input.buildType,
      prompt: formattedPrompt,
      modules: modules.map((module) => module.title),
    },
  };
}
