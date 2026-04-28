"use client";

const TRANSACTIONS = [
  { type: "Raydium Launch", amount: "-0.320", positive: false, time: "4m ago" },
  { type: "Swap (SOL→USDC)", amount: "-1.200", positive: false, time: "18m ago" },
  { type: "Session Registry", amount: "-0.006", positive: false, time: "31m ago" },
  { type: "Stake Reward", amount: "+0.089", positive: true, time: "2h ago" },
  { type: "Airdrop", amount: "+5.000", positive: true, time: "5h ago" },
  { type: "Program Deploy", amount: "-0.042", positive: false, time: "1d ago" },
];

export function DemoWallet() {
  return (
    <div className="dd-wallet">
      <div className="dd-wallet-header">Wallet</div>
      <div className="dd-wallet-balance">
        <span className="dd-wallet-sol">24.847</span>
        <span className="dd-wallet-usd">SOL ($3,421.90)</span>
      </div>
      <div className="dd-wallet-address">7xKX...gAsU</div>
      <div className="dd-wallet-chip-row">
        <span className="dd-wallet-chip">USDC $8,420</span>
        <span className="dd-wallet-chip">JUP 1,280</span>
        <span className="dd-wallet-chip">Launch Wallet</span>
      </div>
      <div className="dd-settings-section-title" style={{ marginBottom: 8 }}>
        Recent Activity
      </div>
      <div className="dd-wallet-tx-list">
        {TRANSACTIONS.map((tx, i) => (
          <div key={i} className="dd-wallet-tx">
            <span className="dd-wallet-tx-type">
              {tx.type}
              <span style={{ color: "var(--t4)", marginLeft: 6, fontSize: 9 }}>
                {tx.time}
              </span>
            </span>
            <span
              className={`dd-wallet-tx-amount ${tx.positive ? "positive" : "negative"}`}
            >
              {tx.amount} SOL
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
