# Solana Development

Wallets, RPC, MCPs, token launches, transaction debugging, readiness checks, and protocol integrations live in one Solana workspace.

## Solana Tool Map

DAEMON exposes Solana as a set of focused tools instead of one oversized panel. Use this map when you need to find the right surface for a project task.

| Tool | Where | What it covers |
| --- | --- | --- |
| Solana Workspace | Command menu -> Solana | Readiness, providers, MCPs, validator controls, protocol packs, and runtime status. |
| Project Readiness | Command menu -> Project Readiness | Project, wallet, RPC, MCP, and first-action checklist for the active repository. |
| Wallet | Sidebar or command menu | Phantom-first wallet route, dev wallets, signer state, balances, and transaction history. |
| Token Launch | Command menu -> Token Launch | Unified Pump.fun, Raydium, and Meteora launch workflow with shared wallet and RPC paths. |
| Integrations | Command menu -> Integrations | Guided setup for Solana SDKs, infra providers, wallets, protocol SDKs, agents, and testing tools. |
| Block Scanner | Command menu -> Block Scanner | Solana explorer powered by Orb for block, account, and transaction inspection. |
| Replay | Command menu -> Replay | Replay any Solana transaction with on-chain context and AI handoff. |
| Dashboard | Sidebar or command menu | Market data, token watchlist, prices, volume, holders, and sparkline monitoring. |
| Activity | Command menu -> Activity | Flight recorder for Solana development sessions, commands, tool calls, and project events. |
| Agent Station | Command menu -> Agent Station | Scaffold and run Solana AI agents powered by SendAI Solana Agent Kit. |

## Solana Workspace

The Solana Workspace groups the most common project decisions into five views. It is the place to check whether DAEMON sees the project, which transport is active, and which execution paths are ready.

| View | Use it for |
| --- | --- |
| Start | Project readiness, active runtime, and the next safe Solana move. |
| Connect | RPC providers, MCP servers, wallet routes, and connected service health. |
| Transact | Quotes, execution coverage, wallet sends, swap paths, and agent transaction capabilities. |
| Launch | Protocol launch flows, Pump.fun, Raydium, Meteora, and launch-oriented adapters. |
| Debug | Solana CLI, Anchor, validator status, AVM, Surfpool, LiteSVM, and environment checks. |

## Project Readiness

Project Readiness turns the active repository into a concrete checklist. It is useful when a Solana app is present but the wallet, RPC, MCP, or first agent action is not fully wired.

- **Quick Setup** - Create a dev wallet, assign a project wallet, enable Solana MCPs, and write RPC_URL.
- **Readiness Checks** - Project open, Solana project detected, wallet route, signer ready, provider path, MCP tools, and first agent.
- **First Safe Actions** - Wire SendAI Agent Kit, Helius, Phantom, Jupiter, Metaplex, and Light Protocol before mainnet flows.

## Wallet And RPC Runtime

The wallet route is shared by launch, swap, replay, dashboard, and agent actions. DAEMON tracks whether the project has a usable signer, assigned wallet, and provider path before it sends transactions.

- Use Phantom-first flows for browser wallet UX and Wallet Standard compatibility for broader wallet support.
- Prefer Helius, QuickNode, or a configured RPC_URL for project execution instead of implicit public endpoints.
- Keep signer readiness separate from watch-only wallet reads so DAEMON does not guess which wallet should sign.
- Check SOL, SPL holdings, and recent transaction history from the Wallet and Dashboard tools before launch or swap actions.

## MCPs And Agent Skills

The Solana Workspace also tracks MCP servers and installed skills so agents can read chain data, scaffold code, and act through the same wallet and RPC assumptions as the UI.

| Category | Tools |
| --- | --- |
| MCPs | Helius, Solana MCP, Phantom Docs, PayAI, and x402. |
| Core Skills | solana-architect, solana-wallet-tx-pipeline, solana-kit. |
| Infra Skills | helius, quicknode, pyth, switchboard, light-protocol. |
| Trading Skills | integrating-jupiter, raydium, meteora, drift, orca. |
| Protocol Skills | kamino, sanctum, metaplex, pumpfun, squads. |
| Security Skills | helios-solana-forensics and vulnhunter. |

## Transactions And Swaps

Jupiter swaps, wallet sends, recovery flows, and launch transactions run through the shared execution pipeline. DAEMON keeps these paths tied to the active wallet, RPC provider, and session history.

Before mainnet writes, verify signer state, destination accounts, ATA creation, slippage, blockhash freshness, priority fees, compute limits, and transaction size.

## Token Launch And Protocols

Token Launch uses the same runtime as the rest of the Solana tools. Pump.fun, Raydium, and Meteora are native launch surfaces, while the integrations catalog guides setup for broader protocol work.

- **Native Launch Adapters** - Pump.fun, Raydium, and Meteora launch workflows use the shared wallet, RPC, and session model.
- **Protocol Packs** - Jupiter, Metaplex, Raydium, Meteora, Drift, and Kamino are tracked as launch or integration packs.
- **Guided Integrations** - Orca, Sanctum, Pyth, Switchboard, Squads, Light Protocol, and x402/PayAI live in the integration catalog.

### Import Tokens

Import an existing token mint to add it to the dashboard, session history, and watchlist.

- Paste a mint address and resolve token metadata.
- Add the token to the local dashboard.
- Track price, volume, market cap, holders, and short-window activity when provider data is available.

## Debugging And Testing

The Debug view keeps local Solana tooling visible so project setup issues are caught before an agent or launch flow reaches a wallet prompt.

| Tool | Why it matters |
| --- | --- |
| Solana CLI | Checks local chain tooling and cluster access. |
| Anchor | Detects Anchor projects and validates program build/test readiness. |
| AVM | Manages Anchor versions for project compatibility. |
| Surfpool | Mainnet-forked development and richer local testing flows. |
| solana-test-validator | Baseline local validator for program and client tests. |
| LiteSVM and Mollusk | Fast program-level testing paths for transaction and instruction behavior. |

## Block Scanner And Replay

Block Scanner and Replay are the investigation tools. Use them to inspect accounts, review signatures, replay transactions with context, and hand the result to an agent when debugging needs code changes.

## Dashboard

The Dashboard gives fast market context for tokens connected to the project.

| Metric | Meaning |
| --- | --- |
| Price | Latest available token price. |
| Holders | Holder count when available from the provider. |
| Market Cap | Computed or provider-reported market cap. |
| Sparkline | Small trend chart for fast scanning. |
| Volume | Short-window trading activity. |

## Activity And Session Registry

- **What's Recorded** - Launch attempts, token imports, swap signatures, replay notes, agent actions, and dashboard additions.
- **Why It Matters** - The registry lets you return to project context without rebuilding state from memory.
