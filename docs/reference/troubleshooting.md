# Troubleshooting

## Editor crash: "Press Ctrl+K to access tools"

**Solution:** Click the **Retry** button in the error boundary. If the editor doesn't recover, close and reopen the tab.

DAEMON wraps the Monaco editor in an ErrorBoundary that catches initialization failures. This usually happens on first launch or after a system sleep. A simple retry resolves it in most cases.

## Claude not connecting

**Solution:** Open **Settings > Integrations** and verify the Claude CLI is installed and authenticated.

Steps to diagnose:

1. Open the terminal and run `claude --version` to confirm the CLI is installed
2. If not installed, DAEMON can auto-install it — go to **Settings > Integrations > Claude**
3. If installed but not connecting, re-run the OAuth sign-in (sessions can expire)
4. If using an API key, verify it's valid and has available credits

## Terminal paste not working

**Solution:** Right-click to paste in the terminal.

The xterm.js terminal does not show a context menu — right-click triggers paste directly. This is standard xterm.js behavior. `Ctrl+V` may not work in all terminal contexts because the terminal captures keyboard input for the running process.

## Missing tools or panels

**Solution:** Check your **Workspace Profile** in **Settings > Display**.

Some panels are only enabled for specific profiles:

- **Wallet** — Solana profile only (by default)
- **Token Dashboard** — Solana profile only
- **Jupiter Swap** — Solana profile only
- **Browser** — Web and Custom profiles

Switch to the **Custom** profile to enable everything manually.

## Native module build errors

If you see errors related to `better-sqlite3` or `node-pty` after installation:

```bash
pnpm run rebuild
```

These are C++ native modules that need to be compiled for your system. The `rebuild` command recompiles them for your current Node.js version and OS.

## Agents not spawning

If agents fail to spawn or Grind Mode doesn't start:

1. Verify Claude CLI is authenticated (see "Claude not connecting" above)
2. Check that Node.js 22+ is installed (`node --version`)
3. Ensure you have sufficient API credits
4. Check the terminal output for error messages

## High memory usage

DAEMON runs multiple processes (Electron main, renderer, PTY sessions, agent processes). If memory usage is high:

- Close unused terminal tabs
- End idle agent sessions
- Reduce the number of Grind Mode panels for lighter tasks
- Close unused editor tabs
