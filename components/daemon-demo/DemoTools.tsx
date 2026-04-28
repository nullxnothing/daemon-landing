"use client";

const TOOLS = [
  { name: "Solana Toolbox", desc: "One workspace for readiness, launch, transact, and debug", color: "#3ecf8e" },
  { name: "Project Readiness", desc: "Score wallet, MCP, RPC, and validator setup", color: "#60a5fa" },
  { name: "Pump.fun Launcher", desc: "Launch tokens through the native protocol adapter", color: "#3ecf8e" },
  { name: "Raydium LaunchLab", desc: "Run Raydium token launches from the same launch surface", color: "#f0b429" },
  { name: "Meteora DBC", desc: "Use dynamic bonding curve launch flows inside DAEMON", color: "#60a5fa" },
  { name: "Session Registry", desc: "Record agent work on-chain when project tracking matters", color: "#c792ea" },
  { name: "Priority Fee Calculator", desc: "Estimate execution pricing before swap or launch", color: "#f0b429" },
  { name: "Account Viewer", desc: "Decode on-chain account data without leaving the IDE", color: "#3ecf8e" },
];

export function DemoTools() {
  return (
    <div className="dd-tools">
      <div className="dd-tools-header">Tools</div>
      <div className="dd-tools-grid">
        {TOOLS.map((tool) => (
          <div key={tool.name} className="dd-tool-card">
            <div className="dd-tool-card-name">
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: tool.color,
                  marginRight: 6,
                  verticalAlign: "middle",
                }}
              />
              {tool.name}
            </div>
            <div className="dd-tool-card-desc">{tool.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
