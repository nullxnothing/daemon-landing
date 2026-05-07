import { Code, CodeBlock, DocHeading, DocSubheading, H2, H3, Hint, List, Paragraph, Table } from "./primitives";

export function SeekerCompanionDoc() {
  return (
    <>
      <DocHeading>Daemon Seeker</DocHeading>
      <DocSubheading>
        Daemon Seeker is the mobile command center for the desktop IDE. Pair your phone,
        approve agent actions before they touch files, deploys, or wallets, and sign
        Solana transactions through Mobile Wallet Adapter.
      </DocSubheading>

      <Hint type="info">
        Seeker is built for Solana Mobile (Seeker / Saga) and any Android device with a
        Mobile Wallet Adapter compatible wallet installed. It is distributed through the
        Solana dApp Store. The desktop IDE remains the full build environment.
      </Hint>

      <H2 id="what-it-does">What it does</H2>
      <List
        items={[
          "Pair the phone with your Daemon desktop install over a local relay session.",
          "Stream every agent-proposed file write, terminal command, deploy, and wallet flow into a mobile approval queue.",
          "Approve or reject each action with one tap. The desktop only executes after the phone confirms.",
          "Authorize a Solana wallet through Mobile Wallet Adapter and sign messages or transactions on the device.",
          "Receive push alerts when an agent is waiting on you, when a build fails, or when a deploy succeeds.",
        ]}
      />

      <H2 id="install">Install</H2>
      <Paragraph>
        Daemon Seeker installs from the Solana dApp Store. On a Seeker device, open the
        dApp Store app, search for <Code>Daemon</Code>, and install. On any other Android
        device, install the dApp Store first, then install Daemon Seeker.
      </Paragraph>
      <Paragraph>
        Once installed, open the app and grant notification permission if you want
        approval alerts. The Pair tab is where every session starts.
      </Paragraph>

      <H2 id="pair">Pair the phone</H2>
      <Paragraph>
        Pairing creates a short-lived encrypted relay session between Daemon desktop and
        the Seeker app. The phone never touches your files directly; it only sees signed
        approval requests and signs wallet payloads.
      </Paragraph>

      <H3 id="from-desktop">From desktop</H3>
      <List
        items={[
          <>Open the desktop IDE and switch to the Solana toolbox.</>,
          <>Click the <Code>Seeker</Code> tab.</>,
          <>Click <Code>Start Seeker pairing</Code>. The desktop generates a code, a local relay URL, and a deep link.</>,
        ]}
      />

      <H3 id="from-phone">From phone</H3>
      <List
        items={[
          <>Open the Seeker app and tap <Code>Pair</Code>.</>,
          <>Enter the pairing code shown on desktop.</>,
          <>Enter the relay URL the desktop displays. Both devices must be on the same Wi-Fi or LAN.</>,
          <>Tap <Code>Pair</Code>. The status pill turns green when the desktop confirms.</>,
        ]}
      />

      <Hint type="warning">
        The pairing code expires shortly after it is generated. If the timer runs out,
        click <Code>Create new pairing session</Code> on desktop to mint a fresh one.
      </Hint>

      <H3 id="deep-link">Deep link</H3>
      <Paragraph>
        Desktop also exposes a Daemon Seeker deep link in the format below. Opening the
        link on the phone fills the pairing code and relay URL automatically.
      </Paragraph>
      <CodeBlock title="Seeker deep link">
{`daemonseeker://pair?code=DMN-ABCD-87&relay=http://192.168.1.10:7778&project=Daemon`}
      </CodeBlock>

      <H2 id="approve">Review and approve agent actions</H2>
      <Paragraph>
        Once paired, every sensitive action the desktop agent wants to take becomes a
        card on the phone. Each card includes a risk level, a description, and a preview
        of the command, diff, or transaction.
      </Paragraph>

      <Table
        headers={["Action class", "What lands on Seeker", "Default risk"]}
        rows={[
          ["File writes", "Path, change summary, line count", "Low"],
          ["Terminal commands", "Full command preview", "Medium"],
          ["Dependency installs", "Package list and lockfile delta", "Medium"],
          ["GitHub pushes", "Branch, commit summary, target remote", "Medium"],
          ["Solana deploys", "Cluster, program id, IDL hash", "High"],
          ["Token launches", "Mint, supply, fee config", "High"],
          ["Wallet signing", "Transaction or message preview", "High"],
        ]}
      />

      <Paragraph>
        Approving sends an <Code>approval.approve</Code> event back to the desktop relay
        and the desktop continues with the action. Rejecting sends an
        <Code>approval.reject</Code> event and the desktop cancels the request.
      </Paragraph>

      <H2 id="wallet">Wallet signing</H2>
      <Paragraph>
        The Wallet tab uses Mobile Wallet Adapter to authorize a Solana wallet on the
        phone. Daemon Seeker never sees your private keys; it only requests signatures
        from a wallet app that is already installed on the device.
      </Paragraph>

      <H3 id="connect">Connect a wallet</H3>
      <List
        items={[
          <>Open the Wallet tab and pick a cluster (defaults to <Code>devnet</Code>).</>,
          <>Tap <Code>Connect Seeker wallet</Code>. Mobile Wallet Adapter opens any compatible wallet on the device, like Phantom, Solflare, or Backpack.</>,
          "Approve the authorization request inside the wallet app. Daemon Seeker stores the auth token locally for the session.",
        ]}
      />

      <Hint type="warning">
        If no MWA-compatible wallet is installed on the phone, the connect button will
        return an error. Install Phantom, Solflare, or Backpack from the dApp Store or
        Play Store first.
      </Hint>

      <H3 id="sign">Sign the pairing handshake</H3>
      <Paragraph>
        Tap <Code>Sign pairing message</Code> after connecting a wallet. This produces a
        signed message that the desktop relay can verify, proving the phone holds the
        wallet that authorized the session. This step is optional but recommended.
      </Paragraph>

      <H2 id="cluster">Devnet vs mainnet</H2>
      <Paragraph>
        Daemon Seeker defaults to <Code>devnet</Code> so wallet flows can be tested
        without risking real funds. Switch to <Code>mainnet-beta</Code> from the Wallet
        tab when you are ready to sign live transactions.
      </Paragraph>

      <H2 id="notifications">Push notifications</H2>
      <Paragraph>
        Optional. The Pair tab has an <Code>Enable notifications</Code> button that
        requests permission and registers an Expo push token. With permission granted,
        the phone shows a banner whenever an agent action arrives, a build fails, a
        deploy succeeds, or a payment lands.
      </Paragraph>

      <H2 id="architecture">Architecture</H2>
      <Paragraph>
        Daemon Seeker is a small React Native app. The desktop side runs a local relay
        service that brokers sessions, holds approval state, and forwards events to the
        phone. No data leaves your network during a normal session.
      </Paragraph>

      <CodeBlock title="Pairing + approval flow">
{`Desktop                                  Seeker (phone)
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
  -> action runs or cancels`}
      </CodeBlock>

      <H2 id="troubleshoot">Troubleshooting</H2>
      <Table
        headers={["Symptom", "Likely cause", "Fix"]}
        rows={[
          ["Phone says 'Could not reach desktop relay'", "Phone and desktop are not on the same network", "Connect both devices to the same Wi-Fi or use a hotspot"],
          ["Pairing code is rejected", "The code expired", "Click Create new pairing session on desktop"],
          ["Connect Seeker wallet errors immediately", "No MWA-compatible wallet installed", "Install Phantom, Solflare, or Backpack on the phone"],
          ["Notifications never arrive", "OS-level permission denied or doze mode", "Re-enable in Android settings, then reopen the Pair tab"],
          [<>Approval card never reaches the phone</>, "Desktop relay was restarted after pairing", "Re-run pairing from the desktop Seeker tab"],
          ["Wallet shows wrong cluster", "Cluster mismatch between phone and desktop", "Switch the cluster on the Wallet tab to match the desktop project"],
        ]}
      />

      <H2 id="privacy">Privacy</H2>
      <List
        items={[
          "Daemon Seeker stores pairing codes, relay URLs, and the active wallet's public address only on the device.",
          "Private keys never leave your wallet app and are never seen by Daemon Seeker.",
          "The mobile app talks only to the desktop relay URL you provide. We do not operate a hosted relay.",
          <>See the full <a href="/privacy" className="underline decoration-white/30 underline-offset-4 hover:decoration-foreground">privacy policy</a> for details.</>,
        ]}
      />
    </>
  );
}
