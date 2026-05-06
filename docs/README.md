# Introduction

## What is DAEMON?

DAEMON is **the operator console for Solana developers**, a standalone desktop application that bundles a full-featured code editor, AI agents, built-in wallet, token launcher, swaps, and one-click deploys into a single workspace. The headline primitive, **Shipline**, takes you from prompt to mainnet in 60 seconds.

DAEMON is not a VS Code fork. It is not a plugin or extension. It is a purpose-built Electron application with its own editor, terminal, state management, and database layer, designed from day one for the Solana ecosystem.

## Why DAEMON?

Building on Solana today means juggling a dozen tools: a code editor, a separate terminal, Phantom wallet in the browser, PumpFun in another tab, Jupiter in another, a deploy dashboard somewhere else, and AI assistants in yet another window.

DAEMON consolidates all of that into one console:

- **Ship with Shipline**, prompt → Anchor program → mainnet in 60 seconds, with inline CU simulation and Jito-bundle deploy
- **Write code** in a fully offline Monaco editor with syntax highlighting, multi-tab, and breadcrumbs
- **Run AI agents** that work on your codebase in parallel, debug, review, test, and ship simultaneously
- **Manage your wallet** with live portfolio tracking via Helius, SPL token balances, and real-time prices
- **Launch tokens** on PumpFun with a one-click wizard
- **Swap tokens** via Jupiter aggregation directly from the wallet panel
- **Deploy** to Vercel or Railway without leaving the editor
- **Track everything** with a built-in dashboard showing price, holders, market cap, and sparkline charts

## Key Differentiators

| Feature | DAEMON | VS Code + Extensions |
| --- | --- | --- |
| Solana wallet | Built-in, native | Requires browser extension |
| Token launches | One-click PumpFun wizard | Not available |
| AI agents | Parallel execution with Grind Mode | Single Copilot chat |
| Terminal | Real PTY via node-pty | Integrated terminal |
| Deploys | One-click Vercel/Railway | Requires CLI or dashboard |
| Offline editor | Custom protocol, zero CDN | Depends on extensions |

## Quick Links

- [Installation](getting-started/installation.md), Download and set up DAEMON
- [AI Agents](core-features/ai-agents.md), Spawn and manage Claude agents
- [Grind Mode](core-features/grind-mode.md), Run multiple agents in parallel
- [Solana Development](core-features/solana-development.md), Wallet, tokens, swaps, and more
- [Keyboard Shortcuts](reference/keyboard-shortcuts.md), Full shortcut reference

## Open Source

DAEMON is free and open source under the MIT License.

- **GitHub:** [github.com/nullxnothing/daemon](https://github.com/nullxnothing/daemon)
- **Telegram:** [t.me/daemonide](https://t.me/daemonide)
- **Built by:** [nullxnothing](https://github.com/nullxnothing)
