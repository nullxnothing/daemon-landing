# AI Agents

DAEMON integrates Claude Code agents directly into the IDE. Every agent runs as a real CLI process with full tool access, not a chat overlay or browser-based assistant.

## Agent Launcher

Open the Agent Launcher with `Ctrl+Shift+A`. From here you can:

- Select a built-in agent preset
- Create a custom agent with your own system prompt
- Choose a model (Opus, Sonnet, Haiku)
- Configure per-project MCP servers

## Built-in Agents

DAEMON ships with six pre-configured agents:

| Agent | Purpose |
| --- | --- |
| **Debug** | Trace errors and fix stack traces |
| **Security Audit** | Scan for vulnerabilities and exploits |
| **Code Review** | Review code quality and patterns |
| **Git** | Commit, branch, and PR management |
| **Test Runner** | Write and run test suites |
| **Solana** | On-chain interactions and program development |

Each agent runs as an independent Claude Code process with full filesystem access, terminal capabilities, and tool use.

## Custom Agents

Create your own agents with:

- **Custom system prompts**, Define exactly how the agent should behave
- **Model selection**, Choose between Opus, Sonnet, and Haiku based on your task
- **MCP configuration**, Assign project-level or global MCP servers to each agent

DAEMON also includes **41 pre-built Claude agents** available for import from the Agent Launcher. These cover common development tasks across web, Solana, testing, and DevOps workflows.

## MCP Management

Toggle project-level and global MCP servers from the Claude panel or Settings. Changes are written to:

- `.claude/settings.json`, Project-level configuration
- `.mcp.json`, Global MCP server registry

## Agent Sessions

Every agent session is tracked and can be viewed in the Sessions tab on the right panel. Session data includes:

- Start and end timestamps
- Commands executed
- Files modified
- Token usage

For Solana projects, sessions can optionally be recorded on-chain via the [Session Registry](solana-development.md#session-registry).
