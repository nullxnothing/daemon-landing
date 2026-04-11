"use client";

import { useState } from "react";

type Tab = "claude" | "ports" | "processes";

const CHAT_MESSAGES = [
  {
    role: "user" as const,
    text: "Add a transfer instruction to the Anchor program that sends SOL from the vault PDA to the recipient",
  },
  {
    role: "assistant" as const,
    text: "I'll add a `transfer` instruction that uses a PDA-signed CPI to the System Program. The vault PDA will be derived from the program ID and a seed, and the instruction will verify the signer is the vault authority.\n\nEditing programs/lib.rs...",
  },
  {
    role: "user" as const,
    text: "Now write the test for it",
  },
  {
    role: "assistant" as const,
    text: "I'll create a test that:\n1. Initializes the vault with 5 SOL\n2. Calls transfer for 2 SOL\n3. Asserts the vault balance decreased and recipient increased\n\nWriting tests/transfer.test.ts...",
  },
];

const PORTS = [
  { port: 3000, label: "Next.js Dev", status: "active" },
  { port: 8899, label: "Solana Validator", status: "active" },
  { port: 8900, label: "Faucet", status: "active" },
];

const PROCESSES = [
  { name: "next dev", pid: 12847, cpu: "2.1%", mem: "184MB" },
  { name: "solana-test-validator", pid: 12903, cpu: "8.4%", mem: "312MB" },
  { name: "anchor build --watch", pid: 13021, cpu: "0.3%", mem: "96MB" },
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
            {t === "claude" ? "Claude" : t === "ports" ? "Ports" : "Processes"}
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
                  background: "#58c88a",
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
