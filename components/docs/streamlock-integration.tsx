import { CardGrid, Code, CodeBlock, DocHeading, DocSubheading, H2, Hint, InfoCard, List, Paragraph, Table } from "./primitives";

export function StreamlockIntegrationDoc() {
  return (
    <>
      <DocHeading>Streamlock Integration</DocHeading>
      <DocSubheading>
        DAEMON integrates Streamlock as a server-side Operator API workflow for locked
        streams, entitlement ledgers, zero-sum sessions, and settlement helpers.
      </DocSubheading>

      <Hint type="success">
        DAEMON starts Streamlock as a read-only primitive layer workflow. Builders can
        verify configuration and inspect stream discovery before any signing, ledger
        delta, settlement, or claim path is enabled.
      </Hint>

      <H2 id="overview">What the integration adds</H2>
      <Paragraph>
        Streamlock gives DAEMON a locked-asset operator path. The integration scaffolds a
        project-local readiness check, adds the expected environment placeholders, and
        keeps the operator key on the server side while the product moves toward guarded
        session and settlement flows.
      </Paragraph>

      <CardGrid>
        <InfoCard title="Operator API check">
          DAEMON creates a read-only starter at <Code>src/streamlock/operator-readiness.mjs</Code>
          and a <Code>streamlock:operator-check</Code> script for verifying API access.
        </InfoCard>
        <InfoCard title="Signing boundary">
          Session creation, ledger deltas, settlement, and claim transactions stay behind
          explicit wallet or operator-signing review instead of running from a scaffold.
        </InfoCard>
      </CardGrid>

      <H2 id="setup">Environment setup</H2>
      <Paragraph>
        The Streamlock starter uses environment variables so projects can keep secrets out
        of browser code and source control. DAEMON writes placeholders to the project env
        example, then the builder adds real values to a local env file.
      </Paragraph>

      <Table
        headers={["Variable", "Required", "Purpose"]}
        rows={[
          [<Code key="k1">STREAMLOCK_OPERATOR_KEY</Code>, "Yes", "Server-side Operator API key. Never expose it to browser code."],
          [<Code key="k2">STREAMLOCK_CHAIN</Code>, "Optional", "Chain target. Use soldev or devnet for development and mainnet for production."],
          [<Code key="k3">STREAMLOCK_API_BASE_URL</Code>, "Optional", "Hosted API base URL. Defaults to https://streamlock.fun unless overridden."],
          [<Code key="k4">SOLANA_RPC_URL</Code>, "Optional", "RPC endpoint used later by write-flow broadcast and confirmation helpers."],
          [<Code key="k5">STREAMLOCK_TOKEN_MINT</Code>, "Optional", "Mint used by the read-only starter to list existing locked streams."],
        ]}
      />

      <CodeBlock title="Environment template">
{`# Streamlock Operator API key.
# Keep this server-side only. Never expose it to browser code.
STREAMLOCK_OPERATOR_KEY=sk_replace_with_operator_key

# Chain target. Use soldev/devnet while developing and mainnet for production.
STREAMLOCK_CHAIN=soldev

# Hosted Streamlock API base URL. Override only for local or custom deployments.
STREAMLOCK_API_BASE_URL=https://streamlock.fun

# RPC used by future write-flow broadcast and confirmation helpers.
SOLANA_RPC_URL=https://api.devnet.solana.com

# Optional mint for the read-only stream discovery check.
STREAMLOCK_TOKEN_MINT=replace_with_streamlock_token_mint`}
      </CodeBlock>

      <H2 id="daemon-workflow">DAEMON workflow</H2>
      <Paragraph>
        The Integration Command Center exposes Streamlock as an infrastructure
        integration. The first workflow creates a project-local readiness script and lets
        the builder run it before enabling higher-impact operator actions.
      </Paragraph>
      <List
        items={[
          "Open a project in DAEMON and select the Streamlock integration.",
          <>Create the starter file at <Code>src/streamlock/operator-readiness.mjs</Code>.</>,
          <>Add the generated <Code>streamlock:operator-check</Code> package script.</>,
          <>Move real secrets into a local env file and keep <Code>STREAMLOCK_OPERATOR_KEY</Code> server-side.</>,
          <>Run <Code>pnpm run streamlock:operator-check</Code> or the matching package-manager command.</>,
        ]}
      />

      <H2 id="read-only-starter">Read-only starter</H2>
      <Paragraph>
        The generated starter is intentionally narrow. It confirms the Operator API shape,
        proves the key and chain headers are wired, and optionally lists streams for a
        mint. It does not create operator sessions or sign transactions.
      </Paragraph>

      <CodeBlock title="Starter request model">
{`GET /v1/operator/tokens/:mint/streams
Authorization: Bearer $STREAMLOCK_OPERATOR_KEY
Content-Type: application/json
X-Streamlock-Chain: $STREAMLOCK_CHAIN`}
      </CodeBlock>

      <List
        items={[
          "Masks the operator key in terminal output.",
          "Skips stream discovery if STREAMLOCK_TOKEN_MINT is missing or still a placeholder.",
          "Prints response chain, request id, stream count, and the first stream id when a mint is configured.",
          "Exits after read-only verification.",
          "Creates no session, submits no delta, signs no transaction, and settles no claim.",
        ]}
      />

      <H2 id="safety-model">Safety model</H2>
      <Paragraph>
        Streamlock is treated as a high-impact primitive because locked assets, ledgers,
        operator sessions, and settlement helpers can affect real user funds. DAEMON keeps
        that surface separated from renderer code and staged behind confirmation gates.
      </Paragraph>
      <List
        items={[
          "Operator keys are server-side secrets and should not be shipped to browser bundles.",
          "The default DAEMON starter is read-only and safe to run before signing flows exist.",
          "Session, delta, settle, and claim paths remain behind explicit wallet or operator-signing review.",
          "Write flows should require clear user acknowledgement, fresh confirmation, and transaction inspection.",
          "Hosted token launch flow opens Streamlock externally while DAEMON keeps wallet, token, and post-launch tools nearby.",
        ]}
      />

      <H2 id="launch-center">Launch center</H2>
      <Paragraph>
        DAEMON currently uses Streamlock as the primary external launch path for hosted
        token launches. Builders can open <Code>https://app.streamlock.fun/</Code> from
        DAEMON, complete the launch in Streamlock, then return to DAEMON for wallet
        context, token feeds, launch history, and post-launch workflows.
      </Paragraph>

      <H2 id="current-status">Current status</H2>
      <Table
        headers={["Capability", "Status"]}
        rows={[
          ["Integration card", "Implemented in the Integration Command Center."],
          ["Config check", "Implemented. DAEMON checks for STREAMLOCK_OPERATOR_KEY in project env files."],
          ["Starter scaffolding", "Implemented. DAEMON creates env placeholders, a package script, and the readiness file."],
          ["Read-only operator check", "Implemented. The starter verifies API configuration and optional stream discovery."],
          ["Hosted launch link", "Implemented. DAEMON opens the Streamlock hosted app for the current launch flow."],
          ["Operator writes and settlement previews", "Planned behind explicit signing and confirmation review."],
        ]}
      />
    </>
  );
}
