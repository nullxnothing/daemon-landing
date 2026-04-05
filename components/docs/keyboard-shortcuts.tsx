import { DocHeading, DocSubheading, H2, Table, Code, Hint } from "./primitives";

export function KeyboardShortcutsDoc() {
  return (
    <>
      <DocHeading>Keyboard Shortcuts</DocHeading>
      <DocSubheading>Full shortcut reference for DAEMON.</DocSubheading>

      <H2 id="essential">Essential</H2>
      <Table
        headers={["Shortcut", "Action"]}
        rows={[
          [<Code key="k">Ctrl+K</Code>, "Command Drawer (access all tools)"],
          [<Code key="p">Ctrl+P</Code>, "Quick Open (file search)"],
          [<Code key="sp">Ctrl+Shift+P</Code>, "Command Palette"],
          [<Code key="sa">Ctrl+Shift+A</Code>, "Agent Launcher"],
          [<Code key="sg">Ctrl+Shift+G</Code>, "Grind Mode"],
          [<Code key="c">Ctrl+,</Code>, "Settings"],
        ]}
      />

      <H2 id="editor">Editor</H2>
      <Table
        headers={["Shortcut", "Action"]}
        rows={[
          [<Code key="s">Ctrl+S</Code>, "Save file"],
          [<Code key="z">Ctrl+Z</Code>, "Undo"],
          [<Code key="sz">Ctrl+Shift+Z</Code>, "Redo"],
          [<Code key="f">Ctrl+F</Code>, "Find in file"],
          [<Code key="h">Ctrl+H</Code>, "Find and replace"],
          [<Code key="d">Ctrl+D</Code>, "Select next occurrence"],
          [<Code key="sl">Ctrl+Shift+L</Code>, "Select all occurrences"],
          [<Code key="slash">Ctrl+/</Code>, "Toggle line comment"],
          [<Code key="au">Alt+Up/Down</Code>, "Move line up/down"],
          [<Code key="sk">Ctrl+Shift+K</Code>, "Delete line"],
        ]}
      />

      <H2 id="navigation">Navigation</H2>
      <Table
        headers={["Shortcut", "Action"]}
        rows={[
          [<Code key="p2">Ctrl+P</Code>, "Quick Open (file search)"],
          [<Code key="sb">Ctrl+Shift+B</Code>, "Browser Tab"],
          [<Code key="sd">Ctrl+Shift+D</Code>, "Dashboard Tab"],
          [<Code key="tab">Ctrl+Tab</Code>, "Next editor tab"],
          [<Code key="stab">Ctrl+Shift+Tab</Code>, "Previous editor tab"],
        ]}
      />

      <H2 id="terminal">Terminal</H2>
      <Table
        headers={["Shortcut", "Action"]}
        rows={[
          [<Code key="bt">Ctrl+`</Code>, "Toggle Terminal"],
          [<Code key="sf">Ctrl+Shift+F</Code>, "Terminal Search"],
          [<Code key="r">Ctrl+R</Code>, "Reverse search history"],
        ]}
      />

      <H2 id="agents">AI Agents</H2>
      <Table
        headers={["Shortcut", "Action"]}
        rows={[
          [<Code key="sa2">Ctrl+Shift+A</Code>, "Agent Launcher"],
          [<Code key="sg2">Ctrl+Shift+G</Code>, "Grind Mode"],
        ]}
      />

      <Hint type="info">
        All shortcuts use <strong>Ctrl</strong> on Windows and <strong>Cmd</strong> on macOS.
      </Hint>
    </>
  );
}
