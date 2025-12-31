import * as vscode from 'vscode';

import { getEnabled, setEnabled, getShowNotifications } from './config';
import { isCandidateCommandId } from './commandDiscovery';

export type ApplyEnabledState = (showToast: boolean) => Promise<void>;

export function registerCommands(context: vscode.ExtensionContext, applyEnabledState: ApplyEnabledState) {
	context.subscriptions.push(
		vscode.commands.registerCommand('autoAgentAccept.toggle', async () => {
			await setEnabled(!getEnabled());
			await applyEnabledState(true);
		}),
		vscode.commands.registerCommand('autoAgentAccept.enable', async () => {
			if (!getEnabled()) await setEnabled(true);
			await applyEnabledState(true);
		}),
		vscode.commands.registerCommand('autoAgentAccept.disable', async () => {
			if (getEnabled()) await setEnabled(false);
			await applyEnabledState(true);
		}),
		vscode.commands.registerCommand('autoAgentAccept.testCommandOnce', async () => {
			await testCommandOnce();
		})
	);
}

async function testCommandOnce() {
	const all = await vscode.commands.getCommands(true);
	const candidates = all.filter(isCandidateCommandId).sort((a, b) => a.localeCompare(b));

	const picked = await vscode.window.showQuickPick(candidates, {
		placeHolder: 'Pick a command ID to execute once (use while the Allow button is visible)',
		matchOnDescription: false,
		matchOnDetail: false,
	});
	if (!picked) return;

	try {
		await vscode.commands.executeCommand(picked);
		if (getShowNotifications()) {
			void vscode.window.showInformationMessage(`Executed: ${picked}`);
		}
	} catch (err) {
		console.error(err);
		void vscode.window.showWarningMessage(`Failed to execute: ${picked}`);
	}
}
