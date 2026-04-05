# Deployment

DAEMON supports one-click deployment to Vercel and Railway directly from the editor. No browser, no CLI commands, no context switching.

## Vercel

Deploy frontend projects to Vercel with a single click:

1. **Connect once** — Link your Vercel account in **Settings > Integrations**
2. **Deploy** — Click the deploy button in the Command Drawer or use the deployment panel
3. **Monitor** — View deployment status and logs directly in DAEMON

DAEMON automatically detects your framework (Next.js, React, etc.) and configures the build settings.

### Supported Frameworks

- Next.js
- React (Create React App, Vite)
- Static sites
- Any framework supported by Vercel

## Railway

Deploy backend services and databases to Railway:

1. **Connect once** — Link your Railway account in **Settings > Integrations**
2. **Deploy** — Select your project and click deploy
3. **Monitor** — View logs and service status in DAEMON

### Use Cases

- Node.js API servers
- Database provisioning
- Background workers
- Full-stack applications (Vercel frontend + Railway backend)

## Workflow

A typical deployment workflow in DAEMON:

1. Write and test your code in the Monaco editor
2. Run tests with an AI agent or the terminal
3. Commit changes via the visual git panel
4. Click deploy — your app is live

The entire cycle from code to production happens inside one app.

## Configuration

Deployment settings are stored per-project and can be configured in **Settings > Integrations**. Both Vercel and Railway connections persist across sessions and projects.
