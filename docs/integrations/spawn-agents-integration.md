# Spawn Agents Integration

DAEMON integrates [SpawnAgents](https://spawnagents.fun) — a Solana-native platform for spawning autonomous on-chain trading agents with custom DNA. Follow [@spawnagents](https://x.com/spawnagents) for updates on new agent modes and protocol changes.

DAEMON connects directly to the SpawnAgents v1 API. No API key required — all actions are signed with your DAEMON wallet keypair.

## What the integration adds

**Spawn autonomous trading agents** — Configure an agent's DNA — capital allocation, risk tolerance, trade aggression, and market mode — then deploy it on-chain with a SOL deposit. Agents operate independently once funded; no desktop session required to keep them running.

**Full lifecycle management** — Monitor active agents from inside DAEMON: view open positions, trade history, live events, and on-chain status. Withdraw funds or kill an agent at any time without leaving the workspace.

**Live event feed** — The panel tails agent events in real time, giving you a continuous view of what each agent is doing on-chain.

SpawnAgents supports two market modes:

- **Meme mode** — agent trades Solana memecoins based on its DNA parameters
- **Prediction market mode** — agent takes positions in prediction markets. Open to all wallets — no allowlist.

## Authentication

No API key. SpawnAgents uses wallet-based auth. Write actions (spawn, withdraw, kill) are signed with your DAEMON wallet's Ed25519 keypair — DAEMON handles signing automatically in the main process. The renderer never touches the private key.

**Requirement:** a DAEMON wallet with a keypair loaded. Set one as your default wallet in the Wallet panel before using Spawn Agents.

## Agent DNA

Every agent is configured with a DNA profile before spawning. DNA parameters control how the agent behaves on-chain:

| Parameter | Description |
| --- | --- |
| SOL amount | Capital deposited to fund the agent |
| Market mode | `meme` or `prediction_market` |
| Aggression | How aggressively the agent enters positions |
| Risk tolerance | Maximum drawdown the agent will accept |

DNA is set at spawn time and cannot be changed after the agent is live. To change strategy, kill the agent and spawn a new one.

## Child agents

An active agent can spawn child agents from within its own execution context. Children inherit a subset of the parent's DNA but can be configured with different parameters — useful for running parallel strategies under a single parent without managing each agent independently.

Child agents are tracked under their parent in the Spawn Agents panel. Each child has its own status, positions, and trade history. Withdrawing or killing the parent does not automatically affect children — each must be managed separately.

## Spawning an agent

1. Open Spawn Agents from the DAEMON command drawer.
2. Configure the agent DNA — set SOL amount, aggression, risk tolerance, and market mode.
3. Review the deposit address and send the required SOL.
4. DAEMON polls spawn status until the agent goes live (`pending → active`).

The deposit step is manual — DAEMON shows the address and expected amount, then polls until it detects the on-chain confirmation.

## Monitoring

The Spawn Agents panel shows all agents owned by your wallet:

| Field | Description |
| --- | --- |
| Agent ID | On-chain identifier |
| Status | `pending` · `active` · `dead` |
| Mode | `meme` or `prediction_market` |
| Positions | Open meme or PM positions |
| Trades | Full trade history |
| Events | Live event feed (polled every 5s) |

Switch between the Positions and Trades tabs in an agent's detail view for a full breakdown of its on-chain activity.

## Agent actions

**Withdraw** — pulls remaining funds from an active agent back to your wallet. Requires wallet signature. The agent continues running after a partial withdraw.

**Kill** — terminates the agent and triggers a full withdrawal. Irreversible. DAEMON shows a confirmation prompt before signing — once confirmed, the signed kill request is sent and the agent is shut down on-chain.

## Safety model

- Private keys never leave DAEMON's main process
- All write actions require an explicit user trigger — nothing auto-submits
- Kill requires a confirmation step before the signed request is sent
- The panel shows a no-wallet fallback if no keypair is configured

## Links

- [SpawnAgents website](https://spawnagents.fun)
- [@spawnagents on X](https://x.com/spawnagents)
