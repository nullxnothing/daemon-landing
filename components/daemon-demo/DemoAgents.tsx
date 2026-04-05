"use client";

const AGENTS = [
  {
    name: "Claude",
    model: "claude-opus-4-20250514",
    color: "#3ecf8e",
    desc: "General-purpose AI coding assistant",
  },
  {
    name: "Solana Agent",
    model: "claude-opus-4-20250514",
    color: "#f0b429",
    desc: "Solana-specialized with Helius + Jupiter MCPs",
  },
  {
    name: "Security Auditor",
    model: "claude-sonnet-4-20250514",
    color: "#ef5350",
    desc: "Smart contract vulnerability scanner",
  },
  {
    name: "Frontend Builder",
    model: "claude-sonnet-4-20250514",
    color: "#60a5fa",
    desc: "React + Tailwind component generator",
  },
  {
    name: "Test Writer",
    model: "claude-haiku-4-5-20251001",
    color: "#c792ea",
    desc: "Automated test suite generator",
  },
];

export function DemoAgents() {
  return (
    <div className="dd-agents">
      <div className="dd-agents-header">Agents</div>
      {AGENTS.map((agent) => (
        <div key={agent.name} className="dd-agent-card">
          <span className="dd-agent-dot" style={{ background: agent.color }} />
          <div className="dd-agent-info">
            <div className="dd-agent-name">{agent.name}</div>
            <div className="dd-agent-model">{agent.model}</div>
            <div style={{ fontSize: 10, color: "var(--t4)", marginTop: 2 }}>
              {agent.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
