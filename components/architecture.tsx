"use client";

const techStack = [
  { layer: "Shell", tech: "Electron 33", detail: "Chromium + Node in one process" },
  { layer: "Build", tech: "Vite", detail: "Sub-second HMR" },
  { layer: "UI", tech: "React 18 + TypeScript", detail: "Strict types, zero any" },
  { layer: "Editor", tech: "Monaco Editor", detail: "Custom protocol, fully offline" },
  { layer: "Terminal", tech: "node-pty + xterm.js", detail: "Real PTY, not emulated" },
  { layer: "State", tech: "Zustand", detail: "One store per domain" },
  { layer: "Database", tech: "better-sqlite3", detail: "WAL mode, main process only" },
  { layer: "Git", tech: "simple-git", detail: "Branch, stash, tag, push" },
  { layer: "Package", tech: "electron-builder", detail: ".exe + .dmg, auto-update" },
];

const principles = [
  {
    number: "01",
    title: "Process Isolation",
    description: "All database and filesystem access runs in the main process. The renderer never touches SQLite directly. Everything flows through typed IPC handlers.",
  },
  {
    number: "02",
    title: "Typed IPC Contract",
    description: "Every handler returns { ok, data } or { ok, error }. No raw throws across the bridge. 20 IPC modules covering agents, wallet, git, terminals, and more.",
  },
  {
    number: "03",
    title: "Offline First",
    description: "Monaco editor runs through a custom protocol handler. Zero network requests for core editing. Your code stays on your machine.",
  },
  {
    number: "04",
    title: "Native Modules",
    description: "better-sqlite3 and node-pty unpacked from ASAR for production builds. Real PTY sessions, real database. Not browser polyfills pretending to be native.",
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="relative py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase mb-5">
            Architecture
          </p>
          <h2 className="text-4xl md:text-[3.25rem] font-bold tracking-[-0.02em] leading-[1.1] gradient-text text-balance">
            Not a wrapper.
            <br />
            Not a fork.
          </h2>
          <p className="mt-6 text-[17px] text-muted leading-relaxed max-w-lg mx-auto">
            A standalone Electron app built from scratch for Solana development.
            Process isolation, typed IPC, and native modules, with every layer built intentionally.
          </p>
        </div>

        {/* Principles - 2x2 grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {principles.map((item) => (
            <div
              key={item.number}
              className="group flex items-start gap-4 p-6 rounded-2xl card-premium"
            >
              <span className="flex-shrink-0 size-9 flex items-center justify-center rounded-xl bg-accent/8 border border-accent/10 text-accent text-[13px] font-mono font-semibold">
                {item.number}
              </span>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-1.5 tracking-[-0.01em]">
                  {item.title}
                </h4>
                <p className="text-[14px] text-muted leading-[1.7]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack + file tree */}
        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden card-premium">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-[11px] font-semibold text-muted-foreground/80 px-6 py-3.5 uppercase tracking-[0.15em]">
                    Layer
                  </th>
                  <th className="text-left text-[11px] font-semibold text-muted-foreground/80 px-6 py-3.5 uppercase tracking-[0.15em]">
                    Technology
                  </th>
                  <th className="text-left text-[11px] font-semibold text-muted-foreground/80 px-6 py-3.5 uppercase tracking-[0.15em] hidden sm:table-cell">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {techStack.map((item, index) => (
                  <tr
                    key={item.layer}
                    className={`border-b border-white/[0.03] last:border-0 transition-colors hover:bg-white/[0.02] ${
                      index % 2 === 0 ? "" : "bg-white/[0.01]"
                    }`}
                  >
                    <td className="px-6 py-3.5 font-mono text-[13px] text-accent font-medium">
                      {item.layer}
                    </td>
                    <td className="px-6 py-3.5 text-[13px] text-foreground">
                      {item.tech}
                    </td>
                    <td className="px-6 py-3.5 text-[12px] text-muted-foreground hidden sm:table-cell">
                      {item.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-2 rounded-2xl card-premium p-6">
            <p className="text-[11px] text-muted-foreground/80 uppercase tracking-[0.15em] font-semibold mb-4">
              Project structure
            </p>
            <pre className="font-mono text-[12px] text-muted leading-[1.9] overflow-x-auto">
{`electron/
  main/       App entry, windows, protocols
  ipc/        One handler per domain (20)
  services/   Business logic layer
  db/         SQLite schema, migrations

src/
  panels/     One dir per UI panel (21)
  store/      Zustand state management
  plugins/    Plugin registry + lazy load
  components/ Shared UI primitives`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
