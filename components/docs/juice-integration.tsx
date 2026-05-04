import { CardGrid, Code, CodeBlock, DocHeading, DocSubheading, H2, H3, Hint, InfoCard, List, Paragraph, Table } from "./primitives";

export function JuiceIntegrationDoc() {
  return (
    <>
      <DocHeading>Juice Integration</DocHeading>
      <DocSubheading>
        DAEMON integrates Juice as a market-making operator cockpit for MM wallets,
        balances, PNL, scouting reports, mint crowding checks, strategy previews, and
        guarded execution.
      </DocSubheading>

      <Hint type="success">
        DAEMON treats Juice as infrastructure plus an operator workflow, not just an API
        connection. The goal is to let builders inspect, understand, preview, and approve
        Juice actions from one Solana-native workspace.
      </Hint>

      <H2 id="overview">What the integration adds</H2>
      <Paragraph>
        The Juice integration gives DAEMON a dedicated control surface for market-making
        workflows. Users can add their <Code>JUICE_API_KEY</Code>, load MM wallet state,
        inspect wallet balances and PNL, review scouting reports, check mint crowding, and
        model what Juice might do next before any money-moving action is approved.
      </Paragraph>

      <CardGrid>
        <InfoCard title="Operator cockpit">
          A dedicated Juice panel for API key setup, wallet status, PNL, balances, scouts,
          crowding data, strategy previews, and guarded execution controls.
        </InfoCard>
        <InfoCard title="Main-process safety">
          Juice API calls live in Electron services and are routed through DAEMON&apos;s typed
          IPC/engine boundary instead of being called directly from the renderer.
        </InfoCard>
      </CardGrid>

      <H2 id="setup">API key setup</H2>
      <Paragraph>
        Users paste their Juice API key directly into the Juice cockpit. DAEMON validates
        the key with a read-only Juice wallet request, then stores it through DAEMON&apos;s
        secure key system.
      </Paragraph>
      <List
        items={[
          <>The key name is <Code>JUICE_API_KEY</Code>.</>,
          "The key is validated before being saved.",
          "The key can be removed from the Juice panel.",
          "The renderer never needs to hold the key after setup.",
        ]}
      />

      <CodeBlock title="Key setup flow">
{`User pastes JUICE_API_KEY
  -> DAEMON validates through JuiceService.storeJuiceKey()
  -> JuiceService calls GET /api/mm-api/tokens
  -> SecureKeyService stores JUICE_API_KEY
  -> Juice cockpit unlocks read-only dashboard actions`}
      </CodeBlock>

      <H2 id="read-only-dashboard">Read-only dashboard</H2>
      <Paragraph>
        The first layer of the integration is a read-only dashboard. It lets a builder see
        the state of their Juice MM operation without triggering any trades or wallet
        changes.
      </Paragraph>

      <Table
        headers={["Surface", "What DAEMON shows", "Juice source"]}
        rows={[
          [<strong key="wallets" className="text-foreground">MM wallets</strong>, "Wallet public key, active/idle state, assigned mint, SL/TP values, deactivation state", <Code key="c1">GET /tokens</Code>],
          [<strong key="balances" className="text-foreground">Balances</strong>, "SOL balance and token balances for each Juice wallet", <Code key="c2">GET /tokens/:id/balances</Code>],
          [<strong key="pnl" className="text-foreground">PNL</strong>, "Total, realized, and unrealized PNL per wallet", <Code key="c3">GET /tokens/:id/pnl</Code>],
          [<strong key="scouts" className="text-foreground">Scouting report</strong>, "Token candidates, grades, scores, liquidity, market cap, and price action", <Code key="c4">GET /scouting-report</Code>],
          [<strong key="mints" className="text-foreground">Mint inspection</strong>, "Crowding level, MM wallet count, total position, liquidity, and position/liquidity ratio", <Code key="c5">GET /mints/:mint</Code>],
        ]}
      />

      <H2 id="strategy-preview">Strategy preview</H2>
      <Paragraph>
        DAEMON includes a backend strategy preview service. This service asks Juice for
        wallets, PNL, scouting reports, and mint crowding data, then returns a read-only
        model of what might be worth looking at next.
      </Paragraph>

      <List
        items={[
          "Sell candidates: active wallets whose PNL is at or above the user-defined target.",
          "Entry candidates: scouted tokens that pass the crowding filter.",
          "Skipped candidates: tokens rejected because mint details are unavailable or crowding is too high.",
          "No buy, sell, or wallet-edit action is executed by the preview service.",
        ]}
      />

      <CodeBlock title="Strategy preview model">
{`Input:
  targetPnlUsd: number
  maxCrowdLevel: number
  scoutLimit: number

Output:
  sellCandidates[]
  entryCandidates[]
  skipped[]
  generatedAt`}
      </CodeBlock>

      <H2 id="guarded-execution">Guarded execution</H2>
      <Paragraph>
        DAEMON now has the backend foundation for Juice write and transaction actions, but
        they are guarded. This means no action that can move funds or change MM behavior can
        run silently.
      </Paragraph>

      <Hint type="warning">
        Guarded execution is intentionally stricter than normal read-only API calls. The
        UI requires the user to acknowledge impact, arm the action, and execute within a
        short confirmation window. The backend enforces the same rules.
      </Hint>

      <Table
        headers={["Action", "Status", "Guardrails"]}
        rows={[
          [<strong key="buy" className="text-foreground">Buy</strong>, "Backend + UI guarded controls", "Requires acknowledgedImpact and fresh confirmedAt"],
          [<strong key="sell" className="text-foreground">Sell all</strong>, "Backend + UI guarded controls", "Requires output mint, acknowledgedImpact, and fresh confirmedAt"],
          [<strong key="edit" className="text-foreground">Edit wallet</strong>, "Backend + UI guarded controls", "Requires wallet id, acknowledgedImpact, and fresh confirmedAt"],
          [<strong key="create" className="text-foreground">Create wallet</strong>, "Backend support only", "Requires private-key acknowledgement before execution"],
        ]}
      />

      <H3 id="confirmation-window">Confirmation window</H3>
      <Paragraph>
        Every guarded action requires a fresh confirmation timestamp. DAEMON&apos;s backend
        rejects the action if confirmation is missing, stale, or if the user did not
        explicitly acknowledge impact.
      </Paragraph>

      <CodeBlock title="Guard requirements">
{`acknowledgedImpact: true
confirmedAt: Date.now()
confirmation TTL: 60 seconds

If the confirmation expires:
  -> action is rejected
  -> user must review and arm again`}
      </CodeBlock>

      <H2 id="architecture">How it is wired</H2>
      <Paragraph>
        The integration is split across DAEMON&apos;s main process, IPC/engine bridge, and
        renderer cockpit. Juice API calls stay in Electron services. The renderer talks to
        those services through DAEMON&apos;s existing engine bridge.
      </Paragraph>

      <CodeBlock title="Integration file map">
{`electron/services/JuiceService.ts
  API key validation
  read-only wallet, balance, PNL, scout, mint calls
  guarded create/edit/buy/sell-all methods

electron/services/JuiceStrategyPreviewService.ts
  read-only strategy preview model

electron/ipc/engine.ts
  engine routes for juice:* actions

src/panels/JuicePanel/JuicePanel.tsx
  Juice cockpit UI

src/panels/IntegrationCommandCenter/registry.ts
  Juice integration card

src/panels/SolanaToolbox/catalog.ts
  Juice protocol entry`}
      </CodeBlock>

      <H2 id="engine-actions">Engine actions</H2>
      <Table
        headers={["Engine action", "Purpose"]}
        rows={[
          [<Code key="a1">juice:has-key</Code>, "Check whether JUICE_API_KEY is configured"],
          [<Code key="a2">juice:store-key</Code>, "Validate and store a Juice API key"],
          [<Code key="a3">juice:delete-key</Code>, "Remove the stored Juice API key"],
          [<Code key="a4">juice:list-wallets</Code>, "Load Juice MM wallets"],
          [<Code key="a5">juice:get-balances</Code>, "Load balances for a Juice wallet"],
          [<Code key="a6">juice:get-pnl</Code>, "Load PNL for a Juice wallet"],
          [<Code key="a7">juice:get-mint-details</Code>, "Inspect mint crowding and position data"],
          [<Code key="a8">juice:get-scouting-report</Code>, "Load Juice scouting reports"],
          [<Code key="a9">juice:strategy-preview</Code>, "Build the read-only next-action model"],
          [<Code key="a10">juice:buy</Code>, "Guarded buy execution"],
          [<Code key="a11">juice:sell-all</Code>, "Guarded sell-all execution"],
          [<Code key="a12">juice:edit-wallet</Code>, "Guarded MM wallet update"],
          [<Code key="a13">juice:create-wallet</Code>, "Guarded create-wallet backend path"],
        ]}
      />

      <H2 id="safety-model">Safety model</H2>
      <Paragraph>
        DAEMON is designed so agents and UI surfaces can assist the operator without
        silently moving funds. Juice execution is treated as high-impact and must pass a
        backend guard before it can run.
      </Paragraph>
      <List
        items={[
          "Read-only actions can load data without confirmation.",
          "Write and transaction actions require acknowledgement and fresh confirmation.",
          "Confirmation expires after 60 seconds.",
          "Create-wallet requires private-key handling acknowledgement.",
          "The UI explains that actions may move funds, change MM behavior, or execute real on-chain transactions.",
        ]}
      />

      <H2 id="current-status">Current status</H2>
      <Paragraph>
        The Juice integration is currently implemented on a DAEMON feature branch and is
        being reviewed as a draft PR. The core cockpit, read-only data flow, strategy
        preview, and guarded execution foundation are in place.
      </Paragraph>
      <List
        items={[
          "Read-only cockpit: implemented",
          "API key setup: implemented",
          "Mint crowding inspection: implemented",
          "Strategy preview: implemented",
          "Guarded buy/sell/edit controls: implemented",
          "Create-wallet backend: implemented, UI intentionally held until private-key UX is finalized",
          "Build/typecheck and live Juice key testing: still required before production merge",
        ]}
      />
    </>
  );
}
