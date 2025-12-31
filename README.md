# Auto Agent Accept (VS Code Extension)

This extension helps you **auto-run specific VS Code commands** while enabled.

> Note: VS Code intentionally limits extensions from directly clicking other extensions' UI buttons. The practical workaround is to trigger the underlying VS Code command (if one exists).

## Features

- Status bar toggle: **AutoAccept: ON/OFF**
- Commands:
  - `Auto Agent Accept: Toggle`
  - `Auto Agent Accept: Enable`
  - `Auto Agent Accept: Disable`
  - `Auto Agent Accept: Test Candidate Command Once`

## Settings

- `autoAgentAccept.enabled` (boolean)
- `autoAgentAccept.intervalMs` (number, default 250, min 50)
- `autoAgentAccept.showNotifications` (boolean)
- `autoAgentAccept.commandIds` (string[]) — command IDs to execute while enabled

### Targeting your buttons (Continue / Accept / Allow)

Those buttons may come from different VS Code UI surfaces:

- **Modal dialog**: may work with commands like `workbench.action.acceptModalDialog`.
- **Other UI (notifications / chat / inline tools)**: may require different command IDs.

To find what works in your VS Code build:

1. When the **Allow** button is visible, run: `Auto Agent Accept: Test Candidate Command Once` and try likely candidates
2. Once you find the correct command ID, put it into `autoAgentAccept.commandIds`
3. Enable auto-accept and test again

In many Copilot Chat tool-approval prompts, the **Allow** button maps to `workbench.action.chat.acceptTool`.

## Build & Install (local)

Prereqs:
- Node.js LTS
- VS Code

```bash
npm install
npm run compile
npm i -g @vscode/vsce
vsce package
```

Then install the generated `.vsix`:
- VS Code → Extensions → "..." menu → **Install from VSIX...**
