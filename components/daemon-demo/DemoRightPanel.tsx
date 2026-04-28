"use client";

import { useState } from "react";

type Tab = "claude" | "ports" | "processes";

const CHAT_MESSAGES = [
  {
    role: "user" as const,
    text: "Set up the Solana launch workflow so wallet, validator, and launch adapters all use the same runtime path",
  },
  {
    role: "assistant" as const,
    text: "I’ll route this through the Solana workspace surface: validator readiness, Helius transport, wallet assignment, and the native launch adapters for Pump.fun, Raydium, and Meteora.\n\nOpening Solana Toolbox...",
  },
  {
    role: "user" as const,
    text: "Make sure the wallet flow shows the signing path before launch",
  },
  {
    role: "assistant" as const,
    text: "I’ll keep the preview step visible so quotes, launch actions, and transaction confirmation all share one Solana UX instead of separate tools.",
  },
];

const PORTS = [
  { port: 3000, label: "Next.js Dev", status: "active" },
  { port: 8899, label: "Solana Validator", status: "active" },
  { port: 8900, label: "Faucet", status: "active" },
];

const PROCESSES = [
  { name: "helius mcp", pid: 12847, cpu: "0.4%", mem: "82MB" },
  { name: "solana-test-validator", pid: 12903, cpu: "8.4%", mem: "312MB" },
  { name: "launch adapter runtime", pid: 13021, cpu: "1.2%", mem: "104MB" },
];

export function DemoRightPanel() {
  const [tab, setTab] = useState<Tab>("claude");

  return (
    <div className="dd-right-panel">
      <div className="dd-right-tabs">
        {(["claude", "ports", "processes"] as Tab[]).map((t) => (
          <button
            key={t}
            className={`dd-right-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "claude" ? "Claude" : t === "ports" ? "Runtime" : "Launches"}
          </button>
        ))}
      </div>

      {tab === "claude" && (
        <>
          <div className="dd-right-content">
            {CHAT_MESSAGES.map((msg, i) => (
              <div key={i} className={`dd-chat-message ${msg.role}`}>
                <div className="msg-role">{msg.role}</div>
                <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="dd-chat-input">
            <div className="dd-chat-input-field">Ask Claude...</div>
          </div>
        </>
      )}

      {tab === "ports" && (
        <div className="dd-right-content">
          {PORTS.map((p) => (
            <div
              key={p.port}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 8px",
                borderRadius: 4,
                background: "var(--s2)",
                marginBottom: 4,
                fontSize: 11,
              }}
            >
              <span style={{ color: "var(--t2)" }}>
                <span
                  style={{
                    fontFamily: "var(--font-code)",
                    color: "var(--t1)",
                    marginRight: 8,
                  }}
                >
                  :{p.port}
                </span>
                {p.label}
              </span>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#3ecf8e",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {tab === "processes" && (
        <div className="dd-right-content">
          {PROCESSES.map((p) => (
            <div
              key={p.pid}
              style={{
                padding: "6px 8px",
                borderRadius: 4,
                background: "var(--s2)",
                marginBottom: 4,
                fontSize: 10,
              }}
            >
              <div style={{ color: "var(--t1)", fontSize: 11, marginBottom: 2 }}>
                {p.name}
              </div>
              <div style={{ color: "var(--t4)", fontFamily: "var(--font-code)" }}>
                PID {p.pid} &middot; CPU {p.cpu} &middot; {p.mem}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
