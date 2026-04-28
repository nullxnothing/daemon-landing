"use client";

import { useState } from "react";

type TabId = "overview" | "connect" | "build" | "integrate" | "diagnose";
type Tone = "green" | "amber";
type StatusTone = "live" | "partial";

const WORKSPACE_TABS: { id: TabId; label: string; summary: string }[] = [
  { id: "overview", label: "Overview", summary: "Route the next high-leverage task through the right Solana surface." },
  { id: "connect", label: "Connect", summary: "Wallet, RPC, and MCP wiring for production-grade sessions." },
  { id: "build", label: "Build", summary: "Scaffolds, launch adapters, and deploy-ready runtime setup." },
  { id: "integrate", label: "Integrate", summary: "First-class ecosystem modules inside the same workspace." },
  { id: "diagnose", label: "Diagnose", summary: "Validator readiness, account checks, and launch debugging." },
];

const TAB_CONTENT: Record<
  TabId,
  {
    envBadge: string;
    envCopy: string;
    title: string;
    copy: string;
    featureTitle: string;
    nextTitle: string;
    cards: Array<{
      label: string;
      status: StatusTone;
      value: string;
      detail: string;
      ownedLabel: string;
      ownedValue: string;
    }>;
    features: Array<{ label: string; detail: string; tone: Tone }>;
    nextSteps: Array<{ text: string; tone: Tone }>;
  }
> = {
  overview: {
    envBadge: "STREAMFLOW + DAEMON",
    envCopy: "Staking, launch tooling, and Solana execution are moving into one branded access path.",
    title: "Choose the path that gets the project live faster.",
    copy:
      "Keep DAEMON open to everyone, then use Streamflow staking to unlock supporter access, earlier opportunities, and stronger priority without turning the IDE into a token gate.",
    featureTitle: "Why stake",
    nextTitle: "What ships next",
    cards: [
      {
        label: "Project",
        status: "live",
        value: "Solana workspace detected",
        detail:
          "DAEMON maps the repo to wallet, runtime, launch, and deploy surfaces so a new project starts with an execution path instead of a blank editor.",
        ownedLabel: "Current route",
        ownedValue: "Operator workspace",
      },
      {
        label: "Staking",
        status: "live",
        value: "Streamflow access path",
        detail:
          "Token utility now has a native home on the site: verify the wallet, open the Streamflow pool, and hand access back into DAEMON.",
        ownedLabel: "Supporter benefit",
        ownedValue: "Pro, priority, and early access",
      },
      {
        label: "Launch",
        status: "partial",
        value: "Protocol adapters",
        detail:
          "Pump.fun, Raydium, Meteora, and broader launch tooling are being collapsed into one execution surface instead of scattered setup steps.",
        ownedLabel: "Direction",
        ownedValue: "One workspace from idea to go-live",
      },
    ],
    features: [
      {
        label: "Early access",
        detail: "Major updates, launches, and ecosystem opportunities reach stakers before public rollout.",
        tone: "green",
      },
      {
        label: "Priority access",
        detail: "When scarce spots, betas, or partner activations open, stakers go first.",
        tone: "amber",
      },
      {
        label: "Staker status",
        detail: "Supporters carry visible early-backer status across future DAEMON community and ecosystem surfaces.",
        tone: "green",
      },
      {
        label: "Operator fit",
        detail: "The landing page can explain why DAEMON matters to Solana builders before asking them to commit capital.",
        tone: "green",
      },
    ],
    nextSteps: [
      { text: "Finalize the production Streamflow pool and publish the branded staking route.", tone: "green" },
      { text: "Wire desktop Pro to consume staking-based entitlement from the same access model.", tone: "amber" },
      { text: "Roll out supporter tiers that feel like access, not just a token dashboard.", tone: "green" },
      { text: "Keep the staking story tied to actual Solana workflows in the app.", tone: "amber" },
    ],
  },
  connect: {
    envBadge: "WALLET + MCP LAYER",
    envCopy: "Wallet route, RPC provider, and docs MCPs should feel like one connection surface.",
    title: "Make Solana connection state obvious before anything signs.",
    copy:
      "The app should show wallet, provider, and project-ready MCP context together so DAEMON can move from landing to execution without hidden setup debt.",
    featureTitle: "Connection coverage",
    nextTitle: "Connection follow-through",
    cards: [
      {
        label: "Wallet",
        status: "live",
        value: "Project wallet route",
        detail: "Connection and signing are attached to the active Solana project instead of being guessed per action.",
        ownedLabel: "Shared path",
        ownedValue: "Wallet, swaps, launches, and gated access",
      },
      {
        label: "Provider",
        status: "live",
        value: "Helius transport",
        detail: "Indexed reads and runtime visibility make Solana state feel stable across the app and the landing demo.",
        ownedLabel: "Core read path",
        ownedValue: "Balances, launch context, and monitoring",
      },
      {
        label: "MCPs",
        status: "live",
        value: "Solana + Phantom docs",
        detail: "Tooling and wallet references stay close to the product instead of forcing users into a docs scavenger hunt.",
        ownedLabel: "Operator surface",
        ownedValue: "Docs, account inspect, and deployment context",
      },
    ],
    features: [
      { label: "Wallet assignment", detail: "Show which wallet DAEMON will use before opening launch or execution flows.", tone: "green" },
      { label: "RPC visibility", detail: "Keep transport source obvious so users know what runtime the app is relying on.", tone: "green" },
      { label: "Phantom-first path", detail: "Explain the wallet handoff in product language, not generic Web3 setup language.", tone: "green" },
      { label: "Fallback strategy", detail: "Secondary providers and extra MCPs should layer in cleanly when needed.", tone: "amber" },
    ],
    nextSteps: [
      { text: "Expose the active wallet route inside more launch and staking surfaces.", tone: "green" },
      { text: "Keep Solana MCP and docs MCP states visible in one scrollable section.", tone: "green" },
      { text: "Avoid split connection setups that fragment the user’s mental model.", tone: "amber" },
      { text: "Use the same connection story on landing and in desktop.", tone: "green" },
    ],
  },
  build: {
    envBadge: "SCaffold + RUNTIME",
    envCopy: "Build flows should inherit the same Solana defaults instead of rebuilding setup every time.",
    title: "Scaffold and ship with the runtime already implied.",
    copy:
      "The strongest DAEMON experience is when new Solana projects, token launches, and supporter-only flows all inherit the same operational defaults from day one.",
    featureTitle: "Build surfaces",
    nextTitle: "Build direction",
    cards: [
      {
        label: "Project starter",
        status: "live",
        value: "Runtime-aware scaffold",
        detail: "New projects should land with wallet, provider, and launch expectations already encoded into the setup path.",
        ownedLabel: "Start here",
        ownedValue: "Project starter, toolbox, and templates",
      },
      {
        label: "Launch stack",
        status: "partial",
        value: "One launch shell",
        detail: "Pump.fun, Raydium, and Meteora support need to feel like one DAEMON launch story instead of separate products.",
        ownedLabel: "Execution scope",
        ownedValue: "Token setup, launch submit, and monitoring",
      },
      {
        label: "Access model",
        status: "partial",
        value: "Staking-aware entitlement",
        detail: "Supporter gating should plug into real workflows like priority access, not sit beside the product as a novelty.",
        ownedLabel: "Commercial layer",
        ownedValue: "Pro, access, and early launches",
      },
    ],
    features: [
      { label: "Scaffold defaults", detail: "Seed new Solana projects with the right runtime assumptions.", tone: "green" },
      { label: "Launch adapters", detail: "Collapse major Solana launch paths into one center-panel action model.", tone: "green" },
      { label: "Builder value", detail: "The feature story should read like operator leverage, not just token utility.", tone: "green" },
      { label: "Entitlements", detail: "Supporter access still needs clearer product-level consumption points.", tone: "amber" },
    ],
    nextSteps: [
      { text: "Use the same runtime defaults across launch, staking, and deploy surfaces.", tone: "green" },
      { text: "Clarify what supporter-only product access actually unlocks in the app.", tone: "amber" },
      { text: "Keep build workflows discoverable from the landing shell, not just the desktop.", tone: "green" },
      { text: "Avoid introducing one-off flows that bypass the Solana workspace model.", tone: "amber" },
    ],
  },
  integrate: {
    envBadge: "ECOSYSTEM MODULES",
    envCopy: "The Solana section should show how DAEMON plugs into the broader ecosystem without losing product coherence.",
    title: "Show integrations as part of the workspace, not outside of it.",
    copy:
      "The point is not just to list protocols. It is to show that DAEMON can hold wallet, launch, access, and ecosystem context in one operating surface.",
    featureTitle: "Integration wins",
    nextTitle: "Integration priorities",
    cards: [
      {
        label: "Streamflow",
        status: "live",
        value: "Staking partner route",
        detail: "Staking becomes a native part of the DAEMON access story instead of a generic partner link.",
        ownedLabel: "Partner role",
        ownedValue: "Supporter access and branded staking",
      },
      {
        label: "Launch protocols",
        status: "live",
        value: "Pump.fun / Raydium / Meteora",
        detail: "Major Solana launch surfaces are already part of the product language and should stay visible in the landing shell.",
        ownedLabel: "Operator benefit",
        ownedValue: "One launch story across ecosystems",
      },
      {
        label: "Future modules",
        status: "partial",
        value: "Wallet + protocol expansion",
        detail: "More ecosystem support should extend the same workspace model rather than creating parallel UI systems.",
        ownedLabel: "Constraint",
        ownedValue: "Integrate without fragmenting UX",
      },
    ],
    features: [
      { label: "Branded partner path", detail: "Supporters should understand why Streamflow exists in the DAEMON story.", tone: "green" },
      { label: "Protocol legitimacy", detail: "Launch tooling gives the product real Solana-specific depth.", tone: "green" },
      { label: "Composability", detail: "Wallet, access, and protocol states can all live inside one surface.", tone: "green" },
      { label: "Sprawl risk", detail: "Each new integration must strengthen the workspace instead of cluttering it.", tone: "amber" },
    ],
    nextSteps: [
      { text: "Keep the ecosystem story anchored on actual workflows, not logos or partner count.", tone: "green" },
      { text: "Use landing interactions to preview how protocol modules behave in the desktop app.", tone: "green" },
      { text: "Let the Solana section scroll through richer integration detail without collapsing the shell.", tone: "green" },
      { text: "Be selective about what earns first-class placement.", tone: "amber" },
    ],
  },
  diagnose: {
    envBadge: "READINESS + DEBUG",
    envCopy: "Scrolling debug state is as important as launch polish if you want Solana builders to trust the product.",
    title: "Keep readiness, failure states, and next moves visible in the same workspace.",
    copy:
      "A convincing Solana product has to show that it can help when things are missing, miswired, or half-configured. The center panel should support that, including longer content and scroll.",
    featureTitle: "Debug coverage",
    nextTitle: "Debug follow-up",
    cards: [
      {
        label: "Validator",
        status: "live",
        value: "solana-test-validator ready",
        detail: "Validator and faucet state should remain visible while users move between launch, staking, and execution flows.",
        ownedLabel: "Runtime health",
        ownedValue: "Local execution and test loops",
      },
      {
        label: "Project detection",
        status: "live",
        value: "Solana project identified",
        detail: "The product can route the user based on actual project context instead of generic developer assumptions.",
        ownedLabel: "Workflow routing",
        ownedValue: "Toolbox, launches, and onboarding",
      },
      {
        label: "Troubleshooting",
        status: "partial",
        value: "Scroll-friendly guidance",
        detail: "The section needs room for longer warning, next-step, and integration guidance without cutting off the content.",
        ownedLabel: "UX upgrade",
        ownedValue: "Full-section scroll and tab-specific detail",
      },
    ],
    features: [
      { label: "Validator state", detail: "Keep local Solana runtime visible without switching surfaces.", tone: "green" },
      { label: "MCP readiness", detail: "Users should see when account or docs tooling is missing.", tone: "green" },
      { label: "Long-form guidance", detail: "The shell now needs to support deeper troubleshooting content.", tone: "green" },
      { label: "Surface debt", detail: "Debug copy still needs a tighter product voice in a few places.", tone: "amber" },
    ],
    nextSteps: [
      { text: "Preserve scroll in the Solana shell even when the tab content gets longer.", tone: "green" },
      { text: "Use tab state to expose concrete next moves, not just decorative cards.", tone: "green" },
      { text: "Tighten any copy that feels like placeholder strategy instead of product behavior.", tone: "amber" },
      { text: "Keep the section interactive enough that users can actually inspect the whole story.", tone: "green" },
    ],
  },
};

export function DemoSolanaWorkspace() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const active = TAB_CONTENT[activeTab];

  return (
    <div className="dd-solana">
      <div className="dd-solana-env">
        <div className="dd-solana-env-badge">{active.envBadge}</div>
        <div className="dd-solana-env-copy">{active.envCopy}</div>
      </div>

      <div className="dd-solana-shell">
        <div className="dd-solana-header">
          <div className="dd-solana-kicker">Solana workspace</div>
          <div className="dd-solana-title">{active.title}</div>
          <div className="dd-solana-copy">{active.copy}</div>
        </div>

        <div className="dd-solana-tabs" role="tablist" aria-label="Solana workspace tabs">
          {WORKSPACE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`dd-solana-tab${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="dd-solana-tab-label">{tab.label}</div>
              <div className="dd-solana-tab-summary">{tab.summary}</div>
            </button>
          ))}
        </div>

        <div className="dd-solana-panel">
          <div className="dd-solana-card-grid">
            {active.cards.map((card) => (
              <div key={card.label} className="dd-solana-runtime-card">
                <div className="dd-solana-runtime-top">
                  <div className="dd-solana-runtime-label">{card.label}</div>
                  <div className={`dd-solana-runtime-status ${card.status}`}>{card.status}</div>
                </div>
                <div className="dd-solana-runtime-value">{card.value}</div>
                <div className="dd-solana-runtime-detail">{card.detail}</div>
                <div className="dd-solana-runtime-owned">
                  <div className="dd-solana-runtime-owned-label">{card.ownedLabel}</div>
                  <div>{card.ownedValue}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="dd-solana-lower">
            <div className="dd-solana-feature-card">
              <div className="dd-solana-feature-title">{active.featureTitle}</div>
              <div className="dd-solana-feature-list">
                {active.features.map((row) => (
                  <div key={row.label} className="dd-solana-feature-row">
                    <div className="dd-solana-feature-label">
                      <span className={`dd-solana-dot ${row.tone}`} />
                      {row.label}
                    </div>
                    <div className="dd-solana-feature-detail">{row.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dd-solana-feature-card">
              <div className="dd-solana-feature-title">{active.nextTitle}</div>
              <div className="dd-solana-next-list">
                {active.nextSteps.map((item) => (
                  <div key={item.text} className="dd-solana-next-item">
                    <span className={`dd-solana-dot ${item.tone}`} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
