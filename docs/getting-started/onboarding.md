# Onboarding

When you first launch DAEMON, the onboarding wizard guides you through three steps: workspace profile, Claude setup, and optional integrations.

## Workspace Profile

Choose a profile that pre-configures your tool panels and agent skills:

| Profile | What's Included |
| --- | --- |
| **Web** | Next.js, Vercel, Railway, Browser, Playwright |
| **Solana** | Wallet, Token Launcher, Jupiter, Helius, Session Registry |
| **Custom** | Pick exactly which panels and tools to enable |

You can change your workspace profile at any time in **Settings > Display**.

{% hint style="info" %}
The **Solana** profile enables all Solana-specific panels by default, including the Wallet, Token Dashboard, and Jupiter Swap panel. If you're building on Solana, start here.
{% endhint %}

## Claude Setup

DAEMON auto-installs the Claude CLI if it's not detected on your system. You can authenticate in two ways:

1. **OAuth sign-in**, Opens a browser window to authenticate with your Anthropic account
2. **API key**, Paste your Anthropic API key directly in the settings

The Claude CLI powers all agent spawning, Grind Mode, and AI-assisted features throughout the IDE.

## Optional Integrations

These connections are fully optional and can be skipped during onboarding. Configure them later in **Settings > Integrations**:

- **Gmail**, Email notifications and summaries
- **Vercel**, One-click project deployment
- **Railway**, One-click backend deployment

## After Onboarding

Once setup is complete, DAEMON opens to your workspace with the panels and tools configured for your selected profile. You can access all settings and change your configuration at any time via `Ctrl+,` or through the Command Drawer (`Ctrl+K`).
