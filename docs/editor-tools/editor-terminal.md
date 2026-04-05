# Monaco Editor & Terminal

DAEMON includes a full-featured Monaco editor and real PTY terminal — both running natively, not in a browser sandbox.

## Monaco Editor

The editor is powered by the same Monaco engine used in VS Code, but loaded via a custom Electron protocol handler for fully offline operation. Zero CDN requests, zero network dependencies for core editing.

### Features

- **Multi-tab editing** — Open multiple files in tabs with drag-and-drop reordering
- **Breadcrumb navigation** — Click through the file path to navigate your project
- **Syntax highlighting** — Support for all major languages (TypeScript, Rust, Python, JSON, TOML, and more)
- **Multi-cursor editing** — `Ctrl+D` to select next occurrence, `Ctrl+Shift+L` to select all occurrences
- **Minimap** — Code overview on the right side of the editor
- **Find and replace** — `Ctrl+F` for in-file search, `Ctrl+H` for replace
- **Code folding** — Collapse and expand code blocks
- **Auto-indent and formatting** — Consistent code formatting

### Offline-First

The Monaco editor runs through a custom protocol handler registered in Electron's main process. This means:

- No network requests for the editor itself
- No CDN dependencies
- Your code never leaves your machine
- Works completely offline

## Terminal

DAEMON's terminal is a real PTY implementation using node-pty and xterm.js — not a browser-based emulator.

### Features

- **Real PTY sessions** — Full shell access with proper signal handling
- **Multiple tabs** — Open as many terminal sessions as you need
- **Split panes** — Divide terminals horizontally or vertically
- **Per-project sessions** — Each project gets its own terminal context
- **Command history** — `Ctrl+R` for reverse search through history
- **Tab completion** — Standard shell tab completion
- **Search** — `Ctrl+Shift+F` to search terminal output
- **Copy/paste** — Select to copy, right-click to paste

### Why Real PTY Matters

Unlike browser-based terminal emulators, DAEMON's terminal:

- Supports interactive programs (vim, htop, etc.)
- Handles ANSI escape codes correctly
- Provides proper signal handling (Ctrl+C, Ctrl+Z)
- Runs native shell processes with full environment access
- Supports node-pty session persistence across tab switches
