# Solana Keychain

Enterprise-grade signing with pluggable backends — AWS KMS, Fireblocks, Turnkey, and more.

{% hint style="info" %}
Solana Keychain integration is in active development. This page documents the architecture and planned implementation. Built on the [Solana Foundation's official keychain SDK](https://github.com/solana-foundation/solana-keychain).
{% endhint %}

## Overview

By default, DAEMON stores wallet keypairs locally using your OS keychain (via Electron's safeStorage). This works great for solo development, but teams and enterprises need more: hardware security modules, cloud KMS, custodial platforms, and audit trails.

Solana Keychain is a unified signing library maintained by the Solana Foundation. It lets DAEMON support **10 signing backends** through a single interface — without changing how the rest of the app works.

## Supported Backends

| Backend | Package | Use Case |
| --- | --- | --- |
| **Local Keypair** | Built-in (default) | Solo development, testing |
| **AWS KMS** | `@solana/keychain-aws-kms` | Cloud-managed signing with IAM policies |
| **GCP KMS** | `@solana/keychain-gcp-kms` | Google Cloud key management |
| **HashiCorp Vault** | `@solana/keychain-vault` | Self-hosted secret management |
| **Turnkey** | `@solana/keychain-turnkey` | Non-custodial wallet infrastructure |
| **Privy** | `@solana/keychain-privy` | Embedded wallet platform |
| **Fireblocks** | `@solana/keychain-fireblocks` | Institutional custody with policies |
| **Coinbase CDP** | `@solana/keychain-cdp` | Coinbase Developer Platform |
| **Dfns** | `@solana/keychain-dfns` | Programmable key management |
| **Crossmint** | `@solana/keychain-crossmint` | Managed wallet transactions |
| **Para** | `@solana/keychain-para` | MPC-based signing |

## How It Works

DAEMON's wallet architecture already isolates all signing in the Electron main process. The renderer (UI) never sees private keys — it only sends signing requests over IPC. This makes keychain integration clean: we only change *where* the signing happens, not *how* the UI works.

### Current Flow (Local Keypair)

```
Renderer: wallet:swap-execute(walletId, ...)
    │
Main Process:
    withKeypair(walletId, async (keypair) => {
        SecureKeyService.getKey()      // OS keychain
          → safeStorage.decryptString()
          → bs58.decode()
          → Keypair.fromSecretKey()
        
        transaction.sign([keypair])
        connection.sendRawTransaction()
        keypair.secretKey.fill(0)       // zero memory
    })
    │
Renderer: ← { ok: true, data: signature }
```

### New Flow (With Keychain)

```
Renderer: wallet:swap-execute(walletId, ...)
    │
Main Process:
    withSigner(walletId, async (signer) => {
        // Resolves backend based on wallet config:
        //   'memory'  → SecureKeyService (current)
        //   'aws-kms' → createAwsKmsSigner(config)
        //   'vault'   → createVaultSigner(config)
        
        signer.signTransactions([transaction])
        connection.sendRawTransaction()
    })
    │
Renderer: ← { ok: true, data: signature }
```

The renderer and all IPC contracts stay exactly the same. The UI doesn't need to know which backend signed the transaction.

## Architecture

### KeychainService (Main Process)

```typescript
import {
  createAwsKmsSigner,
  createVaultSigner,
  type SolanaSigner,
} from "@solana/keychain";

async function createSigner(walletId, config) {
  switch (config.type) {
    case "memory":
      return createMemorySigner(walletId);
    case "aws-kms":
      return createAwsKmsSigner({ ... });
    case "vault":
      return createVaultSigner({ ... });
  }
}
```

### New IPC Handlers

| Handler | Purpose |
| --- | --- |
| `keychain:backends` | List available signing backends |
| `keychain:configure` | Set up a backend for a wallet |
| `keychain:test` | Test backend connectivity |

## What Changes vs What Stays

| Component | Changes? | Details |
| --- | --- | --- |
| SecureKeyService | No | Still used for local keys + backend credentials |
| withKeypair() | **Yes → withSigner()** | Wrapper resolves signer type |
| Signing logic | **Yes** | Uses signer.signTransactions() |
| IPC contract | Minimal | Existing unchanged, 3 new handlers |
| Wallet UI | **Yes** | New backend settings section |
| Transaction history | No | Stores signatures regardless of backend |
| Helius / portfolio | No | Read-only, doesn't involve signing |
| Jupiter swaps | Signing only | Quote flow unchanged |
| PumpFun launches | Signing only | Token creation unchanged |

## Security

- **Keys never in renderer** — All signing stays in the Electron main process
- **Credentials encrypted** — Backend API keys stored via OS keychain encryption
- **Memory cleanup** — Local keypairs zeroed after use, remote backends never expose raw keys
- **Health checks** — `isAvailable()` called before every signing operation
- **Audit trail** — All transactions logged regardless of backend
- **Security audited** — The solana-keychain SDK has undergone independent review by Accretion
