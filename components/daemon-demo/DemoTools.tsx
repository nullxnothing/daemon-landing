"use client";

const TOOLS = [
  { name: "Pump.fun Launcher", desc: "Launch tokens on pump.fun", color: "#58c88a" },
  { name: "Token Scanner", desc: "Analyze token metadata & holders", color: "#60a5fa" },
  { name: "Wallet Drainer Detector", desc: "Scan for malicious approvals", color: "#ef5350" },
  { name: "Anchor Deploy", desc: "Build & deploy Anchor programs", color: "#f0b429" },
  { name: "RPC Benchmark", desc: "Test RPC endpoint latency", color: "#c792ea" },
  { name: "ABI Explorer", desc: "Inspect program IDLs", color: "#60a5fa" },
  { name: "Account Viewer", desc: "Decode on-chain account data", color: "#58c88a" },
  { name: "Priority Fee Calculator", desc: "Estimate optimal CU pricing", color: "#f0b429" },
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
