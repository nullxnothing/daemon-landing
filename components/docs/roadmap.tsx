import { DocHeading, DocSubheading, H2, H3, Paragraph, CardGrid, InfoCard, Divider } from "./primitives";

export function RoadmapDoc() {
  return (
    <>
      <DocHeading>Roadmap</DocHeading>
      <DocSubheading>What&apos;s coming next for DAEMON.</DocSubheading>

      <H2 id="in-development">In Development</H2>

      <CardGrid>
        <InfoCard title="Multi-Agent Orchestration">
          Run multiple AI agents simultaneously with intelligent task distribution and
          coordination. Building on Grind Mode&apos;s foundation with smarter inter-agent
          communication.
        </InfoCard>
        <InfoCard title="Local LLM Support">
          Run local language models for offline AI assistance with Ollama and LM Studio
          integration. Use open-source models when you don&apos;t need Claude&apos;s full
          capabilities.
        </InfoCard>
      </CardGrid>

      <H2 id="planned">Planned</H2>

      <CardGrid>
        <InfoCard title="Real-Time Collaboration">
          Work with teammates in real-time with live cursors, presence indicators, and shared
          sessions.
        </InfoCard>
        <InfoCard title="Enhanced Security">
          Advanced sandboxing, code signing verification, and secure credential management.
        </InfoCard>
        <InfoCard title="Cloud Sync">
          Sync your settings, plugins, and workspace configurations across devices. Pick up where
          you left off on any machine.
        </InfoCard>
        <InfoCard title="Team Workspaces">
          Shared project configurations, MCP servers, and agent templates for teams.
        </InfoCard>
      </CardGrid>

      <Divider />

      <H2 id="suggest">Suggest a Feature</H2>
      <Paragraph>
        Want to influence the roadmap? Open an issue or contribute directly:
      </Paragraph>
      <div className="mt-4">
        <a
          href="https://github.com/nullxnothing/daemon/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent hover:underline underline-offset-4 text-[15px]"
        >
          Open an issue on GitHub &rarr;
        </a>
      </div>
    </>
  );
}
