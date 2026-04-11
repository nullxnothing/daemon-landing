"use client";

const daemonWins = [
  "Wallet and on-chain workflows ship in the product.",
  "Agent work is part of the workspace, not bolted onto it.",
  "Launches, swaps, reads, terminals, and deploys stay in one loop.",
];

const competitorNotes = [
  {
    name: "VS Code",
    body: "Strong editor, but Solana workflow depth comes from an extension stack and extra browser tools.",
  },
  {
    name: "Cursor",
    body: "Better AI ergonomics than a plain editor, but still inherits the same split between coding and chain tooling.",
  },
];

const comparisonHeaders = ["", "Daemon", "VS Code", "Cursor"];

const comparisonRows = [
  ["Solana workflow", "Native", "Extensions + browser", "Extensions + browser"],
  ["Agent system", "Built in", "No", "Partial"],
  ["Wallet + portfolio", "Built in", "No", "No"],
  ["Deploy loop", "In app", "External services", "External services"],
];

export function Comparison() {
  return (
    <section id="comparison" className="relative px-6 py-24 md:py-30">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
        <div className="max-w-[28rem]">
          <p className="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase">
            Why Daemon
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.03em] gradient-text md:text-[3.1rem]">
            Fewer seams.
            <br />
            More work done.
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">
            The strongest argument for Daemon is not abstract feature count. It is that the
            workflow stays intact from code to chain to deploy.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <section className="rounded-lg border border-accent/14 bg-accent/[0.05] p-6 md:col-span-1">
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">Daemon</p>
            <ul className="mt-4 space-y-3">
              {daemonWins.map((point) => (
                <li key={point} className="text-[14px] leading-[1.72] text-foreground">
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
            {competitorNotes.map((note) => (
              <section key={note.name} className="rounded-lg border border-white/[0.05] bg-card/65 p-6">
                <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                  {note.name}
                </p>
                <p className="mt-3 text-[14px] leading-[1.72] text-muted">{note.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl rounded-lg border border-white/[0.05] bg-card/70 p-3 md:p-4">
        <div className="grid gap-px overflow-hidden rounded-md bg-white/[0.04] md:grid-cols-4">
          {comparisonHeaders.map((cell, index) => (
            <div
              key={`header-${index}`}
              className={`bg-card px-4 py-3 text-[12px] font-mono uppercase tracking-[0.14em] ${
                index === 1 ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {cell}
            </div>
          ))}

          {comparisonRows.flatMap((row) =>
            row.map((cell, index) => (
              <div
                key={`${row[0]}-${index}`}
                className={`bg-card px-4 py-4 text-[13px] leading-[1.6] ${
                  index === 0
                    ? "font-mono uppercase tracking-[0.12em] text-muted-foreground"
                    : index === 1
                      ? "font-medium text-accent"
                      : "text-muted"
                }`}
              >
                {cell}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
