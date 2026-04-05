import { DocHeading, DocSubheading, H2, H3, Paragraph, Table, CodeBlock, List } from "./primitives";

export function ArchitectureDoc() {
  return (
    <>
      <DocHeading>Architecture</DocHeading>
      <DocSubheading>
        Not a fork. Not a wrapper. A standalone Electron app built intentionally for Solana development.
      </DocSubheading>

      <H2 id="principles">Core Principles</H2>

      <H3>1. Process Isolation</H3>
      <Paragraph>
        All database and filesystem access runs in the main process. The renderer never touches
        SQLite directly. Everything flows through typed IPC handlers. This ensures stability,
        security, and clean separation of concerns.
      </Paragraph>

      <H3>2. Typed IPC Contract</H3>
      <Paragraph>
        Every IPC handler returns {"{ ok, data }"} or {"{ ok, error }"}. No raw throws across the
        Electron bridge. There are 20 IPC modules covering agents, wallet, git, terminals, and more.
      </Paragraph>

      <H3>3. Offline First</H3>
      <Paragraph>
        The Monaco editor runs through a custom protocol handler registered in Electron&apos;s main
        process. Zero network requests for core editing. Your code stays on your machine.
      </Paragraph>

      <H3>4. Native Modules</H3>
      <Paragraph>
        better-sqlite3 and node-pty are unpacked from ASAR for production builds. Real PTY
        sessions, real database. Not browser polyfills pretending to be native.
      </Paragraph>

      <H2 id="tech-stack">Tech Stack</H2>
      <Table
        headers={["Layer", "Technology", "Detail"]}
        rows={[
          ["Shell", "Electron 33", "Chromium + Node in one process"],
          ["Build", "Vite", "Sub-second HMR"],
          ["UI", "React 18 + TypeScript", "Strict types, zero any"],
          ["Editor", "Monaco Editor", "Custom protocol, fully offline"],
          ["Terminal", "node-pty + xterm.js", "Real PTY, not emulated"],
          ["State", "Zustand", "One store per domain"],
          ["Database", "better-sqlite3", "WAL mode, main process only"],
          ["Git", "simple-git", "Branch, stash, tag, push"],
          ["Package", "electron-builder", ".exe + .dmg, auto-update"],
        ]}
      />

      <H2 id="project-structure">Project Structure</H2>
      <CodeBlock>{`electron/
  main/       App entry, windows, protocols
  ipc/        One handler per domain (20 modules)
  services/   Business logic layer
  db/         SQLite schema, migrations, WAL
  shared/     Types shared between main and renderer

src/
  panels/     One directory per UI panel (21 panels)
  store/      Zustand state management
  plugins/    Plugin registry + lazy loading
  components/ Shared UI primitives

styles/       Global CSS tokens and base styles
test/         Vitest test suites`}</CodeBlock>

      <H2 id="ipc">IPC Architecture</H2>
      <Paragraph>
        The IPC layer bridges the renderer (UI) and main process (backend). Each domain has its own
        handler file:
      </Paragraph>
      <CodeBlock title="electron/ipc/">{`agents.ts       Agent spawning and management
wallet.ts       Wallet operations and Helius API
git.ts          Git operations via simple-git
terminal.ts     PTY session management
editor.ts       File operations and Monaco protocol
deploy.ts       Vercel and Railway deployment
settings.ts     User preferences and configuration
tokens.ts       Token tracking and PumpFun integration
...             (20 modules total)`}</CodeBlock>

      <H2 id="state">State Management</H2>
      <Paragraph>
        DAEMON uses Zustand with one store per domain:
      </Paragraph>
      <List
        items={[
          <><code className="text-accent font-mono text-[13px]">useEditorStore</code> for open files, active tab, and editor state</>,
          <><code className="text-accent font-mono text-[13px]">useWalletStore</code> for wallet connection, balances, and tokens</>,
          <><code className="text-accent font-mono text-[13px]">useAgentStore</code> for active agents, sessions, and Grind Mode state</>,
          <><code className="text-accent font-mono text-[13px]">useGitStore</code> for branch, status, diff, and stash</>,
          <><code className="text-accent font-mono text-[13px]">useTerminalStore</code> for terminal sessions, splits, and history</>,
        ]}
      />

      <H2 id="database">Database</H2>
      <Paragraph>
        DAEMON uses better-sqlite3 in WAL (Write-Ahead Logging) mode for fast concurrent reads. The
        database runs exclusively in the main process and stores user settings, agent session
        history, token tracking data, project configurations, and the MCP server registry.
      </Paragraph>
    </>
  );
}
