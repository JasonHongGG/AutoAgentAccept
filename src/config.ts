import * as vscode from 'vscode';

const SECTION = 'autoAgentAccept';

export function getConfig() {
	return vscode.workspace.getConfiguration(SECTION);
}

export function getCommandIds(): string[] {
	const defaultIds = ['workbench.action.chat.acceptTool'];
	const ids = getConfig().get<string[]>('commandIds', defaultIds);
	if (!Array.isArray(ids)) return defaultIds;
	const sanitized = ids
		.map((s) => (typeof s === 'string' ? s.trim() : ''))
		.filter((s) => s.length > 0);
	return sanitized.length > 0 ? sanitized : defaultIds;
}

export function getEnabled(): boolean {
	return getConfig().get<boolean>('enabled', false);
}

export function getIntervalMs(): number {
	const raw = getConfig().get<number>('intervalMs', 250);
	if (!Number.isFinite(raw)) return 250;
	return Math.max(50, Math.floor(raw));
}

export function getShowNotifications(): boolean {
	return getConfig().get<boolean>('showNotifications', true);
}

export async function setEnabled(value: boolean) {
	await getConfig().update('enabled', value, vscode.ConfigurationTarget.Global);
}

export async function setCommandIds(ids: string[]) {
	await getConfig().update('commandIds', ids, vscode.ConfigurationTarget.Global);
}
