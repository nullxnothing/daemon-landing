"use client";

import { useState } from "react";

interface SettingToggle {
  label: string;
  desc: string;
  defaultOn: boolean;
}

const SECTIONS: { title: string; settings: SettingToggle[] }[] = [
  {
    title: "General",
    settings: [
      { label: "Auto-save", desc: "Save files on focus change", defaultOn: true },
      { label: "Minimap", desc: "Show code minimap in editor", defaultOn: false },
      { label: "Word wrap", desc: "Wrap long lines in editor", defaultOn: true },
      { label: "Bracket pairs", desc: "Colorize matching brackets", defaultOn: true },
    ],
  },
  {
    title: "AI Agent",
    settings: [
      { label: "Auto-approve reads", desc: "Skip confirmation for file reads", defaultOn: true },
      { label: "Auto-approve edits", desc: "Skip confirmation for file edits", defaultOn: false },
      { label: "Stream output", desc: "Show agent output in real-time", defaultOn: true },
      { label: "MCP servers", desc: "Enable Model Context Protocol", defaultOn: true },
    ],
  },
  {
    title: "Solana",
    settings: [
      { label: "Devnet by default", desc: "New projects target devnet", defaultOn: true },
      { label: "Auto-airdrop", desc: "Request SOL airdrop on empty wallet", defaultOn: false },
      { label: "Priority fees", desc: "Auto-set priority fees for transactions", defaultOn: true },
    ],
  },
];

export function DemoSettings() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    SECTIONS.forEach((section) =>
      section.settings.forEach((s) => {
        initial[s.label] = s.defaultOn;
      })
    );
    return initial;
  });

  return (
    <div className="dd-settings">
      <div className="dd-settings-header">Settings</div>
      {SECTIONS.map((section) => (
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
  );
}
