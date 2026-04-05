# Git Integration

DAEMON includes a complete visual git interface powered by simple-git. Every common git operation is available without opening a separate terminal.

## Visual Git Panel

Access the git panel from the left sidebar (G icon) or with the Command Drawer (`Ctrl+K`). The panel shows:

- **Current branch** with branch switcher
- **Changed files** with diff previews
- **Staged files** ready for commit
- **Stash list** with apply/drop controls

## Operations

### Branching

- Create new branches from the current HEAD or any ref
- Switch between branches with a single click
- Delete local branches
- View branch history

### Staging & Committing

- Stage individual files or all changes
- Unstage files from the staging area
- Write commit messages with a built-in editor
- Amend the last commit

### Pushing & Pulling

- Push to remote with tracking
- Pull with rebase or merge
- Fetch from all remotes
- View push/pull status in the status bar

### Stashing

- Stash working changes with an optional message
- Apply or pop stashes from the stash list
- Drop individual stashes

### Tagging

- Create lightweight or annotated tags
- Push tags to remote
- View tag list

## Status Bar

The bottom status bar always shows:

- Current branch name
- Ahead/behind count relative to the remote
- Sync status indicator

## Keyboard Shortcuts

All git operations are also available through the Command Palette (`Ctrl+Shift+P`) by typing "git".
