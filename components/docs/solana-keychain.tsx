import { DocHeading, DocSubheading, H2, H3, Paragraph, List, Table, Code, CodeBlock, Hint, Divider, CardGrid, InfoCard } from "./primitives";

export function SolanaKeychainDoc() {
  return (
    <>
      <DocHeading>Solana Keychain</DocHeading>
      <DocSubheading>
        Enterprise-grade signing with pluggable backends — AWS KMS, Fireblocks, Turnkey, and more.
      </DocSubheading>

      <Hint type="info">
        Solana Keychain integration is in active development. This page documents the architecture
        and planned implementation. Built on the <a href="https://github.com/solana-foundation/solana-keychain" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Solana Foundation&apos;s official keychain SDK</a>.
      </Hint>

      <H2 id="overview">Overview</H2>
      <Paragraph>
        By default, DAEMON stores wallet keypairs locally using your OS keychain (via Electron&apos;s
        safeStorage). This works great for solo development, but teams and enterprises need more:
        hardware security modules, cloud KMS, custodial platforms, and audit trails.
      </Paragraph>
      <Paragraph>
        Solana Keychain is a unified signing library maintained by the Solana Foundation. It lets
        DAEMON support <strong className="text-foreground">10 signing backends</strong> through a
        single interface — without changing how the rest of the app works.
      </Paragraph>

      <H2 id="supported-backends">Supported Backends</H2>
      <Table
        headers={["Backend", "Package", "Use Case"]}
        rows={[
          [<strong key="m" className="text-foreground">Local Keypair</strong>, "Built-in (default)", "Solo development, testing"],
          [<strong key="a" className="text-foreground">AWS KMS</strong>, <Code key="ac">@solana/keychain-aws-kms</Code>, "Cloud-managed signing with IAM policies"],
          [<strong key="g" className="text-foreground">GCP KMS</strong>, <Code key="gc">@solana/keychain-gcp-kms</Code>, "Google Cloud key management"],
          [<strong key="v" className="text-foreground">HashiCorp Vault</strong>, <Code key="vc">@solana/keychain-vault</Code>, "Self-hosted secret management"],
          [<strong key="t" className="text-foreground">Turnkey</strong>, <Code key="tc">@solana/keychain-turnkey</Code>, "Non-custodial wallet infrastructure"],
          [<strong key="p" className="text-foreground">Privy</strong>, <Code key="pc">@solana/keychain-privy</Code>, "Embedded wallet platform"],
          [<strong key="f" className="text-foreground">Fireblocks</strong>, <Code key="fc">@solana/keychain-fireblocks</Code>, "Institutional custody with policies"],
          [<strong key="c" className="text-foreground">Coinbase CDP</strong>, <Code key="cc">@solana/keychain-cdp</Code>, "Coinbase Developer Platform"],
          [<strong key="d" className="text-foreground">Dfns</strong>, <Code key="dc">@solana/keychain-dfns</Code>, "Programmable key management"],
          [<strong key="x" className="text-foreground">Crossmint</strong>, <Code key="xc">@solana/keychain-crossmint</Code>, "Managed wallet transactions"],
          [<strong key="pa" className="text-foreground">Para</strong>, <Code key="pac">@solana/keychain-para</Code>, "MPC-based signing"],
        ]}
      />

      <H2 id="how-it-works">How It Works</H2>
      <Paragraph>
        DAEMON&apos;s wallet architecture already isolates all signing in the Electron main process.
        The renderer (UI) never sees private keys — it only sends signing requests over IPC. This
        makes keychain integration clean: we only change <em>where</em> the signing happens, not
        <em>how</em> the UI works.
      </Paragraph>

      <H3>Current Flow (Local Keypair)</H3>
      <CodeBlock>{`Renderer: wallet:swap-execute(walletId, ...)
    │
Main Process:
    withKeypair(walletId, async (keypair) => {
        SecureKeyService.getKey()      // OS keychain
          → safeStorage.decryptString()
          → bs58.decode()
          → Keypair.fromSecretKey()

        transaction.sign([keypair])
        connection.sendRawTransaction()
        keypair.secretKey.fill(0)       // zero memory
    })
    │
Renderer: ← { ok: true, data: signature }`}</CodeBlock>

      <H3>New Flow (With Keychain)</H3>
      <CodeBlock>{`Renderer: wallet:swap-execute(walletId, ...)
    │
Main Process:
    withSigner(walletId, async (signer) => {
        // Resolves backend based on wallet config:
        //   'memory'  → SecureKeyService (current behavior)
        //   'aws-kms' → createAwsKmsSigner(config)
        //   'vault'   → createVaultSigner(config)
        //   etc.

        signer.signTransactions([transaction])
        connection.sendRawTransaction()
    })
    │
Renderer: ← { ok: true, data: signature }`}</CodeBlock>

      <Hint type="success">
        The renderer and all IPC contracts stay exactly the same. The UI doesn&apos;t need to know
        which backend signed the transaction.
      </Hint>

      <H2 id="architecture">Architecture</H2>

      <H3>Backend (Electron Main Process)</H3>
      <Paragraph>
        A new <Code>KeychainService</Code> acts as a factory that creates the right signer based on
        each wallet&apos;s configuration:
      </Paragraph>
      <CodeBlock title="electron/services/KeychainService.ts">{`import {
  createAwsKmsSigner,
  createTurnkeySigner,
  createVaultSigner,
  type SolanaSigner,
} from "@solana/keychain";

type SignerType = "memory" | "aws-kms" | "gcp-kms"
  | "vault" | "turnkey" | "privy" | "fireblocks";

async function createSigner(
  walletId: string,
  config: SignerConfig
): Promise<SolanaSigner> {
  switch (config.type) {
    case "memory":
      return createMemorySigner(walletId);
    case "aws-kms":
      return createAwsKmsSigner({
        keyId: config.keyId,
        publicKey: config.publicKey,
        region: config.region,
        credentials: {
          accessKeyId: SecureKeyService.getKey(\`AWS_KEY_\${walletId}\`),
          secretAccessKey: SecureKeyService.getKey(\`AWS_SECRET_\${walletId}\`),
        },
      });
    case "vault":
      return createVaultSigner({
        keyName: config.keyName,
        publicKey: config.publicKey,
        vaultAddr: config.vaultAddr,
        vaultToken: SecureKeyService.getKey(\`VAULT_TOKEN_\${walletId}\`),
      });
    // ... other backends
  }
}`}</CodeBlock>

      <H3>The withSigner Wrapper</H3>
      <Paragraph>
        Replaces the existing <Code>withKeypair()</Code> — same pattern, different signer source:
      </Paragraph>
      <CodeBlock title="electron/services/SolanaService.ts">{`async function withSigner<T>(
  walletId: string,
  fn: (signer: SolanaSigner) => Promise<T>
): Promise<T> {
  const wallet = db.getWallet(walletId);
  const signerConfig = wallet.signer_config
    ? JSON.parse(wallet.signer_config)
    : { type: "memory" };

  const signer = await createSigner(walletId, signerConfig);

  if (!(await signer.isAvailable())) {
    throw new Error("Signer backend not available");
  }

  return fn(signer);
}`}</CodeBlock>

      <H3>Database Changes</H3>
      <CodeBlock title="SQL">{`ALTER TABLE wallets ADD COLUMN signer_type TEXT DEFAULT 'memory';
ALTER TABLE wallets ADD COLUMN signer_config TEXT;

-- Backend credentials stored in existing secure_keys table
-- e.g., AWS_KEY_{walletId}, VAULT_TOKEN_{walletId}`}</CodeBlock>

      <H3>New IPC Handlers</H3>
      <Table
        headers={["Handler", "Purpose"]}
        rows={[
          [<Code key="b">keychain:backends</Code>, "List available signing backends"],
          [<Code key="c">keychain:configure</Code>, "Set up a backend for a wallet"],
          [<Code key="t">keychain:test</Code>, "Test backend connectivity"],
        ]}
      />

      <H2 id="frontend">Frontend (Renderer)</H2>
      <Paragraph>
        A new <strong className="text-foreground">Signing Backend</strong> section in wallet settings
        lets users pick and configure their backend:
      </Paragraph>

      <CardGrid>
        <InfoCard title="Backend Selector">
          Radio-style list showing all available backends. Local Keypair is the default. Each option
          shows the backend name, description, and connection status.
        </InfoCard>
        <InfoCard title="Configuration Forms">
          Backend-specific forms for entering credentials (API keys, regions, key IDs). All secrets
          are sent to the main process and stored encrypted — never held in the renderer.
        </InfoCard>
        <InfoCard title="Connection Test">
          One-click test button that calls the backend&apos;s isAvailable() method and reports
          success or error with actionable diagnostics.
        </InfoCard>
        <InfoCard title="Wallet Badge">
          Small indicator on the wallet panel showing which backend is active (e.g., &quot;AWS
          KMS&quot; badge next to the wallet name).
        </InfoCard>
      </CardGrid>

      <H2 id="what-changes">What Changes vs What Stays</H2>
      <Table
        headers={["Component", "Changes?", "Details"]}
        rows={[
          ["SecureKeyService", "No", "Still used for local keys + backend credentials"],
          ["withKeypair()", <strong key="y1" className="text-accent">Yes → withSigner()</strong>, "Wrapper resolves signer type"],
          ["Signing logic", <strong key="y2" className="text-accent">Yes</strong>, "Uses signer.signTransactions() instead of keypair.sign()"],
          ["IPC contract", "Minimal", "Existing handlers unchanged, 3 new handlers added"],
          ["Wallet UI", <strong key="y3" className="text-accent">Yes</strong>, "New backend settings section"],
          ["Transaction history", "No", "Identical — just stores signatures"],
          ["Helius / portfolio", "No", "Read-only, doesn't involve signing"],
          ["Jupiter swaps", "Signing only", "Quote flow unchanged"],
          ["PumpFun launches", "Signing only", "Token creation flow unchanged"],
          ["Rate limiting", "No", "All existing security checks stay"],
        ]}
      />

      <H2 id="backend-setup">Backend Setup Examples</H2>

      <H3>AWS KMS</H3>
      <Paragraph>Requirements: an Ed25519 KMS key with SIGN_VERIFY usage.</Paragraph>
      <CodeBlock>{`// Key must be ECC_NIST_EDWARDS25519 algorithm
// IAM policy needs: kms:Sign and kms:DescribeKey

{
  backend: "aws-kms",
  keyId: "arn:aws:kms:us-east-1:123456:key/uuid",
  publicKey: "YourSolanaBase58Address",
  region: "us-east-1"
}`}</CodeBlock>

      <H3>HashiCorp Vault</H3>
      <Paragraph>Requirements: Vault transit engine with an Ed25519 key.</Paragraph>
      <CodeBlock>{`// Setup:
// vault secrets enable transit
// vault write -f transit/keys/solana-key type=ed25519

{
  backend: "vault",
  vaultAddr: "https://vault.example.com:8200",
  keyName: "solana-key",
  publicKey: "YourSolanaBase58Address"
}`}</CodeBlock>

      <H3>Turnkey</H3>
      <Paragraph>Non-custodial wallet infrastructure with policy controls.</Paragraph>
      <CodeBlock>{`{
  backend: "turnkey",
  organizationId: "your-org-id",
  privateKeyId: "your-key-id",
  publicKey: "YourSolanaBase58Address"
}`}</CodeBlock>

      <Divider />

      <H2 id="migration">Migration Path</H2>
      <List
        items={[
          <><strong className="text-foreground">Phase 1</strong> — Add @solana/keychain, build KeychainService, create withSigner() wrapper. Zero user-facing changes — local keypair behavior is identical.</>,
          <><strong className="text-foreground">Phase 2</strong> — Add keychain IPC handlers and backend selector UI. Users can now switch backends per-wallet.</>,
          <><strong className="text-foreground">Phase 3</strong> — Add backend-specific config forms one at a time (AWS KMS first, then Vault, Turnkey, etc.).</>,
        ]}
      />

      <H2 id="security">Security</H2>
      <List
        items={[
          <><strong className="text-foreground">Keys never in renderer</strong> — All signing stays in the Electron main process behind IPC</>,
          <><strong className="text-foreground">Credentials encrypted</strong> — Backend API keys stored via SecureKeyService (OS keychain encryption)</>,
          <><strong className="text-foreground">Memory cleanup</strong> — Local keypairs zeroed after use, remote backends never expose raw keys</>,
          <><strong className="text-foreground">Health checks</strong> — isAvailable() called before every signing operation</>,
          <><strong className="text-foreground">Audit trail</strong> — All transactions logged to transaction_history table regardless of backend</>,
          <><strong className="text-foreground">Security audited</strong> — The solana-keychain SDK has undergone independent security review by Accretion</>,
        ]}
      />
    </>
  );
}
