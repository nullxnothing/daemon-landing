import { DocHeading, DocSubheading, H2, H3, Paragraph, List, Table, Hint } from "./primitives";

const WINDOWS_URL = "https://pub-1996550623c84fbeb15c66144b09e41e.r2.dev/DAEMON-1.0.0-setup.exe";
const MAC_URL = "https://github.com/nullxnothing/daemon#mac-install";

export function InstallationDoc() {
  return (
    <>
      <DocHeading>Installation</DocHeading>
      <DocSubheading>Download DAEMON and get set up in under 2 minutes.</DocSubheading>

      <H2 id="download">Download</H2>
      <div className="flex flex-col sm:flex-row gap-3 my-4">
        <a
          href={WINDOWS_URL}
          download
          className="flex items-center justify-center gap-2.5 bg-foreground text-background px-5 py-3 rounded-xl font-medium text-[15px] transition-all hover:bg-accent hover:text-accent-foreground"
        >
          Windows (.exe)
        </a>
        <a
          href={MAC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 border border-border bg-card px-5 py-3 rounded-xl font-medium text-[15px] text-muted transition-all hover:border-muted hover:text-foreground"
        >
          macOS (.dmg)
        </a>
      </div>

      <H2 id="prerequisites">Prerequisites</H2>
      <List
        items={[
          <><strong className="text-foreground">Node.js 22+</strong> — required for agent spawning and terminal sessions</>,
          <><strong className="text-foreground">pnpm</strong> (recommended) — faster installs, used internally by DAEMON</>,
        ]}
      />

      <H2 id="first-launch">First Launch</H2>
      <Paragraph>
        On first run, DAEMON shows a boot loader sequence followed by the onboarding wizard. This
        walks you through workspace configuration, Claude setup, and optional integrations. Takes
        about 2 minutes.
      </Paragraph>

      <H2 id="requirements">System Requirements</H2>
      <Table
        headers={["Requirement", "Minimum"]}
        rows={[
          ["OS", "Windows 10+ or macOS 12+"],
          ["Node.js", "v22 or higher"],
          ["RAM", "4 GB (8 GB recommended)"],
          ["Disk", "~500 MB for installation"],
        ]}
      />

      <H2 id="updating">Updating</H2>
      <Paragraph>
        DAEMON includes auto-update support via electron-builder. When a new version is available,
        you&apos;ll see a notification in the status bar. Click to download and install — no manual
        steps required.
      </Paragraph>
    </>
  );
}
