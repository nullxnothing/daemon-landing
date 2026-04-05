import { DocHeading, DocSubheading, H2, Paragraph, Table, Hint, List } from "./primitives";

export function OnboardingDoc() {
  return (
    <>
      <DocHeading>Onboarding</DocHeading>
      <DocSubheading>
        First-launch wizard: workspace profile, Claude setup, and integrations.
      </DocSubheading>

      <H2 id="workspace-profile">Workspace Profile</H2>
      <Paragraph>
        Choose a profile that pre-configures your tool panels and agent skills:
      </Paragraph>
      <Table
        headers={["Profile", "What's Included"]}
        rows={[
          [<strong key="w" className="text-foreground">Web</strong>, "Next.js, Vercel, Railway, Browser, Playwright"],
          [<strong key="s" className="text-foreground">Solana</strong>, "Wallet, Token Launcher, Jupiter, Helius, Session Registry"],
          [<strong key="c" className="text-foreground">Custom</strong>, "Pick exactly which panels and tools to enable"],
        ]}
      />
      <Hint type="info">
        The <strong>Solana</strong> profile enables all Solana-specific panels by default, including
        the Wallet, Token Dashboard, and Jupiter Swap panel. If you&apos;re building on Solana, start here.
      </Hint>

      <H2 id="claude-setup">Claude Setup</H2>
      <Paragraph>
        DAEMON auto-installs the Claude CLI if it&apos;s not detected on your system. You can
        authenticate in two ways:
      </Paragraph>
      <List
        items={[
          <><strong className="text-foreground">OAuth sign-in</strong> opens a browser window to authenticate with your Anthropic account</>,
          <><strong className="text-foreground">API key</strong> lets you paste your Anthropic API key directly in the settings</>,
        ]}
      />
      <Paragraph>
        The Claude CLI powers all agent spawning, Grind Mode, and AI-assisted features throughout
        the IDE.
      </Paragraph>

      <H2 id="integrations">Optional Integrations</H2>
      <Paragraph>
        These connections are fully optional and can be skipped during onboarding. Configure them
        later in <strong className="text-foreground">Settings &gt; Integrations</strong>:
      </Paragraph>
      <List
        items={[
          <><strong className="text-foreground">Gmail</strong> for email notifications and summaries</>,
          <><strong className="text-foreground">Vercel</strong> for one-click project deployment</>,
          <><strong className="text-foreground">Railway</strong> for one-click backend deployment</>,
        ]}
      />

      <H2 id="after-onboarding">After Onboarding</H2>
      <Paragraph>
        Once setup is complete, DAEMON opens to your workspace with the panels and tools configured
        for your selected profile. Access all settings at any time via <code className="px-1.5 py-0.5 rounded-md bg-[#1a1a1a] border border-border text-accent font-mono text-[13px]">Ctrl+,</code> or
        through the Command Drawer (<code className="px-1.5 py-0.5 rounded-md bg-[#1a1a1a] border border-border text-accent font-mono text-[13px]">Ctrl+K</code>).
      </Paragraph>
    </>
  );
}
