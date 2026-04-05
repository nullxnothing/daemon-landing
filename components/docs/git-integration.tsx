import { DocHeading, DocSubheading, H2, H3, Paragraph, List } from "./primitives";

export function GitIntegrationDoc() {
  return (
    <>
      <DocHeading>Git Integration</DocHeading>
      <DocSubheading>
        Complete visual git interface powered by simple-git. Branch, commit, push — all without a separate terminal.
      </DocSubheading>

      <H2 id="git-panel">Visual Git Panel</H2>
      <Paragraph>
        Access the git panel from the left sidebar (G icon) or with the Command Drawer (Ctrl+K).
        The panel shows the current branch, changed files with diff previews, staged files, and
        the stash list.
      </Paragraph>

      <H2 id="branching">Branching</H2>
      <List
        items={[
          "Create new branches from the current HEAD or any ref",
          "Switch between branches with a single click",
          "Delete local branches",
          "View branch history",
        ]}
      />

      <H2 id="staging">Staging & Committing</H2>
      <List
        items={[
          "Stage individual files or all changes",
          "Unstage files from the staging area",
          "Write commit messages with a built-in editor",
          "Amend the last commit",
        ]}
      />

      <H2 id="push-pull">Pushing & Pulling</H2>
      <List
        items={[
          "Push to remote with tracking",
          "Pull with rebase or merge",
          "Fetch from all remotes",
          "View push/pull status in the status bar",
        ]}
      />

      <H2 id="stashing">Stashing</H2>
      <List
        items={[
          "Stash working changes with an optional message",
          "Apply or pop stashes from the stash list",
          "Drop individual stashes",
        ]}
      />

      <H2 id="tagging">Tagging</H2>
      <List
        items={[
          "Create lightweight or annotated tags",
          "Push tags to remote",
          "View tag list",
        ]}
      />

      <H2 id="status-bar">Status Bar</H2>
      <Paragraph>
        The bottom status bar always shows the current branch name, ahead/behind count relative to
        the remote, and sync status. All git operations are also available through the Command
        Palette (Ctrl+Shift+P).
      </Paragraph>
    </>
  );
}
