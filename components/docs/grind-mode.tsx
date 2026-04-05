import { DocHeading, DocSubheading, H2, Paragraph, CodeBlock, List, Table, Code } from "./primitives";

export function GrindModeDoc() {
  return (
    <>
      <DocHeading>Grind Mode</DocHeading>
      <DocSubheading>
        Multi-panel agent grid. Run multiple Claude agents on different parts of your project simultaneously.
      </DocSubheading>

      <H2 id="how-it-works">How It Works</H2>
      <Paragraph>
        Launch Grind Mode with <Code>Ctrl+Shift+G</Code>. DAEMON opens a multi-panel grid where
        each panel runs an independent Claude Code agent. All agents work on your codebase at the
        same time, each with their own context, tools, and terminal access.
      </Paragraph>

      <H2 id="example">Example Workflow</H2>
      <CodeBlock>{`┌─────────────────────┬─────────────────────┐
│  Agent 1            │  Agent 2            │
│  Scaffolding an     │  Wiring Jupiter     │
│  Anchor program     │  swap integration   │
├─────────────────────┼─────────────────────┤
│  Agent 3            │  Agent 4            │
│  Writing token      │  Building the       │
│  launch tests       │  frontend           │
└─────────────────────┴─────────────────────┘`}</CodeBlock>

      <List
        items={[
          <><strong className="text-foreground">Agent 1</strong> scaffolds the on-chain program in Rust</>,
          <><strong className="text-foreground">Agent 2</strong> builds the swap integration hooks</>,
          <><strong className="text-foreground">Agent 3</strong> writes and runs test suites</>,
          <><strong className="text-foreground">Agent 4</strong> creates the frontend components</>,
        ]}
      />

      <H2 id="when-to-use">When to Use Grind Mode</H2>
      <Paragraph>
        Grind Mode is most effective when you have independent tasks that don&apos;t depend on each other:
      </Paragraph>
      <List
        items={[
          "Scaffolding different parts of a project simultaneously",
          "Running tests while building new features",
          "Writing documentation while refactoring code",
          "Building frontend and backend in parallel",
          "Auditing security while shipping features",
        ]}
      />

      <H2 id="tips">Tips</H2>
      <List
        items={[
          <><strong className="text-foreground">Keep tasks independent.</strong> Agents work best on separate files or modules. Avoid overlapping files.</>,
          <><strong className="text-foreground">Use specific prompts.</strong> Give each agent a clear, focused task.</>,
          <><strong className="text-foreground">Monitor progress.</strong> Watch each panel&apos;s output. You can interact with any agent at any time.</>,
          <><strong className="text-foreground">Scale as needed.</strong> Start with two agents for simpler tasks, scale up for larger projects.</>,
        ]}
      />

      <H2 id="shortcut">Keyboard Shortcut</H2>
      <Table
        headers={["Shortcut", "Action"]}
        rows={[
          [<Code key="k">Ctrl+Shift+G</Code>, "Toggle Grind Mode"],
        ]}
      />
    </>
  );
}
