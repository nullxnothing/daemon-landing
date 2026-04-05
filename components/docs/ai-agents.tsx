import { DocHeading, DocSubheading, H2, H3, Paragraph, Table, List, Code, Hint } from "./primitives";

export function AIAgentsDoc() {
  return (
    <>
      <DocHeading>AI Agents</DocHeading>
      <DocSubheading>
        Spawn Claude Code agents with full tool access — every agent runs as a real CLI process.
      </DocSubheading>

      <H2 id="agent-launcher">Agent Launcher</H2>
      <Paragraph>
        Open the Agent Launcher with <Code>Ctrl+Shift+A</Code>. From here you can select a
        built-in agent preset, create a custom agent with your own system prompt, choose a model
        (Opus, Sonnet, Haiku), and configure per-project MCP servers.
      </Paragraph>

      <H2 id="built-in-agents">Built-in Agents</H2>
      <Paragraph>DAEMON ships with six pre-configured agents:</Paragraph>
      <Table
        headers={["Agent", "Purpose"]}
        rows={[
          [<strong key="d" className="text-foreground">Debug</strong>, "Trace errors and fix stack traces"],
          [<strong key="s" className="text-foreground">Security Audit</strong>, "Scan for vulnerabilities and exploits"],
          [<strong key="c" className="text-foreground">Code Review</strong>, "Review code quality and patterns"],
          [<strong key="g" className="text-foreground">Git</strong>, "Commit, branch, and PR management"],
          [<strong key="t" className="text-foreground">Test Runner</strong>, "Write and run test suites"],
          [<strong key="sol" className="text-foreground">Solana</strong>, "On-chain interactions and program development"],
        ]}
      />
      <Paragraph>
        Each agent runs as an independent Claude Code process with full filesystem access, terminal
        capabilities, and tool use.
      </Paragraph>

      <H2 id="custom-agents">Custom Agents</H2>
      <List
        items={[
          <><strong className="text-foreground">Custom system prompts</strong> — Define exactly how the agent should behave</>,
          <><strong className="text-foreground">Model selection</strong> — Choose between Opus, Sonnet, and Haiku based on your task</>,
          <><strong className="text-foreground">MCP configuration</strong> — Assign project-level or global MCP servers to each agent</>,
        ]}
      />
      <Hint type="info">
        DAEMON includes <strong>41 pre-built Claude agents</strong> available for import from the
        Agent Launcher — covering web, Solana, testing, and DevOps workflows.
      </Hint>

      <H2 id="mcp">MCP Management</H2>
      <Paragraph>
        Toggle project-level and global MCP servers from the Claude panel or Settings. Changes are
        written to <Code>.claude/settings.json</Code> (project-level) and <Code>.mcp.json</Code> (global).
      </Paragraph>

      <H2 id="sessions">Agent Sessions</H2>
      <Paragraph>
        Every agent session is tracked in the Sessions tab on the right panel. Session data includes
        start/end timestamps, commands executed, files modified, and token usage.
      </Paragraph>
      <Paragraph>
        For Solana projects, sessions can optionally be recorded on-chain via the Session Registry.
      </Paragraph>
    </>
  );
}
