import { CardGrid, Code, DocHeading, DocSubheading, H2, Hint, InfoCard, List, Paragraph, Table } from "./primitives";

export function SpawnAgentsIntegrationDoc() {
  return (
    <>
      <DocHeading>Spawn Agents Integration</DocHeading>
      <DocSubheading>
        DAEMON integrates{" "}
        <a href="https://spawnagents.fun" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          SpawnAgents
        </a>{" "}
        — a Solana-native platform for spawning autonomous on-chain trading agents with custom DNA.
        Follow{" "}
        <a href="https://x.com/spawnagents" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          @spawnagents
        </a>{" "}
        for updates on new agent modes and protocol changes.
      </DocSubheading>

      <Hint type="info">
        DAEMON connects directly to the SpawnAgents v1 API. No API key required — all actions
        are signed with your DAEMON wallet keypair.
      </Hint>

      <H2 id="overview">What the integration adds</H2>

      <CardGrid>
        <InfoCard title="Spawn autonomous trading agents">
          Configure an agent&apos;s DNA — capital allocation, risk tolerance, trade aggression,
          and market mode — then deploy it on-chain with a SOL deposit. Agents operate
          independently once funded; no desktop session required to keep them running.
        </InfoCard>
        <InfoCard title="Full lifecycle management">
          Monitor active agents from inside DAEMON: view open positions, trade history, live
          events, and on-chain status. Withdraw funds or kill an agent at any time without
          leaving the workspace.
        </InfoCard>
        <InfoCard title="Live event feed">
          The panel tails agent events in real time, giving you a continuous view of what
          each agent is doing on-chain.
        </InfoCard>
      </CardGrid>

      <Paragraph>
        SpawnAgents supports two market modes:
      </Paragraph>
      <List
        items={[
          <><strong className="text-foreground">Meme mode</strong> — agent trades Solana memecoins based on its DNA parameters</>,
          <><strong className="text-foreground">Prediction market mode</strong> — agent takes positions in prediction markets. Open to all wallets — no allowlist.</>,
        ]}
      />

      <H2 id="auth">Authentication</H2>
      <Paragraph>
        No API key. SpawnAgents uses wallet-based auth. Write actions (spawn, withdraw, kill)
        are signed with your DAEMON wallet&apos;s Ed25519 keypair — DAEMON handles signing
        automatically in the main process. The renderer never touches the private key.
      </Paragraph>

      <Hint type="info">
        Requirement: a DAEMON wallet with a keypair loaded. Set one as your default wallet
        in the Wallet panel before using Spawn Agents.
      </Hint>

      <H2 id="dna">Agent DNA</H2>
      <Paragraph>
        Every agent is configured with a DNA profile before spawning. DNA parameters control
        how the agent behaves on-chain:
      </Paragraph>

      <Table
        headers={["Parameter", "Description"]}
        rows={[
          [<strong key="sol" className="text-foreground">SOL amount</strong>, "Capital deposited to fund the agent"],
          [<strong key="mode" className="text-foreground">Market mode</strong>, <><Code key="m1">meme</Code> or <Code key="m2">prediction_market</Code></>],
          [<strong key="agg" className="text-foreground">Aggression</strong>, "How aggressively the agent enters positions"],
          [<strong key="risk" className="text-foreground">Risk tolerance</strong>, "Maximum drawdown the agent will accept"],
        ]}
      />

      <Paragraph>
        DNA is set at spawn time and cannot be changed after the agent is live. To change
        strategy, kill the agent and spawn a new one.
      </Paragraph>

      <H2 id="child-agents">Child agents</H2>
      <Paragraph>
        An active agent can spawn child agents from within its own execution context. Children
        inherit a subset of the parent&apos;s DNA but can be configured with different parameters
        — useful for running parallel strategies under a single parent without managing each
        agent independently.
      </Paragraph>
      <Paragraph>
        Child agents are tracked under their parent in the Spawn Agents panel. Each child has
        its own status, positions, and trade history. Withdrawing or killing the parent does
        not automatically affect children — each must be managed separately.
      </Paragraph>

      <H2 id="spawning">Spawning an agent</H2>
      <List
        items={[
          "Open Spawn Agents from the DAEMON command drawer.",
          "Configure the agent DNA — set SOL amount, aggression, risk tolerance, and market mode.",
          "Review the deposit address and send the required SOL.",
          <>DAEMON polls spawn status until the agent goes live (<Code>pending → active</Code>). The deposit step is manual — DAEMON shows the address and expected amount, then polls until it detects the on-chain confirmation.</>,
        ]}
      />

      <H2 id="monitoring">Monitoring</H2>
      <Paragraph>
        The Spawn Agents panel shows all agents owned by your wallet:
      </Paragraph>

      <Table
        headers={["Field", "Description"]}
        rows={[
          [<strong key="id" className="text-foreground">Agent ID</strong>, "On-chain identifier"],
          [<strong key="st" className="text-foreground">Status</strong>, <><Code key="s1">pending</Code> · <Code key="s2">active</Code> · <Code key="s3">dead</Code></>],
          [<strong key="mo" className="text-foreground">Mode</strong>, <><Code key="m1">meme</Code> or <Code key="m2">prediction_market</Code></>],
          [<strong key="po" className="text-foreground">Positions</strong>, "Open meme or PM positions"],
          [<strong key="tr" className="text-foreground">Trades</strong>, "Full trade history"],
          [<strong key="ev" className="text-foreground">Events</strong>, "Live event feed (polled every 5s)"],
        ]}
      />

      <Paragraph>
        Switch between the Positions and Trades tabs in an agent&apos;s detail view for a
        full breakdown of its on-chain activity.
      </Paragraph>

      <H2 id="actions">Agent actions</H2>
      <Paragraph>
        <strong className="text-foreground">Withdraw</strong> — pulls remaining funds from
        an active agent back to your wallet. Requires wallet signature. The agent continues
        running after a partial withdraw.
      </Paragraph>
      <Paragraph>
        <strong className="text-foreground">Kill</strong> — terminates the agent and triggers
        a full withdrawal. Irreversible. DAEMON shows a confirmation prompt before signing —
        once confirmed, the signed kill request is sent and the agent is shut down on-chain.
      </Paragraph>

      <H2 id="safety">Safety model</H2>
      <List
        items={[
          "Private keys never leave DAEMON's main process",
          "All write actions require an explicit user trigger — nothing auto-submits",
          "Kill requires a confirmation step before the signed request is sent",
          "The panel shows a no-wallet fallback if no keypair is configured",
        ]}
      />

      <H2 id="links">Links</H2>
      <List
        items={[
          <><a href="https://spawnagents.fun" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SpawnAgents website</a></>,
          <><a href="https://x.com/spawnagents" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@spawnagents on X</a></>,
        ]}
      />
    </>
  );
}
