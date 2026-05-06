# UI Overview

DAEMON's interface is organized into five main areas: the left sidebar, center editor, right panel, bottom terminal, and status bar.

## Layout

```
┌──────┬────────────────────────────┬──────────┐
│      │  index.ts  browser  dash   │  Claude  │
│  F   │                            │  status  │
│  S   │  ┌──────────────────────┐  │  MCPs    │
│  G   │  │  Monaco Editor       │  │  model   │
│  T   │  │                      │  │          │
│  W   │  └──────────────────────┘  │          │
│      ├────────────────────────────┤          │
│      │  ~ pnpm run dev            │          │
│      │  terminal                  │          │
└──────┴────────────────────────────┴──────────┘
│  main ─ git branch ─ ticker ─ wallet balance │
└──────────────────────────────────────────────┘
```

## Left Sidebar

The sidebar provides icon-based navigation for all major panels:

| Icon | Panel | Description |
| --- | --- | --- |
| **F** | Files | File explorer and project tree |
| **S** | Search | Full-text search across your project |
| **G** | Git | Visual git interface (branch, commit, push) |
| **T** | Terminal | Terminal session manager |
| **W** | Wallet | Solana wallet and token dashboard |

## Center Area

The center area contains the Monaco editor with tabbed navigation. Two tabs are permanently pinned:

- **Browser**, Built-in browser with security sandbox for previewing your app
- **Dashboard**, Token dashboard with real-time price, holders, and charts

All other tabs are your open files, editable in the full Monaco editor with syntax highlighting, breadcrumbs, and multi-cursor support.

## Right Panel

The right panel has three tabs:

- **Claude**, Shows agent connection status, active MCP servers, current model, and available skills
- **Dashboard**, Quick access to token metrics
- **Sessions**, View and manage active agent sessions

## Bottom Terminal

A full xterm.js terminal powered by real PTY sessions via node-pty. Features include:

- Multiple terminal tabs
- Split panes (horizontal and vertical)
- Per-project terminal sessions
- Command history with `Ctrl+R`
- Tab completion
- Terminal search with `Ctrl+Shift+F`

## Status Bar

Runs along the bottom of the window and displays:

- Current git branch
- Market ticker (live token prices)
- Wallet balance (SOL + USD value)
