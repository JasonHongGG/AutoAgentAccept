import * as vscode from 'vscode';

import { getEnabled, getShowNotifications, getCommandIds, getIntervalMs } from './config';
import { AutoCommandLoop } from './loop';
import { StatusBarController } from './statusBar';
import { registerCommands } from './commands';

const loop = new AutoCommandLoop(getCommandIds, getIntervalMs);
const statusBar = new StatusBarController(getEnabled);

async function applyEnabledState(showToast: boolean) {
	const enabled = getEnabled();
	if (enabled) {
		loop.start();
		if (showToast && getShowNotifications()) {
			void vscode.window.showInformationMessage('Auto Agent Accept: enabled');
		}
	} else {
		loop.stop();
		if (showToast && getShowNotifications()) {
			void vscode.window.showInformationMessage('Auto Agent Accept: disabled');
		}
	}
	statusBar.render();
}

export function activate(context: vscode.ExtensionContext) {
	statusBar.ensure(context, 'autoAgentAccept.toggle');
	statusBar.render();

	registerCommands(context, applyEnabledState);

	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(async (e) => {
			if (e.affectsConfiguration('autoAgentAccept')) {
				await applyEnabledState(false);
			}
		})
	);

	// Apply initial state after startup.
	void applyEnabledState(false);
}

export function deactivate() {
	loop.stop();
	statusBar.dispose();
}
