import { DocHeading, DocSubheading, H2, Paragraph, Table, List, CardGrid, InfoCard, Hint } from "./primitives";

export function SolanaDevelopmentDoc() {
  return (
    <>
      <DocHeading>Solana Development</DocHeading>
      <DocSubheading>
        Built-in wallet, token launches, Jupiter swaps, dashboard, and session registry.
      </DocSubheading>

      <H2 id="wallet">Connect Wallet</H2>
      <Paragraph>
        Import an existing keypair (base58 private key) or generate a new wallet directly inside
        DAEMON. Your wallet is stored locally and encrypted via the OS keychain.
      </Paragraph>
      <Paragraph>Once connected, the wallet panel shows:</Paragraph>
      <List
        items={[
          "SOL balance (live via Helius)",
          "All SPL token holdings with USD values",
          "Transaction history",
        ]}
      />

      <H2 id="launch-tokens">Launch Tokens</H2>
      <Paragraph>
        Create tokens on PumpFun with DAEMON&apos;s built-in Launch Wizard:
      </Paragraph>
      <List
        items={[
          "Open the Token Launcher panel",
          <>Set token <strong className="text-foreground">name</strong>, <strong className="text-foreground">symbol</strong>, and <strong className="text-foreground">image</strong></>,
          "Add socials (Twitter, Telegram, website)",
          <>Click <strong className="text-foreground">Launch</strong> and DAEMON handles the bonding curve interaction</>,
        ]}
      />
      <Hint type="info">
        The entire process is one click from inside the IDE. No need to visit PumpFun in a browser.
      </Hint>

      <H2 id="import-tokens">Import Tokens</H2>
      <List
        items={[
          <><strong className="text-foreground">By mint address</strong> to paste any SPL token&apos;s mint address</>,
          <><strong className="text-foreground">Auto-detect</strong> to scan your connected wallet and automatically import all holdings</>,
        ]}
      />

      <H2 id="dashboard">Dashboard</H2>
      <Table
        headers={["Metric", "Description"]}
        rows={[
          [<strong key="p" className="text-foreground">Price</strong>, "Live price via Helius/Jupiter"],
          [<strong key="h" className="text-foreground">Holders</strong>, "Current holder count"],
          [<strong key="m" className="text-foreground">Market Cap</strong>, "Fully diluted market cap"],
          [<strong key="s" className="text-foreground">Sparkline</strong>, "24h price chart"],
          [<strong key="v" className="text-foreground">Volume</strong>, "Trading volume"],
        ]}
      />

      <H2 id="jupiter-swaps">Jupiter Swaps</H2>
      <Paragraph>
        Swap tokens directly from the wallet panel using Jupiter aggregation:
      </Paragraph>
      <List
        items={[
          "Best route finding across all Solana DEXs",
          "Slippage protection",
          "Transaction preview before signing",
          "No need to leave the IDE",
        ]}
      />

      <H2 id="session-registry">Session Registry</H2>
      <Paragraph>
        The Session Registry is an on-chain proof-of-development feature unique to DAEMON. It
        records AI agent sessions to the Solana blockchain for transparency.
      </Paragraph>
      <CardGrid>
        <InfoCard title="What's recorded">Session start/end, agent type, task summary</InfoCard>
        <InfoCard title="Why">Verifiable proof that AI-assisted development occurred</InfoCard>
      </CardGrid>
      <Paragraph>
        This is optional and can be enabled per-project in <strong className="text-foreground">Settings &gt; Solana &gt; Session Registry</strong>.
      </Paragraph>
    </>
  );
}
