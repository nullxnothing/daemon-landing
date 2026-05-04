"use client";

const principles = [
  {
    label: "Process isolation",
    body: "Database and filesystem work stay in the main process. Renderer code talks through typed handlers instead of direct access.",
  },
  {
    label: "Typed IPC",
    body: "Handlers return predictable contracts for agents, wallet, git, terminals, and the rest of the app surface.",
  },
  {
    label: "Offline first",
    body: "Core editing stays local through Monaco and custom protocols. The app does not depend on browser-native assumptions.",
  },
];

const stackGroups = [
  {
    title: "Runtime",
    items: ["Electron 33", "React + TypeScript", "Vite", "Monaco"],
  },
  {
    title: "Native layer",
    items: ["node-pty", "better-sqlite3", "typed IPC", "custom protocols"],
  },
  {
    title: "Workspace",
    items: ["Zustand state", "simple-git", "plugin registry", "electron-builder"],
  },
];

const structure = [
  "electron/main for windows, protocols, lifecycle",
  "electron/ipc with one handler per domain",
  "electron/services for business logic",
  "src/panels for the working UI",
  "src/store for domain state",
  "src/components for shared primitives",
];

export function Architecture() {
  return (
    <section id="architecture" className="relative px-6 py-24 md:py-30">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)]">
        <div className="max-w-[28rem]">
          <p className="text-accent text-[13px] font-semibold tracking-[0.2em] uppercase">
            Architecture
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.03em] gradient-text md:text-[3.1rem]">
            Built like an app.
            <br />
            Not a fork.
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">
            The cleanest part of Daemon is that the product shape matches the implementation
            shape. Native responsibilities stay native.
          </p>
        </div>

        <div className="space-y-4">
          {principles.map((item) => (
            <article
              key={item.label}
              className="rounded-lg border border-white/[0.055] bg-card/75 px-6 py-5"
            >
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                {item.label}
              </p>
              <p className="mt-2 text-[14px] leading-[1.75] text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.72fr)]">
        <div className="grid gap-4 md:grid-cols-3">
          {stackGroups.map((group) => (
            <section key={group.title} className="rounded-lg border border-white/[0.05] bg-card/65 p-5">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.15em] text-muted-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-[14px] text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="rounded-lg border border-white/[0.05] bg-card/65 p-5">
          <h3 className="font-mono text-[12px] uppercase tracking-[0.15em] text-muted-foreground">
            Project structure
          </h3>
          <ul className="mt-4 space-y-3">
            {structure.map((line) => (
              <li key={line} className="text-[13px] leading-[1.7] text-muted">
                {line}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
