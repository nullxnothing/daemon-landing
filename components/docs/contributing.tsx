import { DocHeading, DocSubheading, H2, H3, Paragraph, Table, CodeBlock, List, Hint } from "./primitives";

export function ContributingDoc() {
  return (
    <>
      <DocHeading>Contributing</DocHeading>
      <DocSubheading>
        How to set up DAEMON for local development and submit contributions.
      </DocSubheading>

      <H2 id="getting-started">Getting Started</H2>
      <CodeBlock title="Terminal">{`git clone https://github.com/nullxnothing/daemon.git
cd daemon
pnpm install
pnpm run dev`}</CodeBlock>
      <Paragraph>In a second terminal, run the type checker in watch mode:</Paragraph>
      <CodeBlock>{`pnpm run typecheck:watch`}</CodeBlock>

      <H2 id="requirements">Requirements</H2>
      <Table
        headers={["Requirement", "Version"]}
        rows={[
          ["Node.js", "22+"],
          ["pnpm", "9+"],
          ["OS", "Windows or macOS (Linux experimental)"],
        ]}
      />

      <H2 id="commands">Development Commands</H2>
      <Table
        headers={["Command", "Description"]}
        rows={[
          [<code key="dev" className="text-accent font-mono text-[13px]">pnpm run dev</code>, "Start dev server with hot reload"],
          [<code key="tc" className="text-accent font-mono text-[13px]">pnpm run typecheck</code>, "Run TypeScript checks"],
          [<code key="test" className="text-accent font-mono text-[13px]">pnpm run test</code>, "Run the test suite"],
          [<code key="build" className="text-accent font-mono text-[13px]">pnpm run build</code>, "Production build"],
          [<code key="pkg" className="text-accent font-mono text-[13px]">pnpm run package</code>, "Create distributable (.exe / .dmg)"],
          [<code key="rb" className="text-accent font-mono text-[13px]">pnpm run rebuild</code>, "Rebuild native modules"],
        ]}
      />

      <H2 id="native-modules">Native Modules</H2>
      <Paragraph>
        better-sqlite3 and node-pty are C++ native modules rebuilt automatically via postinstall.
        If you hit issues after pnpm install:
      </Paragraph>
      <CodeBlock>{`pnpm run rebuild`}</CodeBlock>

      <H2 id="architecture">Architecture</H2>
      <CodeBlock>{`electron/          Main process — IPC handlers, services, database
  ipc/             One handler file per domain
  services/        Business logic (never imported from renderer)
  db/              SQLite schema + migrations
  shared/          Types shared between main and renderer

src/               Renderer — React 18 + TypeScript
  panels/          One directory per panel
  store/           Zustand stores
  components/      Shared UI components

styles/            Global CSS tokens and base styles
test/              Vitest test suites`}</CodeBlock>

      <H2 id="rules">Rules</H2>
      <List
        items={[
          "All DB access stays in the main process — renderer uses IPC only",
          <>All IPC handlers use <code className="text-accent font-mono text-[13px]">IpcHandlerFactory</code> and return {"{ ok, data/error }"}</>,
          "CSS Modules only, no Tailwind — follow existing token system",
          "No emoji in UI chrome — status via colored dots only",
          "Test with pnpm run package before PRs that touch native modules",
        ]}
      />

      <H2 id="commits">Commit Convention</H2>
      <Table
        headers={["Prefix", "Use"]}
        rows={[
          [<code key="feat" className="text-accent font-mono text-[13px]">feat:</code>, "New feature"],
          [<code key="fix" className="text-accent font-mono text-[13px]">fix:</code>, "Bug fix"],
          [<code key="ref" className="text-accent font-mono text-[13px]">refactor:</code>, "Code change (not a fix or feature)"],
          [<code key="docs" className="text-accent font-mono text-[13px]">docs:</code>, "Documentation only"],
          [<code key="test" className="text-accent font-mono text-[13px]">test:</code>, "Adding or updating tests"],
          [<code key="chore" className="text-accent font-mono text-[13px]">chore:</code>, "Maintenance tasks"],
        ]}
      />

      <H2 id="pull-requests">Pull Requests</H2>
      <List
        items={[
          "Keep PRs focused — one feature or fix per PR",
          "Include screenshots for UI changes",
          "Ensure pnpm run typecheck and pnpm run test pass",
          "Fill out the PR template",
        ]}
      />
    </>
  );
}
