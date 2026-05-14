# KausaLayer Integration

DAEMON integrates KausaLayer as a Solana privacy infrastructure path for stealth pockets, private SOL routing, dynamic maze routing, and agent-accessible MCP tooling.

> KausaLayer belongs in DAEMON as a guarded privacy integration: setup, readiness, fee/status checks, and MCP access can be supported without silently executing private routes, sweeps, or swaps.

## What the integration adds

KausaLayer gives DAEMON builders access to privacy-oriented Solana workflows that can sit next to wallet, RPC, agent, and integration tooling. Its MCP server is built around stealth pockets, dynamic maze routing, route and sweep status, saved wallet slots, route history, and optional swap operations.

- **Privacy infrastructure** - KausaLayer exposes stealth pocket, maze route, sweep, swap, saved wallet, route history, usage, and tier-check primitives for Solana applications.
- **MCP-first agent access** - DAEMON can guide projects toward the KausaLayer MCP server while keeping API keys in environment configuration instead of renderer code.

## Environment setup

The KausaLayer MCP package expects an API key. Keep this value in local or server environment files and treat it as infrastructure configuration, not as a browser variable.

| Variable | Required | Purpose |
| --- | --- | --- |
| `KAUSALAYER_API_KEY` | Yes | API key used by the KausaLayer MCP server and project-local privacy workflows. |
| `SOLANA_RPC_URL` | Optional | RPC endpoint used by Solana-aware route, wallet, or transaction helpers. |

```env
# KausaLayer API key.
# Keep this server-side/local only. Do not expose it to browser bundles.
KAUSALAYER_API_KEY=replace_with_kausalayer_api_key

# Optional Solana RPC endpoint used by privacy-aware workflows.
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## MCP server

KausaLayer publishes an MCP package for AI-agent access. DAEMON should treat this as an optional integration that becomes active only after the builder enables it and provides the required environment configuration.

| Surface | Location | Use |
| --- | --- | --- |
| Docs | https://docs.kausalayer.com | Protocol and product reference. |
| API key page | https://www.kausalayer.com/mcp | Connect a wallet and generate a KausaLayer MCP API key. |
| GitHub | https://github.com/fasqua/kausalayer-mcp | MCP server source and setup reference. |
| npm | https://www.npmjs.com/package/%40kausalayer%2Fmcp | Installable MCP package. |

```bash
npx -y @kausalayer/mcp

# Required environment
KAUSALAYER_API_KEY=replace_with_kausalayer_api_key
```

## Capabilities

- Create and list stealth pockets.
- Route SOL privately through dynamic maze routing.
- Check route, sweep, and P2P transfer status.
- Manage saved destination wallet slots and contacts.
- Review route history, usage stats, pocket transactions, and tier information.
- Request swap quotes and execute supported swaps through the MCP tool surface when explicitly approved.

## DAEMON workflow

In DAEMON, KausaLayer should appear as an optional Integration Command Center card. Enabling it should only load KausaLayer-specific setup, MCP status, package checks, and project guidance after the user opens or enables the integration.

- Open Integrations and enable KausaLayer when a project needs privacy infrastructure.
- Add `KAUSALAYER_API_KEY` to the project environment.
- Confirm the KausaLayer MCP entry is available before agent workflows use it.
- Use readiness, fee estimates, and status checks first; keep private routes, sweeps, swaps, and exports guarded.

## Safety model

Privacy tooling can affect real funds and sensitive wallet flows, so DAEMON should keep KausaLayer actions behind the same command-center guardrails as trading, launch, and wallet integrations.

- No automatic private route, sweep, swap, P2P transfer, or private-key export.
- API keys stay in local or server-side environment configuration.
- Renderer code should request capability checks through DAEMON services or MCP status, not hold secrets.
- Fund-moving actions require clear user acknowledgement and wallet confirmation.
- Partner branding can use KausaLayer colors, but cards should remain inside DAEMON's panel, spacing, and interaction system.

## Current status

| Capability | Status |
| --- | --- |
| Integration card | Documented for DAEMON's Integration Command Center catalog. |
| MCP setup guidance | Documented with KausaLayer docs, GitHub, API key, and npm references. |
| Environment readiness | Documented through `KAUSALAYER_API_KEY` and optional `SOLANA_RPC_URL`. |
| Automatic writes | Not enabled. Private routes, sweeps, swaps, P2P transfers, and private-key exports should remain guarded. |
