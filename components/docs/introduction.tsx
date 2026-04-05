import { DocHeading, DocSubheading, H2, H3, Paragraph, List, Table, Divider, Hint } from "./primitives";

export function IntroductionDoc() {
  return (
    <>
      <DocHeading>Introduction</DocHeading>
      <DocSubheading>
        What is DAEMON, why it exists, and what makes it different.
      </DocSubheading>

      <H2 id="what-is-daemon">What is DAEMON?</H2>
      <Paragraph>
        DAEMON is <strong className="text-foreground">Solana&apos;s first IDE</strong>, a
        standalone desktop application built from scratch for Solana development. It combines a
        full-featured code editor, AI agents, built-in wallet, token launcher, and one-click
        deployment into a single app.
      </Paragraph>
      <Paragraph>
        DAEMON is not a VS Code fork. It is not a plugin or extension. It is a purpose-built
        Electron application with its own editor, terminal, state management, and database layer,
        designed from day one for the Solana ecosystem.
      </Paragraph>

      <H2 id="why-daemon">Why DAEMON?</H2>
      <Paragraph>
        Building on Solana today means juggling a dozen tools: a code editor, a separate terminal,
        Phantom wallet in the browser, PumpFun in another tab, Jupiter in another, a deploy
        dashboard somewhere else, and AI assistants in yet another window.
      </Paragraph>
      <Paragraph>DAEMON consolidates all of that into one app:</Paragraph>
      <List
        items={[
          <><strong className="text-foreground">Write code</strong> in a fully offline Monaco editor with syntax highlighting, multi-tab, and breadcrumbs</>,
          <><strong className="text-foreground">Run AI agents</strong> that work on your codebase in parallel to debug, review, test, and ship simultaneously</>,
          <><strong className="text-foreground">Manage your wallet</strong> with live portfolio tracking via Helius, SPL token balances, and real-time prices</>,
          <><strong className="text-foreground">Launch tokens</strong> on PumpFun with a one-click wizard</>,
          <><strong className="text-foreground">Swap tokens</strong> via Jupiter aggregation directly from the wallet panel</>,
          <><strong className="text-foreground">Deploy</strong> to Vercel or Railway without leaving the editor</>,
          <><strong className="text-foreground">Track everything</strong> with a built-in dashboard showing price, holders, market cap, and sparkline charts</>,
        ]}
      />

      <H2 id="comparison">How DAEMON Compares</H2>
      <Table
        headers={["Feature", "DAEMON", "VS Code + Extensions"]}
        rows={[
          ["Solana wallet", "Built-in, native", "Requires browser extension"],
          ["Token launches", "One-click PumpFun wizard", "Not available"],
          ["AI agents", "Parallel execution with Grind Mode", "Single Copilot chat"],
          ["Terminal", "Real PTY via node-pty", "Integrated terminal"],
          ["Deploys", "One-click Vercel/Railway", "Requires CLI or dashboard"],
          ["Offline editor", "Custom protocol, zero CDN", "Depends on extensions"],
        ]}
      />

      <Divider />

      <H2 id="open-source">Open Source</H2>
      <Paragraph>
        DAEMON is free and open source under the MIT License.
      </Paragraph>
      <List
        items={[
          <><strong className="text-foreground">GitHub:</strong>{" "}<a href="https://github.com/nullxnothing/daemon" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">github.com/nullxnothing/daemon</a></>,
          <><strong className="text-foreground">Built by:</strong>{" "}<a href="https://github.com/nullxnothing" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">nullxnothing</a></>,
        ]}
      />
    </>
  );
}
