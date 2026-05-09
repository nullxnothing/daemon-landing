# Streamlock Integration

DAEMON integrates Streamlock as a server-side Operator API workflow for locked streams, entitlement ledgers, zero-sum sessions, and settlement helpers.

The first Streamlock workflow is intentionally read-only. Builders can verify configuration and inspect stream discovery before any signing, ledger delta, settlement, or claim path is enabled.

## What the integration adds

Streamlock gives DAEMON a locked-asset operator path. The integration scaffolds a project-local readiness check, adds expected environment placeholders, and keeps the operator key on the server side while the product moves toward guarded session and settlement flows.

DAEMON creates:

* `src/streamlock/operator-readiness.mjs`
* `streamlock:operator-check`
* `.env.example` placeholders for Streamlock configuration

## Environment setup

| Variable | Required | Purpose |
| --- | --- | --- |
| `STREAMLOCK_OPERATOR_KEY` | Yes | Server-side Operator API key. Never expose it to browser code. |
| `STREAMLOCK_CHAIN` | Optional | Chain target. Use `soldev` or devnet for development and `mainnet` for production. |
| `STREAMLOCK_API_BASE_URL` | Optional | Hosted API base URL. Defaults to `https://streamlock.fun` unless overridden. |
| `SOLANA_RPC_URL` | Optional | RPC endpoint used later by write-flow broadcast and confirmation helpers. |
| `STREAMLOCK_TOKEN_MINT` | Optional | Mint used by the read-only starter to list existing locked streams. |

```bash
# Streamlock Operator API key.
# Keep this server-side only. Never expose it to browser code.
STREAMLOCK_OPERATOR_KEY=sk_replace_with_operator_key

# Chain target. Use soldev/devnet while developing and mainnet for production.
STREAMLOCK_CHAIN=soldev

# Hosted Streamlock API base URL. Override only for local or custom deployments.
STREAMLOCK_API_BASE_URL=https://streamlock.fun

# RPC used by future write-flow broadcast and confirmation helpers.
SOLANA_RPC_URL=https://api.devnet.solana.com

# Optional mint for the read-only stream discovery check.
STREAMLOCK_TOKEN_MINT=replace_with_streamlock_token_mint
```

## DAEMON workflow

1. Open a project in DAEMON and select the Streamlock integration.
2. Create the starter file at `src/streamlock/operator-readiness.mjs`.
3. Add the generated `streamlock:operator-check` package script.
4. Move real secrets into a local env file and keep `STREAMLOCK_OPERATOR_KEY` server-side.
5. Run `pnpm run streamlock:operator-check` or the matching package-manager command.

## Read-only starter

The generated starter confirms the Operator API shape, proves the key and chain headers are wired, and optionally lists streams for a mint. It does not create operator sessions or sign transactions.

```http
GET /v1/operator/tokens/:mint/streams
Authorization: Bearer $STREAMLOCK_OPERATOR_KEY
Content-Type: application/json
X-Streamlock-Chain: $STREAMLOCK_CHAIN
```

The starter:

* Masks the operator key in terminal output.
* Skips stream discovery if `STREAMLOCK_TOKEN_MINT` is missing or still a placeholder.
* Prints response chain, request id, stream count, and the first stream id when a mint is configured.
* Exits after read-only verification.
* Creates no session, submits no delta, signs no transaction, and settles no claim.

## Safety model

Streamlock is treated as a high-impact primitive because locked assets, ledgers, operator sessions, and settlement helpers can affect real user funds.

DAEMON keeps the surface staged:

* Operator keys are server-side secrets and should not be shipped to browser bundles.
* The default DAEMON starter is read-only and safe to run before signing flows exist.
* Session, delta, settle, and claim paths remain behind explicit wallet or operator-signing review.
* Write flows should require clear user acknowledgement, fresh confirmation, and transaction inspection.
* Hosted token launch flow opens Streamlock externally while DAEMON keeps wallet, token, and post-launch tools nearby.

## Launch center

DAEMON currently uses Streamlock as the primary external launch path for hosted token launches. Builders can open `https://app.streamlock.fun/` from DAEMON, complete the launch in Streamlock, then return to DAEMON for wallet context, token feeds, launch history, and post-launch workflows.

## Current status

| Capability | Status |
| --- | --- |
| Integration card | Implemented in the Integration Command Center. |
| Config check | Implemented. DAEMON checks for `STREAMLOCK_OPERATOR_KEY` in project env files. |
| Starter scaffolding | Implemented. DAEMON creates env placeholders, a package script, and the readiness file. |
| Read-only operator check | Implemented. The starter verifies API configuration and optional stream discovery. |
| Hosted launch link | Implemented. DAEMON opens the Streamlock hosted app for the current launch flow. |
| Operator writes and settlement previews | Planned behind explicit signing and confirmation review. |
