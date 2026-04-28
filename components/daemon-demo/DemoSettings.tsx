"use client";

import { useState } from "react";

interface SettingToggle {
  label: string;
  desc: string;
  defaultOn: boolean;
}

const TABS = ["Keys", "Integrations", "Agents", "Display", "Setup"] as const;
type Tab = typeof TABS[number];

const TAB_SECTIONS: Record<Tab, { title: string; settings: SettingToggle[] }[]> = {
  Keys: [
    {
      title: "API Keys",
      settings: [
        { label: "Helius RPC", desc: "Solana RPC endpoint", defaultOn: true },
        { label: "Jupiter API", desc: "Swap aggregation", defaultOn: true },
        { label: "Pump.fun API", desc: "Launch and trading actions", defaultOn: true },
        { label: "Birdeye API", desc: "Token analytics", defaultOn: false },
      ],
    },
  ],
  Integrations: [
    {
      title: "MCP Servers",
      settings: [
        { label: "Helius MCP", desc: "On-chain data queries", defaultOn: true },
        { label: "Solana MCP", desc: "Program deploy, account inspect, docs", defaultOn: true },
        { label: "Phantom Docs MCP", desc: "Wallet connect and signing guidance", defaultOn: true },
        { label: "x402 MCP", desc: "Machine-payments runtime and paid API flows", defaultOn: true },
      ],
    },
  ],
  Agents: [
    {
      title: "Agent Defaults",
      settings: [
        { label: "Auto-approve reads", desc: "Skip confirmation for file reads", defaultOn: true },
        { label: "Auto-approve edits", desc: "Skip confirmation for file edits", defaultOn: false },
        { label: "Stream output", desc: "Show agent output in real-time", defaultOn: true },
      ],
    },
  ],
  Display: [
    {
      title: "Editor",
      settings: [
        { label: "Minimap", desc: "Show code minimap", defaultOn: false },
        { label: "Word wrap", desc: "Wrap long lines", defaultOn: true },
        { label: "Bracket pairs", desc: "Colorize matching brackets", defaultOn: true },
        { label: "Ligatures", desc: "Font ligatures in editor", defaultOn: true },
      ],
    },
    {
      title: "General",
      settings: [
        { label: "Auto-save", desc: "Save files on focus change", defaultOn: true },
        { label: "Compact sidebar", desc: "Smaller icon sidebar", defaultOn: false },
      ],
    },
  ],
  Setup: [
    {
      title: "Solana",
      settings: [
        { label: "Devnet by default", desc: "New projects target devnet", defaultOn: true },
        { label: "Auto-airdrop", desc: "Request SOL on empty wallet", defaultOn: false },
        { label: "Priority fees", desc: "Auto-set priority fees", defaultOn: true },
        { label: "Session Registry", desc: "Optionally write agent sessions on-chain", defaultOn: true },
      ],
    },
  ],
};

export function DemoSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("Integrations");
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    Object.values(TAB_SECTIONS).forEach((sections) =>
      sections.forEach((section) =>
        section.settings.forEach((s) => {
          initial[s.label] = s.defaultOn;
        })
      )
    );
    return initial;
  });

  const sections = TAB_SECTIONS[activeTab];

  return (
    <div className="dd-settings">
      <div className="dd-settings-header">Settings</div>
      <div className="dd-settings-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`dd-settings-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="dd-settings-body">
        {sections.map((section) => (
          <div key={section.title} className="dd-settings-section">
            <div className="dd-settings-section-title">{section.title}</div>
            {section.settings.map((s) => (
              <div key={s.label} className="dd-settings-row">
                <div>
                  <div className="dd-settings-label">{s.label}</div>
                  <div className="dd-settings-desc">{s.desc}</div>
                </div>
                <div
                  className={`dd-toggle ${toggles[s.label] ? "on" : ""}`}
                  onClick={() =>
                    setToggles((prev) => ({ ...prev, [s.label]: !prev[s.label] }))
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
