import { DocHeading, DocSubheading, H2, H3, Paragraph, List } from "./primitives";

export function DeploymentDoc() {
  return (
    <>
      <DocHeading>Deployment</DocHeading>
      <DocSubheading>
        Ship Solana programs through Shipline, and ship web services to Vercel or Railway, without leaving the workspace.
      </DocSubheading>

      <H2 id="shipline">Shipline (Solana programs)</H2>
      <Paragraph>
        Shipline is DAEMON&apos;s headline primitive: prompt → Anchor program → mainnet in 60 seconds.
      </Paragraph>
      <List
        items={[
          <><strong className="text-foreground">Prompt</strong>, describe the program in natural language; the agent scaffolds the Anchor crate, IDL, and tests</>,
          <><strong className="text-foreground">Simulate</strong>, see compute usage and account diffs inline as you tweak the program</>,
          <><strong className="text-foreground">Ship</strong>, one-click deploy via priority-fee-protected Jito bundle, signed in-app with the built-in wallet</>,
        ]}
      />
      <Paragraph>
        Shipline replaces the typical loop of editor → CLI → explorer → Phantom → retry. Same window,
        same session, no tab switches.
      </Paragraph>

      <H2 id="vercel">Vercel (web frontends)</H2>
      <Paragraph>Deploy frontend projects to Vercel with a single click:</Paragraph>
      <List
        items={[
          <><strong className="text-foreground">Connect once</strong> by linking your Vercel account in Settings &gt; Integrations</>,
          <><strong className="text-foreground">Deploy</strong> by clicking the deploy button in the Command Drawer</>,
          <><strong className="text-foreground">Monitor</strong> deployment status and logs directly in DAEMON</>,
        ]}
      />
      <Paragraph>
        DAEMON automatically detects your framework (Next.js, React, Vite, static sites) and
        configures the build settings.
      </Paragraph>

      <H2 id="railway">Railway</H2>
      <Paragraph>Deploy backend services and databases to Railway:</Paragraph>
      <List
        items={[
          <><strong className="text-foreground">Connect once</strong> by linking your Railway account in Settings &gt; Integrations</>,
          <><strong className="text-foreground">Deploy</strong> by selecting your project and clicking deploy</>,
          <><strong className="text-foreground">Monitor</strong> logs and service status in DAEMON</>,
        ]}
      />

      <H3>Use Cases</H3>
      <List
        items={[
          "Node.js API servers",
          "Database provisioning",
          "Background workers",
          "Full-stack apps (Vercel frontend + Railway backend)",
        ]}
      />

      <H2 id="workflow">Workflow</H2>
      <Paragraph>A typical deployment workflow in DAEMON:</Paragraph>
      <List
        items={[
          "Write and test your code in the Monaco editor",
          "Run tests with an AI agent or the terminal",
          "Commit changes via the visual git panel",
          "Ship, Shipline for Solana programs, one-click for Vercel or Railway",
        ]}
      />
      <Paragraph>
        The entire cycle from code to production happens inside one console. Deployment settings are
        stored per-project and persist across sessions.
      </Paragraph>
    </>
  );
}
