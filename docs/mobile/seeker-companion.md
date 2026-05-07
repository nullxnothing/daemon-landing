# Daemon Seeker

Daemon Seeker is the mobile command center for the desktop IDE. Pair your phone, approve agent actions before they touch files, deploys, or wallets, and sign Solana transactions through Mobile Wallet Adapter.

Daemon Seeker is built for Solana Mobile (Seeker / Saga) and any Android device with a Mobile Wallet Adapter compatible wallet installed. It is distributed through the Solana dApp Store. The desktop IDE remains the full build environment.

## What it does

- Pair the phone with your Daemon desktop install over a local relay session.
- Stream every agent-proposed file write, terminal command, deploy, and wallet flow into a mobile approval queue.
- Approve or reject each action with one tap. The desktop only executes after the phone confirms.
- Authorize a Solana wallet through Mobile Wallet Adapter and sign messages or transactions on the device.
- Receive push alerts when an agent is waiting on you, when a build fails, or when a deploy succeeds.

## Install

Install Daemon Seeker from the Solana dApp Store. On a Seeker device, open the dApp Store app, search for "Daemon", and install. On any other Android device, install the dApp Store first, then install Daemon Seeker.

Once installed, open the app and grant notification permission if you want approval alerts. The Pair tab is where every session starts.

## Pair the phone

Pairing creates a short-lived encrypted relay session between Daemon desktop and the Seeker app. The phone never touches your files directly; it only sees signed approval requests and signs wallet payloads.

### From desktop

1. Open the desktop IDE and switch to the Solana toolbox.
2. Click the `Seeker` tab.
3. Click `Start Seeker pairing`. The desktop generates a code, a local relay URL, and a deep link.

### From phone

1. Open the Seeker app and tap `Pair`.
2. Enter the pairing code shown on desktop.
3. Enter the relay URL the desktop displays. Both devices must be on the same Wi-Fi or LAN.
4. Tap `Pair`. The status pill turns green when the desktop confirms.

The pairing code expires shortly after it is generated. If the timer runs out, click `Create new pairing session` on desktop to mint a fresh one.

### Deep link

Desktop also exposes a Daemon Seeker deep link in the format below. Opening the link on the phone fills the pairing code and relay URL automatically.

```
daemonseeker://pair?code=DMN-ABCD-87&relay=http://192.168.1.10:7778&project=Daemon
```

## Review and approve agent actions

Once paired, every sensitive action the desktop agent wants to take becomes a card on the phone. Each card includes a risk level, a description, and a preview of the command, diff, or transaction.

| Action class | What lands on Seeker | Default risk |
|---|---|---|
| File writes | Path, change summary, line count | Low |
| Terminal commands | Full command preview | Medium |
| Dependency installs | Package list and lockfile delta | Medium |
| GitHub pushes | Branch, commit summary, target remote | Medium |
| Solana deploys | Cluster, program id, IDL hash | High |
| Token launches | Mint, supply, fee config | High |
| Wallet signing | Transaction or message preview | High |

Approving sends an `approval.approve` event back to the desktop relay and the desktop continues with the action. Rejecting sends an `approval.reject` event and the desktop cancels the request.

## Wallet signing

The Wallet tab uses Mobile Wallet Adapter to authorize a Solana wallet on the phone. Daemon Seeker never sees your private keys; it only requests signatures from a wallet app that is already installed on the device.

### Connect a wallet

1. Open the Wallet tab and pick a cluster (defaults to `devnet`).
2. Tap `Connect Seeker wallet`. Mobile Wallet Adapter opens any compatible wallet on the device, like Phantom, Solflare, or Backpack.
3. Approve the authorization request inside the wallet app. Daemon Seeker stores the auth token locally for the session.

If no MWA-compatible wallet is installed on the phone, the connect button will return an error. Install Phantom, Solflare, or Backpack from the dApp Store or Play Store first.

### Sign the pairing handshake

Tap `Sign pairing message` after connecting a wallet. This produces a signed message that the desktop relay can verify, proving the phone holds the wallet that authorized the session. This step is optional but recommended.

## Devnet vs mainnet

Daemon Seeker defaults to `devnet` so wallet flows can be tested without risking real funds. Switch to `mainnet-beta` from the Wallet tab when you are ready to sign live transactions.

## Push notifications

Optional. The Pair tab has an `Enable notifications` button that requests permission and registers an Expo push token. With permission granted, the phone shows a banner whenever an agent action arrives, a build fails, a deploy succeeds, or a payment lands.

## Architecture

Daemon Seeker is a small React Native app. The desktop side runs a local relay service that brokers sessions, holds approval state, and forwards events to the phone. No data leaves your network during a normal session.

```
Desktop                                  Seeker (phone)
--------                                  --------------
Solana toolbox > Seeker tab
  -> Start pairing
  -> SeekerRelayService creates session
  -> shows code, relay URL, deep link

                                          Pair tab
                                            -> enter code + relay URL
                                            -> POST /api/seeker/events { type: 'pair' }

SeekerRelayService marks paired
  -> session status flips to 'paired'

Agent proposes action
  -> SeekerRelayService.publishApproval(...)
  -> push event into session

                                          Approvals tab
                                            -> renders card
                                            -> Approve / Reject

                                          POST /api/seeker/events
                                            { type: 'approval.approve', approvalId }

SeekerRelayService updates approval state
  -> desktop agent reads result
  -> action runs or cancels
```

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Phone says "Could not reach desktop relay" | Phone and desktop are not on the same network | Connect both devices to the same Wi-Fi or use a hotspot |
| Pairing code is rejected | The code expired | Click Create new pairing session on desktop |
| Connect Seeker wallet errors immediately | No MWA-compatible wallet installed | Install Phantom, Solflare, or Backpack on the phone |
| Notifications never arrive | OS-level permission denied or doze mode | Re-enable in Android settings, then reopen the Pair tab |
| Approval card never reaches the phone | Desktop relay was restarted after pairing | Re-run pairing from the desktop Seeker tab |
| Wallet shows wrong cluster | Cluster mismatch between phone and desktop | Switch the cluster on the Wallet tab to match the desktop project |

## Privacy

- Daemon Seeker stores pairing codes, relay URLs, and the active wallet's public address only on the device.
- Private keys never leave your wallet app and are never seen by Daemon Seeker.
- The mobile app talks only to the desktop relay URL you provide. We do not operate a hosted relay.
- See the full [privacy policy](/privacy) for details.
