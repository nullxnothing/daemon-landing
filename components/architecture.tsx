"use client";

const techStack = [
  { layer: "Shell", tech: "Electron 33", detail: "Native OS integration" },
  { layer: "Build", tech: "Vite", detail: "Fast HMR, ESM-native" },
  { layer: "UI", tech: "React 18 + TypeScript", detail: "Type-safe components" },
  { layer: "Editor", tech: "Monaco Editor", detail: "Offline via custom protocol" },
  { layer: "Terminal", tech: "node-pty + xterm.js", detail: "Real PTY sessions" },
  { layer: "State", tech: "Zustand", detail: "Minimal, fast stores" },
  { layer: "Database", tech: "better-sqlite3", detail: "WAL mode, main process only" },
  { layer: "Git", tech: "simple-git", detail: "Full git operations" },
  { layer: "Package", tech: "electron-builder", detail: ".exe + .dmg output" },
];

const principles = [
  {
    number: "01",
    title: "Process Isolation",
    description: "All database access in the main process. Renderer communicates via typed IPC only.",
  },
  {
    number: "02",
    title: "Consistent IPC Contract",
    description: "Every handler returns { ok, data } or { ok, error }. No raw throws across the bridge.",
  },
  {
    number: "03",
    title: "Offline First",
    description: "Monaco runs through a custom protocol. Zero network requests required for core editing.",
  },
  {
    number: "04",
    title: "Native Module Support",
    description: "better-sqlite3 and node-pty unpacked from ASAR for production builds.",
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent text-[13px] font-medium tracking-wider uppercase mb-4">
            Architecture
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text text-balance">
            Built right from day one
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            Clean architecture with clear separation of concerns. Every decision
            made intentionally.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Principles */}
          <div className="space-y-3">
            {principles.map((item) => (
              <div
                key={item.number}
                className="group flex items-start gap-4 p-5 rounded-xl border border-border bg-card transition-all duration-200 hover:border-[#222] hover:bg-card-hover"
              >
                <span className="flex-shrink-0 size-8 flex items-center justify-center rounded-lg bg-accent/8 text-accent text-[13px] font-mono font-medium">
                  {item.number}
                </span>
                <div>
                  <h4 className="text-[15px] font-semibold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack table + file tree */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left text-[12px] font-medium text-muted-foreground px-5 py-3 uppercase tracking-wider">
                      Layer
                    </th>
                    <th className="text-left text-[12px] font-medium text-muted-foreground px-5 py-3 uppercase tracking-wider">
                      Technology
                    </th>
                    <th className="text-left text-[12px] font-medium text-muted-foreground px-5 py-3 uppercase tracking-wider hidden sm:table-cell">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {techStack.map((item, index) => (
                    <tr
                      key={item.layer}
                      className={`border-b border-border last:border-0 ${
                        index % 2 === 0 ? "bg-background" : "bg-card/50"
                      }`}
                    >
                      <td className="px-5 py-3 font-mono text-[13px] text-accent">
                        {item.layer}
                      </td>
                      <td className="px-5 py-3 text-[13px] text-foreground">
                        {item.tech}
                      </td>
                      <td className="px-5 py-3 text-[12px] text-muted-foreground hidden sm:table-cell">
                        {item.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* File structure */}
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-[12px] text-muted-foreground uppercase tracking-wider font-medium mb-3">
                Project structure
              </p>
              <pre className="font-mono text-[12px] text-muted leading-[1.8] overflow-x-auto">
{`electron/
  main/       App entry, windows, protocols
  ipc/        One handler per domain (14 modules)
  services/   Business logic layer
  db/         SQLite schema, migrations, WAL

src/
  panels/     One directory per UI panel (~30)
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
