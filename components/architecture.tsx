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
    description: "All database and filesystem access runs in the main process. The renderer never touches SQLite directly — everything flows through typed IPC handlers.",
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
    description: "better-sqlite3 and node-pty unpacked from ASAR for production builds. Real PTY sessions, real database — not browser polyfills pretending to be native.",
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="py-24 md:py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent text-[13px] font-semibold tracking-wider uppercase mb-4">
            Architecture
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white text-balance">
            Not a wrapper. Not a fork.
          </h2>
          <p className="mt-5 text-neutral-400 leading-relaxed">
            Standalone Electron app with process isolation, typed IPC, and
            native modules. Every layer built intentionally.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Principles */}
          <div className="space-y-3">
            {principles.map((item) => (
              <div
                key={item.number}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-neutral-800 bg-neutral-900/50 transition-all duration-200 hover:border-accent/30 hover:bg-neutral-900"
              >
                <span className="flex-shrink-0 size-9 flex items-center justify-center rounded-xl bg-accent/10 text-accent text-[13px] font-mono font-semibold">
                  {item.number}
                </span>
                <div>
                  <h4 className="text-[15px] font-semibold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack table + file tree */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-neutral-800 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900/50">
                    <th className="text-left text-[12px] font-semibold text-neutral-500 px-5 py-3 uppercase tracking-wider">
                      Layer
                    </th>
                    <th className="text-left text-[12px] font-semibold text-neutral-500 px-5 py-3 uppercase tracking-wider">
                      Technology
                    </th>
                    <th className="text-left text-[12px] font-semibold text-neutral-500 px-5 py-3 uppercase tracking-wider hidden sm:table-cell">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {techStack.map((item, index) => (
                    <tr
                      key={item.layer}
                      className={`border-b border-neutral-800 last:border-0 ${
                        index % 2 === 0 ? "bg-black" : "bg-neutral-900/30"
                      }`}
                    >
                      <td className="px-5 py-3 font-mono text-[13px] text-accent">
                        {item.layer}
                      </td>
                      <td className="px-5 py-3 text-[13px] text-white">
                        {item.tech}
                      </td>
                      <td className="px-5 py-3 text-[12px] text-neutral-500 hidden sm:table-cell">
                        {item.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* File structure */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
              <p className="text-[12px] text-neutral-500 uppercase tracking-wider font-semibold mb-3">
                Project structure
              </p>
              <pre className="font-mono text-[12px] text-neutral-400 leading-[1.8] overflow-x-auto">
{`electron/
  main/       App entry, windows, protocols
  ipc/        One handler per domain (20 modules)
  services/   Business logic layer
  db/         SQLite schema, migrations, WAL

src/
  panels/     One directory per UI panel (21)
  store/      Zustand state management
  plugins/    Plugin registry + lazy loading
  components/ Shared UI primitives`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
