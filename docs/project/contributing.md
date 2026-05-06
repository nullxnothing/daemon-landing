# Contributing

Thanks for your interest in contributing to DAEMON. DAEMON is an open-source Electron IDE built for Solana development.

## Getting Started

```bash
git clone https://github.com/nullxnothing/daemon.git
cd daemon
pnpm install
pnpm run dev
```

In a second terminal, run the type checker in watch mode:

```bash
pnpm run typecheck:watch
```

## Requirements

| Requirement | Version |
| --- | --- |
| Node.js | 22+ |
| pnpm | 9+ |
| OS | Windows or macOS (Linux experimental) |

## Development Commands

| Command | Description |
| --- | --- |
| `pnpm run dev` | Start the dev server with hot reload |
| `pnpm run typecheck` | Run TypeScript checks |
| `pnpm run test` | Run the test suite |
| `pnpm run build` | Production build |
| `pnpm run package` | Create distributable (.exe / .dmg) |
| `pnpm run rebuild` | Rebuild native modules |

## Native Modules

`better-sqlite3` and `node-pty` are C++ native modules. They're rebuilt automatically via `postinstall`. If you hit issues after `pnpm install`:

```bash
pnpm run rebuild
```

## Architecture

```
electron/          Main process, IPC handlers, services, database
  ipc/             One handler file per domain
  services/        Business logic (never imported from renderer)
  db/              SQLite schema + migrations
  shared/          Types shared between main and renderer

src/               Renderer, React 18 + TypeScript
  panels/          One directory per panel
  store/           Zustand stores
  components/      Shared UI components

styles/            Global CSS tokens and base styles
test/              Vitest test suites
```

## Rules

- All DB access stays in the main process, renderer uses IPC only
- All IPC handlers use `IpcHandlerFactory` and return `{ ok, data/error }`
- CSS Modules only, no Tailwind, follow existing token system in `styles/tokens.css`
- No emoji in UI chrome, status via colored dots only
- Test with `pnpm run package` before submitting PRs that touch native modules or Electron main

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use |
| --- | --- |
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code change that neither fixes a bug nor adds a feature |
| `docs:` | Documentation only |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance tasks |

## Pull Requests

- Keep PRs focused, one feature or fix per PR
- Include screenshots for UI changes
- Ensure `pnpm run typecheck` and `pnpm run test` pass
- Fill out the PR template
