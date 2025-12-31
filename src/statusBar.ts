import * as vscode from 'vscode';

export class StatusBarController {
	private statusBarItem: vscode.StatusBarItem | undefined;

	constructor(private readonly getEnabled: () => boolean) {}

	public ensure(context: vscode.ExtensionContext, toggleCommandId: string) {
		if (this.statusBarItem) return;
		this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
		this.statusBarItem.command = toggleCommandId;
		context.subscriptions.push(this.statusBarItem);
	}

	public render() {
		if (!this.statusBarItem) return;
		const enabled = this.getEnabled();
		this.statusBarItem.text = enabled ? '$(check) AutoAccept: ON' : '$(x) AutoAccept: OFF';
		this.statusBarItem.tooltip = enabled
			? 'Auto Agent Accept is enabled (executes configured commandIds automatically). Click to disable.'
			: 'Auto Agent Accept is disabled. Click to enable.';
		this.statusBarItem.show();
	}

	public dispose() {
		this.statusBarItem?.dispose();
		this.statusBarItem = undefined;
	}
}
