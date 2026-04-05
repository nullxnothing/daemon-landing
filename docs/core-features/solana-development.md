# Solana Development

DAEMON is built for Solana from the ground up. Every Solana tool is native to the IDE — no browser extensions, no context switching, no third-party plugins.

## Connect Wallet

Import an existing keypair (base58 private key) or generate a new wallet directly inside DAEMON. Your wallet is stored locally and encrypted via the OS keychain.

Once connected, the wallet panel shows:

- SOL balance (live via Helius)
- All SPL token holdings with USD values
- Transaction history

## Launch Tokens

Create tokens on PumpFun with DAEMON's built-in Launch Wizard:

1. Open the Token Launcher panel
2. Set token **name**, **symbol**, and **image**
3. Add socials (Twitter, Telegram, website)
4. Click **Launch** — DAEMON handles the bonding curve interaction

The entire process is one click from inside the IDE. No need to visit PumpFun in a browser.

## Import Tokens

Add existing tokens to your dashboard in two ways:

- **By mint address** — Paste any SPL token's mint address
- **Auto-detect** — Scan your connected wallet to automatically import all holdings

## Dashboard

The token dashboard provides real-time data for every tracked token:

| Metric | Description |
| --- | --- |
| **Price** | Live price via Helius/Jupiter |
| **Holders** | Current holder count |
| **Market Cap** | Fully diluted market cap |
| **Sparkline** | 24h price chart |
| **Volume** | Trading volume |

The dashboard updates in real-time and is accessible from the center tab bar or the right panel.

## Jupiter Swaps

Swap tokens directly from the wallet panel using Jupiter aggregation:

- Best route finding across all Solana DEXs
- Slippage protection
- Transaction preview before signing
- No need to leave the IDE

## Session Registry

The Session Registry is an on-chain proof-of-development feature unique to DAEMON. It records AI agent sessions to the Solana blockchain for transparency:

- **What's recorded** — Session start/end, agent type, task summary
- **Why** — Provides verifiable proof that AI-assisted development occurred
- **Where** — Stored on Solana mainnet/devnet (configurable)

This is optional and can be enabled per-project in **Settings > Solana > Session Registry**.
