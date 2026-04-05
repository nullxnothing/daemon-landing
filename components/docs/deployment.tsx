import { DocHeading, DocSubheading, H2, H3, Paragraph, List } from "./primitives";

export function DeploymentDoc() {
  return (
    <>
      <DocHeading>Deployment</DocHeading>
      <DocSubheading>
        One-click deployment to Vercel and Railway directly from the editor.
      </DocSubheading>

      <H2 id="vercel">Vercel</H2>
      <Paragraph>Deploy frontend projects to Vercel with a single click:</Paragraph>
      <List
        items={[
          <><strong className="text-foreground">Connect once</strong> — Link your Vercel account in Settings &gt; Integrations</>,
          <><strong className="text-foreground">Deploy</strong> — Click the deploy button in the Command Drawer</>,
          <><strong className="text-foreground">Monitor</strong> — View deployment status and logs directly in DAEMON</>,
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
          <><strong className="text-foreground">Connect once</strong> — Link your Railway account in Settings &gt; Integrations</>,
          <><strong className="text-foreground">Deploy</strong> — Select your project and click deploy</>,
          <><strong className="text-foreground">Monitor</strong> — View logs and service status in DAEMON</>,
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
          "Click deploy — your app is live",
        ]}
      />
      <Paragraph>
        The entire cycle from code to production happens inside one app. Deployment settings are
        stored per-project and persist across sessions.
      </Paragraph>
    </>
  );
}
