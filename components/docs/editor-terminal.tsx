import { DocHeading, DocSubheading, H2, H3, Paragraph, List, Hint } from "./primitives";

export function EditorTerminalDoc() {
  return (
    <>
      <DocHeading>Monaco Editor & Terminal</DocHeading>
      <DocSubheading>
        Full-featured offline editor and real PTY terminal — both running natively.
      </DocSubheading>

      <H2 id="editor">Monaco Editor</H2>
      <Paragraph>
        The editor is powered by the same Monaco engine used in VS Code, loaded via a custom
        Electron protocol handler for fully offline operation. Zero CDN requests, zero network
        dependencies.
      </Paragraph>

      <H3>Features</H3>
      <List
        items={[
          <><strong className="text-foreground">Multi-tab editing</strong> — Open multiple files with drag-and-drop reordering</>,
          <><strong className="text-foreground">Breadcrumb navigation</strong> — Click through the file path to navigate</>,
          <><strong className="text-foreground">Syntax highlighting</strong> — TypeScript, Rust, Python, JSON, TOML, and more</>,
          <><strong className="text-foreground">Multi-cursor editing</strong> — Ctrl+D to select next, Ctrl+Shift+L to select all</>,
          <><strong className="text-foreground">Minimap</strong> — Code overview on the right side</>,
          <><strong className="text-foreground">Find and replace</strong> — Ctrl+F for search, Ctrl+H for replace</>,
          <><strong className="text-foreground">Code folding</strong> — Collapse and expand code blocks</>,
          <><strong className="text-foreground">Auto-indent</strong> — Consistent code formatting</>,
        ]}
      />

      <H3>Offline-First</H3>
      <Paragraph>
        The Monaco editor runs through a custom protocol handler registered in Electron&apos;s main
        process. No network requests for the editor itself, no CDN dependencies, and your code
        never leaves your machine.
      </Paragraph>

      <H2 id="terminal">Terminal</H2>
      <Paragraph>
        DAEMON&apos;s terminal is a real PTY implementation using node-pty and xterm.js — not a
        browser-based emulator.
      </Paragraph>

      <H3>Features</H3>
      <List
        items={[
          <><strong className="text-foreground">Real PTY sessions</strong> — Full shell access with proper signal handling</>,
          <><strong className="text-foreground">Multiple tabs</strong> — Open as many terminal sessions as you need</>,
          <><strong className="text-foreground">Split panes</strong> — Divide terminals horizontally or vertically</>,
          <><strong className="text-foreground">Per-project sessions</strong> — Each project gets its own terminal context</>,
          <><strong className="text-foreground">Command history</strong> — Ctrl+R for reverse search</>,
          <><strong className="text-foreground">Tab completion</strong> — Standard shell tab completion</>,
          <><strong className="text-foreground">Copy/paste</strong> — Select to copy, right-click to paste</>,
        ]}
      />

      <Hint type="info">
        Unlike browser-based emulators, DAEMON&apos;s terminal supports interactive programs (vim,
        htop), handles ANSI escape codes correctly, and provides proper signal handling (Ctrl+C,
        Ctrl+Z).
      </Hint>
    </>
  );
}
