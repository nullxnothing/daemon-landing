"use client";

type Token = string | [string, string];
type Line = Token[];

const FILE_CONTENTS: Record<string, { lang: string; lines: Line[] }> = {
  "src/App.tsx": {
    lang: "tsx",
    lines: [
      [["keyword", "import"], " { ", ["type", "useState"], ", ", ["type", "useEffect"], " } ", ["keyword", "from"], " ", ["string", "'react'"]],
      [["keyword", "import"], " { ", ["type", "FileExplorer"], " } ", ["keyword", "from"], " ", ["string", "'./panels/FileExplorer'"]],
      [["keyword", "import"], " { ", ["type", "EditorPanel"], " } ", ["keyword", "from"], " ", ["string", "'./panels/Editor'"]],
      [["keyword", "import"], " { ", ["type", "TerminalPanel"], " } ", ["keyword", "from"], " ", ["string", "'./panels/Terminal'"]],
      [["keyword", "import"], " { ", ["type", "IconSidebar"], " } ", ["keyword", "from"], " ", ["string", "'./panels/IconSidebar'"]],
      [["keyword", "import"], " { ", ["type", "useUIStore"], " } ", ["keyword", "from"], " ", ["string", "'./store/ui'"]],
      [["keyword", "import"], " ", ["string", "'./App.css'"]],
      [],
      [["keyword", "function"], " ", ["function", "App"], ["punctuation", "()"], " ", ["punctuation", "{"]],
      ["  ", ["keyword", "const"], " activePanel ", ["operator", "="], " ", ["function", "useUIStore"], ["punctuation", "("], ["punctuation", "("], "s", ["punctuation", ")"], " ", ["operator", "=>"], " s.activePanel", ["punctuation", ")"]],
      ["  ", ["keyword", "const"], " projects ", ["operator", "="], " ", ["function", "useUIStore"], ["punctuation", "("], ["punctuation", "("], "s", ["punctuation", ")"], " ", ["operator", "=>"], " s.projects", ["punctuation", ")"]],
      ["  ", ["keyword", "const"], " ", ["punctuation", "["], "showExplorer", ["punctuation", ","], " setShowExplorer", ["punctuation", "]"], " ", ["operator", "="], " ", ["function", "useState"], ["punctuation", "("], ["keyword", "true"], ["punctuation", ")"]],
      ["  ", ["keyword", "const"], " ", ["punctuation", "["], "showTerminal", ["punctuation", ","], " setShowTerminal", ["punctuation", "]"], " ", ["operator", "="], " ", ["function", "useState"], ["punctuation", "("], ["keyword", "true"], ["punctuation", ")"]],
      [],
      ["  ", ["keyword", "return"], " ", ["punctuation", "("]],
      ["    ", ["operator", "<"], ["type", "div"], " className", ["operator", "="], ["string", "\"app-shell\""], ["operator", ">"]],
      ["      ", ["operator", "<"], ["type", "Titlebar"], " projects", ["operator", "="], ["punctuation", "{"], "projects", ["punctuation", "}"], " ", ["operator", "/>"]],
      ["      ", ["operator", "<"], ["type", "div"], " className", ["operator", "="], ["string", "\"app-body\""], ["operator", ">"]],
      ["        ", ["operator", "<"], ["type", "IconSidebar"], " ", ["operator", "/>"]],
      ["        ", ["punctuation", "{"], "showExplorer ", ["operator", "&&"], " ", ["operator", "<"], ["type", "FileExplorer"], " ", ["operator", "/>"], ["punctuation", "}"]],
      ["        ", ["operator", "<"], ["type", "div"], " className", ["operator", "="], ["string", "\"center-panel\""], ["operator", ">"]],
      ["          ", ["operator", "<"], ["type", "EditorPanel"], " ", ["operator", "/>"]],
      ["          ", ["punctuation", "{"], "showTerminal ", ["operator", "&&"], " ", ["operator", "<"], ["type", "TerminalPanel"], " ", ["operator", "/>"], ["punctuation", "}"]],
      ["        ", ["operator", "</"], ["type", "div"], ["operator", ">"]],
      ["      ", ["operator", "</"], ["type", "div"], ["operator", ">"]],
      ["      ", ["operator", "<"], ["type", "StatusBar"], " ", ["operator", "/>"]],
      ["    ", ["operator", "</"], ["type", "div"], ["operator", ">"]],
      ["  ", ["punctuation", ")"]],
      [["punctuation", "}"]],
    ],
  },
};

const DEFAULT_CODE: { lang: string; lines: Line[] } = {
  lang: "ts",
  lines: [
    [["comment", "// Select a file from the explorer"]],
    [["comment", "// to view its contents here"]],
    [],
    [["keyword", "export"], " ", ["keyword", "default"], " ", ["keyword", "function"], " ", ["function", "handler"], ["punctuation", "()"], " ", ["punctuation", "{"]],
    ["  ", ["keyword", "return"], " ", ["punctuation", "{"], " status", ["operator", ":"], " ", ["number", "200"], " ", ["punctuation", "}"]],
    [["punctuation", "}"]],
  ],
};

function renderTokens(tokens: Token[]) {
  return tokens.map((token, i) => {
    if (Array.isArray(token)) {
      return (
        <span key={i} className={`tok-${token[0]}`}>
          {token[1]}
        </span>
      );
    }
    return <span key={i}>{token}</span>;
  });
}

interface Props {
  activeFile: string;
}

export function DemoEditor({ activeFile }: Props) {
  const content = FILE_CONTENTS[activeFile] ?? DEFAULT_CODE;
  const fileName = activeFile.split("/").pop() ?? activeFile;

  return (
    <div className="dd-editor">
      <div className="dd-editor-tabs">
        <div className="dd-editor-tab active">
          <span>{fileName}</span>
        </div>
      </div>
      <div className="dd-editor-content">
        <div className="dd-code-block">
          {content.lines.map((line, i) => (
            <div key={i}>
              <span className="dd-line-numbers">{i + 1}</span>
              {line.length === 0 ? "\n" : renderTokens(line)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
