# Architecture

DAEMON is a standalone Electron application, not a fork of VS Code, not a wrapper around an existing editor. Every layer is built intentionally for Solana development.

## Core Principles

### 1. Process Isolation

All database and filesystem access runs in the main process. The renderer never touches SQLite directly, everything flows through typed IPC handlers. This ensures stability, security, and clean separation of concerns.

### 2. Typed IPC Contract

Every IPC handler returns `{ ok, data }` or `{ ok, error }`. No raw throws across the Electron bridge. There are 20 IPC modules covering agents, wallet, git, terminals, and more.

### 3. Offline First

The Monaco editor runs through a custom protocol handler registered in Electron's main process. Zero network requests for core editing. Your code stays on your machine.

### 4. Native Modules

`better-sqlite3` and `node-pty` are unpacked from ASAR for production builds. Real PTY sessions, real database, not browser polyfills pretending to be native.

## Tech Stack

| Layer | Technology | Detail |
| --- | --- | --- |
| Shell | Electron 33 | Chromium + Node in one process |
| Build | Vite | Sub-second HMR |
| UI | React 18 + TypeScript | Strict types, zero `any` |
| Editor | Monaco Editor | Custom protocol, fully offline |
| Terminal | node-pty + xterm.js | Real PTY, not emulated |
| State | Zustand | One store per domain |
| Database | better-sqlite3 | WAL mode, main process only |
| Git | simple-git | Branch, stash, tag, push |
| Package | electron-builder | .exe + .dmg, auto-update |

## Project Structure

```
electron/
  main/       App entry, windows, protocols
  ipc/        One handler per domain (20 modules)
  services/   Business logic layer
  db/         SQLite schema, migrations, WAL
  shared/     Types shared between main and renderer

src/
  panels/     One directory per UI panel (21 panels)
  store/      Zustand state management
  plugins/    Plugin registry + lazy loading
  components/ Shared UI primitives

styles/       Global CSS tokens and base styles
test/         Vitest test suites
```

## IPC Architecture

The IPC layer is the bridge between the renderer (UI) and main process (backend). Each domain has its own handler file:

```
electron/ipc/
  agents.ts       Agent spawning and management
  wallet.ts       Wallet operations and Helius API
  git.ts          Git operations via simple-git
  terminal.ts     PTY session management
  editor.ts       File operations and Monaco protocol
  deploy.ts       Vercel and Railway deployment
  settings.ts     User preferences and configuration
  tokens.ts       Token tracking and PumpFun integration
  ...             (20 modules total)
```

Every handler follows the same pattern:

```typescript
// All handlers return a consistent shape
type IpcResponse<T> = 
  | { ok: true; data: T }
  | { ok: false; error: string };
```

## State Management

DAEMON uses Zustand with one store per domain:

- `useEditorStore`, Open files, active tab, editor state
- `useWalletStore`, Wallet connection, balances, tokens
- `useAgentStore`, Active agents, sessions, Grind Mode state
- `useGitStore`, Branch, status, diff, stash
- `useTerminalStore`, Terminal sessions, splits, history

## Database

DAEMON uses better-sqlite3 in WAL (Write-Ahead Logging) mode for fast concurrent reads. The database runs exclusively in the main process and stores:

- User settings and preferences
- Agent session history
- Token tracking data
- Project configurations
- MCP server registry
