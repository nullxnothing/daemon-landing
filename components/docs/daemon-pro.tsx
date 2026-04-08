import type { ReleaseInfo } from "@/lib/downloads";
import {
  CardGrid,
  Code,
  DocHeading,
  DocSubheading,
  H2,
  Hint,
  InfoCard,
  List,
  Paragraph,
} from "./primitives";

export function DaemonProDoc({ release }: { release: ReleaseInfo }) {
  return (
    <>
      <DocHeading>Daemon Pro & Arena</DocHeading>
      <DocSubheading>
        DAEMON Pro is the paid layer on top of DAEMON. It unlocks Arena submissions,
        the Pro skill pack, hosted MCP sync, priority API quota, and holder-gated access
        for qualified DAEMON wallets.
      </DocSubheading>

      <Hint type="success">
        The public Arena board at <Code>/arena</Code> reads from the same live backend as the
        desktop app, so the website and the app stay in sync.
      </Hint>

      <H2 id="what-you-get">What Pro unlocks</H2>
      <CardGrid>
        <InfoCard title="Arena">
          Submit your project in-app, vote on the live board, and compete for distribution,
          prizes, and lifetime Pro access.
        </InfoCard>
        <InfoCard title="Pro Skill Pack">
          Curated workflows, templates, and operator-grade skills designed to improve default output.
        </InfoCard>
        <InfoCard title="Hosted MCP Sync">
          Push MCP configuration from one DAEMON install and pull it onto the next machine.
        </InfoCard>
        <InfoCard title="Priority API">
          Higher-value paid endpoints without the usual pay-per-call friction for power users.
        </InfoCard>
      </CardGrid>

      <H2 id="holder-access">Holder access</H2>
      <Paragraph>
        Qualified DAEMON holders can claim Pro directly in the app without going through the USDC
        payment flow. The current holder gate is <strong className="text-foreground">1,000,000 DAEMON</strong>.
      </Paragraph>
      <List
        items={[
          <>Open <Code>Tools &gt; Daemon Pro</Code> inside the app.</>,
          "Select the wallet that holds the required amount of DAEMON.",
          "Claim holder access and refresh the Pro panel.",
        ]}
      />

      <H2 id="arena-flow">Arena flow</H2>
      <Paragraph>
        Arena is split into two surfaces. The website is the public showcase and contest wrapper.
        The app is where real users submit and manage entries.
      </Paragraph>
      <List
        items={[
          "Website: contest framing, rules, prizes, winners, live public board.",
          "Desktop app: submissions, voting, holder claim, and Pro activation.",
          "Backend: shared Arena state served from the hosted Pro API.",
        ]}
      />

      <H2 id="submit">How to submit</H2>
      <Paragraph>
        In the desktop app, go to <Code>Tools &gt; Daemon Pro &gt; Arena</Code>. Submit your title,
        one-line pitch, GitHub link, optional demo, and social handles.
      </Paragraph>

      <H2 id="downloads">Downloads</H2>
      <Paragraph>
        The landing site download buttons always point to the latest GitHub release. The current
        public release shown on this site is <strong className="text-foreground">v{release.version}</strong>.
      </Paragraph>
      <Hint type="warning">
        Website updates can ship immediately on Vercel. Desktop feature changes only reach users after
        a new DAEMON release is built and published to GitHub.
      </Hint>
    </>
  );
}
