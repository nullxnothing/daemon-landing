# Grind Mode

Grind Mode is DAEMON's signature feature, a multi-panel agent grid that lets you run multiple Claude agents working on different parts of your project simultaneously.

## How It Works

Launch Grind Mode with `Ctrl+Shift+G`. DAEMON opens a multi-panel grid where each panel runs an independent Claude Code agent. All agents work on your codebase at the same time, each with their own context, tools, and terminal access.

## Example Workflow

A typical Grind Mode session might look like:

```
┌─────────────────────┬─────────────────────┐
│  Agent 1            │  Agent 2            │
│  Scaffolding an     │  Wiring Jupiter     │
│  Anchor program     │  swap integration   │
├─────────────────────┼─────────────────────┤
│  Agent 3            │  Agent 4            │
│  Writing token      │  Building the       │
│  launch tests       │  frontend           │
└─────────────────────┴─────────────────────┘
```

Each agent operates independently:

- **Agent 1** scaffolds the on-chain program in Rust
- **Agent 2** builds the swap integration hooks
- **Agent 3** writes and runs test suites
- **Agent 4** creates the frontend components

## When to Use Grind Mode

Grind Mode is most effective when you have independent tasks that don't depend on each other:

- Scaffolding different parts of a project simultaneously
- Running tests while building new features
- Writing documentation while refactoring code
- Building frontend and backend in parallel
- Auditing security while shipping features

## Tips

- **Keep tasks independent**, Agents work best on separate files or modules. Avoid assigning overlapping files to multiple agents.
- **Use specific prompts**, Give each agent a clear, focused task. Vague prompts produce vague results.
- **Monitor progress**, Watch each panel's output to catch issues early. You can interact with any agent at any time.
- **Scale as needed**, Start with two agents for simpler tasks, scale up for larger projects.

## Keyboard Shortcut

| Shortcut | Action |
| --- | --- |
| `Ctrl+Shift+G` | Toggle Grind Mode |
