import Image from "next/image";
import { DocHeading, DocSubheading, H2, Paragraph, CardGrid, InfoCard, List } from "./primitives";

export function UIOverviewDoc() {
  return (
    <>
      <DocHeading>UI Overview</DocHeading>
      <DocSubheading>
        DAEMON&apos;s interface: sidebar, editor, panels, terminal, and status bar.
      </DocSubheading>

      <H2 id="layout">Layout</H2>
      <div className="my-6 rounded-xl border border-border overflow-hidden">
        <Image
          src="/images/ui-overview.webp"
          alt="DAEMON UI layout showing sidebar, editor, terminal, and right panel"
          width={1920}
          height={1080}
          className="w-full"
        />
      </div>

      <H2 id="sidebar">Left Sidebar</H2>
      <Paragraph>
        The sidebar provides icon-based navigation for all major panels:
      </Paragraph>
      <CardGrid>
        <InfoCard title="F - Files">File explorer and project tree</InfoCard>
        <InfoCard title="S - Search">Full-text search across your project</InfoCard>
        <InfoCard title="G - Git">Visual git interface (branch, commit, push)</InfoCard>
        <InfoCard title="T - Terminal">Terminal session manager</InfoCard>
        <InfoCard title="W - Wallet">Solana wallet and token dashboard</InfoCard>
      </CardGrid>

      <H2 id="center">Center Area</H2>
      <Paragraph>
        The center area contains the Monaco editor with tabbed navigation. Two tabs are permanently
        pinned:
      </Paragraph>
      <List
        items={[
          <><strong className="text-foreground">Browser</strong> with built-in security sandbox for previewing your app</>,
          <><strong className="text-foreground">Dashboard</strong> with real-time token price, holders, and charts</>,
        ]}
      />

      <H2 id="right-panel">Right Panel</H2>
      <List
        items={[
          <><strong className="text-foreground">Claude</strong> showing agent connection status, active MCP servers, current model, and available skills</>,
          <><strong className="text-foreground">Dashboard</strong> for quick access to token metrics</>,
          <><strong className="text-foreground">Sessions</strong> to view and manage active agent sessions</>,
        ]}
      />

      <H2 id="terminal">Bottom Terminal</H2>
      <Paragraph>
        A full xterm.js terminal powered by real PTY sessions via node-pty:
      </Paragraph>
      <List
        items={[
          "Multiple terminal tabs",
          "Split panes (horizontal and vertical)",
          "Per-project terminal sessions",
          <>Command history with <code className="px-1.5 py-0.5 rounded-md bg-[#1a1a1a] border border-border text-accent font-mono text-[13px]">Ctrl+R</code></>,
          "Tab completion",
          <>Search with <code className="px-1.5 py-0.5 rounded-md bg-[#1a1a1a] border border-border text-accent font-mono text-[13px]">Ctrl+Shift+F</code></>,
        ]}
      />

      <H2 id="status-bar">Status Bar</H2>
      <Paragraph>
        Runs along the bottom and displays the current git branch, market ticker (live token
        prices), and wallet balance (SOL + USD value).
      </Paragraph>
    </>
  );
}
