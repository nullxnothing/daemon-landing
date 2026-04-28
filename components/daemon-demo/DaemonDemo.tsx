"use client";

import { useState, useCallback } from "react";
import {
  Files,
  Terminal,
  Settings,
  Wrench,
  Wallet,
  Bot,
  GitBranch,
  Search,
  Globe,
  Waves,
} from "lucide-react";
import { DemoFileTree } from "./DemoFileTree";
import { DemoEditor } from "./DemoEditor";
import { DemoTerminal } from "./DemoTerminal";
import { DemoSettings } from "./DemoSettings";
import { DemoTools } from "./DemoTools";
import { DemoWallet } from "./DemoWallet";
import { DemoAgents } from "./DemoAgents";
import { DemoRightPanel } from "./DemoRightPanel";
import { DemoSolanaWorkspace } from "./DemoSolanaWorkspace";
import "./daemon-demo.css";

type Panel = "editor" | "solana" | "settings" | "tools" | "wallet" | "agents";

const SIDEBAR_ICONS: { id: Panel; icon: typeof Files; tooltip: string; kind: "panel" }[] = [
  { id: "solana", icon: Waves, tooltip: "Solana Workspace", kind: "panel" },
  { id: "settings", icon: Settings, tooltip: "Settings", kind: "panel" },
  { id: "tools", icon: Wrench, tooltip: "Tools", kind: "panel" },
  { id: "wallet", icon: Wallet, tooltip: "Wallet", kind: "panel" },
  { id: "agents", icon: Bot, tooltip: "Agents", kind: "panel" },
];

export function DaemonDemo() {
  const [activePanel, setActivePanel] = useState<Panel>("solana");
  const [showExplorer, setShowExplorer] = useState(true);
  const [showRightPanel] = useState(true);
  const [activeFile, setActiveFile] = useState("src/App.tsx");

  const handleSidebarClick = useCallback(
    (panel: Panel) => {
      setActivePanel((prev) => (prev === panel ? "editor" : panel));
    },
    []
  );

  const isEditorMode = activePanel === "editor";

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Inside DAEMON
          </h2>
          <p className="text-[var(--color-muted)] max-w-2xl mx-auto text-lg">
            The same shell, now showing more of DAEMON&apos;s Solana runtime, wallet path, launch flow, and MCP surface.
          </p>
        </div>
        <div className="daemon-demo">
          {/* Titlebar */}
          <div className="dd-titlebar">
            <div className="dd-titlebar-left">
              <div
                className="dd-titlebar-icon"
                style={{
                  background: "linear-gradient(135deg, #3ecf8e, #2a9d6a)",
                }}
              />
              <span className="dd-titlebar-title">DAEMON</span>
            </div>
            <div className="dd-project-tabs">
              <button className="dd-project-tab active">
                <span className="dd-project-tab-dot live" />
                <span>daemon-registry</span>
              </button>
              <button className="dd-project-tab">
                <span className="dd-project-tab-dot" />
                <span>launch-tools</span>
              </button>
            </div>
            <div className="dd-titlebar-traffic">
              <div className="dd-traffic-dot" style={{ background: "#ef5350" }} />
              <div className="dd-traffic-dot" style={{ background: "#f0b429" }} />
              <div className="dd-traffic-dot" style={{ background: "#3ecf8e" }} />
            </div>
          </div>

          {/* Body */}
          <div className="dd-body">
            {/* Sidebar */}
            <div className="dd-sidebar">
              <button
                className={`dd-sidebar-icon toggle ${showExplorer && isEditorMode ? "active" : ""}`}
                onClick={() => {
                  setActivePanel("editor");
                  setShowExplorer((p) => !p);
                }}
                title="Explorer"
              >
                <Files size={18} />
              </button>
              <button
                className={`dd-sidebar-icon ${isEditorMode ? "" : ""}`}
                title="Search"
              >
                <Search size={18} />
              </button>
              <button className="dd-sidebar-icon" title="Git">
                <GitBranch size={18} />
              </button>
              <div className="dd-sidebar-divider" />
              {SIDEBAR_ICONS.map(({ id, icon: Icon, tooltip }) => (
                <button
                  key={id}
                  className={`dd-sidebar-icon ${activePanel === id ? "active" : ""}`}
                  onClick={() => handleSidebarClick(id)}
                  title={tooltip}
                >
                  <Icon size={18} />
                </button>
              ))}
              <div className="dd-sidebar-divider" />
              <button className="dd-sidebar-icon" title="Browser">
                <Globe size={18} />
              </button>
              <div className="dd-sidebar-spacer" />
            </div>

            {/* Left panel (file explorer) */}
            {showExplorer && isEditorMode && (
              <div className="dd-left-panel">
                <div className="dd-left-header">Explorer</div>
                <DemoFileTree activeFile={activeFile} onSelectFile={setActiveFile} />
              </div>
            )}

            {/* Center panel */}
            <div className="dd-center">
              {activePanel === "solana" && (
                <div className="dd-panel-enter">
                  <DemoSolanaWorkspace />
                </div>
              )}
              {activePanel === "editor" && (
                <>
                  <DemoEditor activeFile={activeFile} />
                  <div className="dd-splitter" />
                  <DemoTerminal />
                </>
              )}
              {activePanel === "settings" && (
                <div className="dd-panel-enter">
                  <DemoSettings />
                </div>
              )}
              {activePanel === "tools" && (
                <div className="dd-panel-enter">
                  <DemoTools />
                </div>
              )}
              {activePanel === "wallet" && (
                <div className="dd-panel-enter">
                  <DemoWallet />
                </div>
              )}
              {activePanel === "agents" && (
                <div className="dd-panel-enter">
                  <DemoAgents />
                </div>
              )}
            </div>

            {/* Right panel */}
            {showRightPanel && <DemoRightPanel />}
          </div>

          {/* Status bar */}
          <div className="dd-statusbar">
            <div className="dd-statusbar-left">
              <span className="dd-status-item">DAEMON</span>
              <span className="dd-status-item">
                <GitBranch size={10} />
                main
              </span>
              <span className="dd-status-item">
                <Terminal size={10} />
                3
              </span>
            </div>
            <div className="dd-statusbar-right">
              <span className="dd-status-item">
                <span
                  className="dd-status-dot"
                  style={{ background: "#3ecf8e" }}
                />
                Claude
              </span>
              <span className="dd-status-item">
                <span
                  className="dd-status-dot"
                  style={{ background: "#3ecf8e" }}
                />
                Helius
              </span>
              <span className="dd-status-item">Jupiter</span>
              <span className="dd-status-item">MCP 4</span>
              <span className="dd-status-item" style={{ fontFamily: "var(--font-code)" }}>
                validator :8899
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
