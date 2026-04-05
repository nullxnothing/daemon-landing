# Installation

## Download

| Platform | Link |
| --- | --- |
| Windows (.exe) | [Download DAEMON for Windows](https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-1.0.0-setup.exe) |
| macOS (.dmg) | [Install for Mac](https://github.com/nullxnothing/daemon#mac-install) |

## Prerequisites

Before launching DAEMON, make sure you have the following installed:

- **Node.js 22+** — Required for agent spawning and terminal sessions. Download from [nodejs.org](https://nodejs.org/).
- **pnpm** (recommended) — Faster installs, used internally by DAEMON. Install with `npm install -g pnpm`.

## First Launch

On first run, DAEMON shows a boot loader sequence followed by the onboarding wizard. This walks you through:

1. **Workspace configuration** — Choose your development profile
2. **Claude setup** — Connect to Claude for AI agent support
3. **Optional integrations** — Gmail, Vercel, Railway, and more

The entire process takes about 2 minutes.

## System Requirements

| Requirement | Minimum |
| --- | --- |
| OS | Windows 10+ or macOS 12+ |
| Node.js | v22 or higher |
| RAM | 4 GB (8 GB recommended) |
| Disk | ~500 MB for installation |

## Updating

DAEMON includes auto-update support via electron-builder. When a new version is available, you'll see a notification in the status bar. Click to download and install the update — no manual steps required.
