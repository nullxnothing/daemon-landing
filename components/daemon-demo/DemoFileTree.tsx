"use client";

import { useState, useCallback } from "react";
import { ChevronRight, FileCode2, FileJson, FileText, Folder } from "lucide-react";

interface TreeNode {
  name: string;
  path: string;
  children?: TreeNode[];
  icon?: "ts" | "json" | "md" | "css" | "toml";
}

const FILE_TREE: TreeNode[] = [
  {
    name: "src",
    path: "src",
    children: [
      { name: "App.tsx", path: "src/App.tsx", icon: "ts" },
      { name: "App.css", path: "src/App.css", icon: "css" },
      {
        name: "panels",
        path: "src/panels",
        children: [
          { name: "Editor.tsx", path: "src/panels/Editor.tsx", icon: "ts" },
          { name: "Terminal.tsx", path: "src/panels/Terminal.tsx", icon: "ts" },
          { name: "Wallet.tsx", path: "src/panels/Wallet.tsx", icon: "ts" },
          { name: "Settings.tsx", path: "src/panels/Settings.tsx", icon: "ts" },
        ],
      },
      {
        name: "store",
        path: "src/store",
        children: [
          { name: "ui.ts", path: "src/store/ui.ts", icon: "ts" },
          { name: "wallet.ts", path: "src/store/wallet.ts", icon: "ts" },
        ],
      },
      {
        name: "hooks",
        path: "src/hooks",
        children: [
          { name: "useProjects.ts", path: "src/hooks/useProjects.ts", icon: "ts" },
        ],
      },
    ],
  },
  {
    name: "electron",
    path: "electron",
    children: [
      { name: "main.ts", path: "electron/main.ts", icon: "ts" },
      { name: "preload.ts", path: "electron/preload.ts", icon: "ts" },
      {
        name: "ipc",
        path: "electron/ipc",
        children: [
          { name: "terminal.ts", path: "electron/ipc/terminal.ts", icon: "ts" },
          { name: "wallet.ts", path: "electron/ipc/wallet.ts", icon: "ts" },
        ],
      },
    ],
  },
  {
    name: "programs",
    path: "programs",
    children: [
      { name: "lib.rs", path: "programs/lib.rs", icon: "ts" },
      { name: "Cargo.toml", path: "programs/Cargo.toml", icon: "toml" },
    ],
  },
  { name: "package.json", path: "package.json", icon: "json" },
  { name: "tsconfig.json", path: "tsconfig.json", icon: "json" },
  { name: "README.md", path: "README.md", icon: "md" },
];

function getFileIcon(icon?: string) {
  switch (icon) {
    case "ts":
      return <FileCode2 size={14} className="dd-tree-icon" style={{ color: "#60a5fa" }} />;
    case "json":
      return <FileJson size={14} className="dd-tree-icon" style={{ color: "#f0b429" }} />;
    case "md":
      return <FileText size={14} className="dd-tree-icon" style={{ color: "#a0a0a0" }} />;
    case "css":
      return <FileCode2 size={14} className="dd-tree-icon" style={{ color: "#c792ea" }} />;
    case "toml":
      return <FileText size={14} className="dd-tree-icon" style={{ color: "#f78c6c" }} />;
    default:
      return <FileCode2 size={14} className="dd-tree-icon" style={{ color: "#a0a0a0" }} />;
  }
}

interface Props {
  activeFile: string;
  onSelectFile: (path: string) => void;
}

function TreeItem({
  node,
  depth,
  activeFile,
  onSelectFile,
  defaultOpen,
}: {
  node: TreeNode;
  depth: number;
  activeFile: string;
  onSelectFile: (path: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? depth < 1);
  const isFolder = !!node.children;

  const handleClick = useCallback(() => {
    if (isFolder) {
      setOpen((p) => !p);
    } else {
      onSelectFile(node.path);
    }
  }, [isFolder, node.path, onSelectFile]);

  return (
    <>
      <div
        className={`dd-tree-item ${isFolder ? "folder" : ""} ${activeFile === node.path ? "active" : ""}`}
        style={{ paddingLeft: 8 + depth * 12 }}
        onClick={handleClick}
      >
        {isFolder ? (
          <ChevronRight
            size={12}
            className={`dd-tree-chevron ${open ? "open" : ""}`}
          />
        ) : (
          <span style={{ width: 12 }} />
        )}
        {isFolder ? (
          <Folder size={14} className="dd-tree-icon" style={{ color: "#f0b429" }} />
        ) : (
          getFileIcon(node.icon)
        )}
        <span>{node.name}</span>
      </div>
      {isFolder && open && (
        <div className="dd-tree-children">
          {node.children!.map((child) => (
            <TreeItem
              key={child.path}
              node={child}
              depth={depth + 1}
              activeFile={activeFile}
              onSelectFile={onSelectFile}
              defaultOpen={depth < 0}
            />
          ))}
        </div>
      )}
    </>
  );
}

export function DemoFileTree({ activeFile, onSelectFile }: Props) {
  return (
    <div className="dd-file-tree">
      {FILE_TREE.map((node) => (
        <TreeItem
          key={node.path}
          node={node}
          depth={0}
          activeFile={activeFile}
          onSelectFile={onSelectFile}
          defaultOpen
        />
      ))}
    </div>
  );
}
