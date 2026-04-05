import { DocHeading, DocSubheading, H2, Paragraph, List, Code, Hint, CardGrid, InfoCard } from "./primitives";

export function TroubleshootingDoc() {
  return (
    <>
      <DocHeading>Troubleshooting</DocHeading>
      <DocSubheading>Common issues and how to fix them.</DocSubheading>

      <H2 id="editor-crash">Editor crash: &quot;Press Ctrl+K to access tools&quot;</H2>
      <Paragraph>
        Click the <strong className="text-foreground">Retry</strong> button in the error boundary.
        If the editor doesn&apos;t recover, close and reopen the tab.
      </Paragraph>
      <Paragraph>
        DAEMON wraps the Monaco editor in an ErrorBoundary that catches initialization failures.
        This usually happens on first launch or after a system sleep.
      </Paragraph>

      <H2 id="claude-not-connecting">Claude not connecting</H2>
      <Paragraph>
        Open <strong className="text-foreground">Settings &gt; Integrations</strong> and verify the
        Claude CLI is installed and authenticated.
      </Paragraph>
      <List
        items={[
          <>Run <Code>claude --version</Code> in the terminal to confirm the CLI is installed</>,
          "If not installed, DAEMON can auto-install it from Settings > Integrations > Claude",
          "If installed but not connecting, re-run the OAuth sign-in (sessions can expire)",
          "If using an API key, verify it's valid and has available credits",
        ]}
      />

      <H2 id="terminal-paste">Terminal paste not working</H2>
      <Paragraph>
        Right-click to paste in the terminal. The xterm.js terminal does not show a context menu.
        Right-click triggers paste directly. <Code>Ctrl+V</Code> may not work in all terminal
        contexts because the terminal captures keyboard input for the running process.
      </Paragraph>

      <H2 id="missing-panels">Missing tools or panels</H2>
      <Paragraph>
        Check your <strong className="text-foreground">Workspace Profile</strong> in <strong className="text-foreground">Settings &gt; Display</strong>.
        Some panels are only enabled for specific profiles:
      </Paragraph>
      <List
        items={[
          <><strong className="text-foreground">Wallet</strong> requires Solana profile (by default)</>,
          <><strong className="text-foreground">Token Dashboard</strong> requires Solana profile</>,
          <><strong className="text-foreground">Jupiter Swap</strong> requires Solana profile</>,
          <><strong className="text-foreground">Browser</strong> requires Web or Custom profile</>,
        ]}
      />
      <Hint type="info">
        Switch to the <strong>Custom</strong> profile to enable everything manually.
      </Hint>

      <H2 id="native-modules">Native module build errors</H2>
      <Paragraph>
        If you see errors related to better-sqlite3 or node-pty after installation, run:
      </Paragraph>
      <div className="my-3 rounded-xl border border-border overflow-hidden">
        <pre className="p-4 bg-[#0c0c0c]">
          <code className="text-[13px] font-mono text-accent">pnpm run rebuild</code>
        </pre>
      </div>
      <Paragraph>
        These are C++ native modules that need to be compiled for your system.
      </Paragraph>

      <H2 id="agents-not-spawning">Agents not spawning</H2>
      <List
        items={[
          "Verify Claude CLI is authenticated (see above)",
          <>Check that Node.js 22+ is installed (<Code>node --version</Code>)</>,
          "Ensure you have sufficient API credits",
          "Check the terminal output for error messages",
        ]}
      />

      <H2 id="memory">High memory usage</H2>
      <Paragraph>
        DAEMON runs multiple processes (Electron main, renderer, PTY sessions, agent processes). To
        reduce memory usage:
      </Paragraph>
      <List
        items={[
          "Close unused terminal tabs",
          "End idle agent sessions",
          "Reduce the number of Grind Mode panels for lighter tasks",
          "Close unused editor tabs",
        ]}
      />
    </>
  );
}
