"use client";

import { useState, useEffect, useRef } from "react";

const TERMINAL_LINES = [
  { text: "$ claude --model claude-opus-4-20250514", delay: 0, color: "#f0f0f0" },
  { text: "", delay: 300, color: "" },
  { text: "╭─────────────────────────────────────────╮", delay: 400, color: "#333" },
  { text: "│  Claude Code          claude-opus-4      │", delay: 450, color: "#3ecf8e" },
  { text: "╰─────────────────────────────────────────╯", delay: 500, color: "#333" },
  { text: "", delay: 550, color: "" },
  { text: "> Analyzing project structure...", delay: 800, color: "#a0a0a0" },
  { text: "  Found 14 source files across 3 directories", delay: 1200, color: "#a0a0a0" },
  { text: "  Detected: Anchor program + React frontend", delay: 1600, color: "#a0a0a0" },
  { text: "", delay: 1800, color: "" },
  { text: "> Ready. What would you like to build?", delay: 2200, color: "#3ecf8e" },
];

export function DemoTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Clean up previous timers
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setVisibleLines(0);

    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay);
      timerRef.current.push(t);
    });

    // Restart cycle
    const restart = setTimeout(() => {
      setCycle((c) => c + 1);
    }, 8000);
    timerRef.current.push(restart);

    return () => timerRef.current.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="dd-terminal">
      <div className="dd-terminal-tabs">
        <button className="dd-terminal-tab active">
          <span className="dd-terminal-dot" style={{ background: "#3ecf8e" }} />
          Claude
        </button>
        <button className="dd-terminal-tab">
          <span className="dd-terminal-dot" style={{ background: "#f0b429" }} />
          Solana Agent
        </button>
        <button className="dd-terminal-tab">
          <span className="dd-terminal-dot" style={{ background: "#a0a0a0" }} />
          Terminal
        </button>
      </div>
      <div className="dd-terminal-content">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={`${cycle}-${i}`} style={{ color: line.color, minHeight: "18px" }}>
            {line.text}
          </div>
        ))}
        {visibleLines >= TERMINAL_LINES.length && <span className="dd-cursor" />}
      </div>
    </div>
  );
}
