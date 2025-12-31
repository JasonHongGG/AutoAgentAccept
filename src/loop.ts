import * as vscode from 'vscode';

export type GetCommandIds = () => string[];
export type GetIntervalMs = () => number;

export class AutoCommandLoop {
	private intervalHandle: NodeJS.Timeout | undefined;

	constructor(
		private readonly getCommandIds: GetCommandIds,
		private readonly getIntervalMs: GetIntervalMs
	) {}

	public start() {
		this.stop();
		const intervalMs = this.getIntervalMs();
		this.intervalHandle = setInterval(() => {
			for (const commandId of this.getCommandIds()) {
				void vscode.commands.executeCommand(commandId);
			}
		}, intervalMs);
	}

	public stop() {
		if (this.intervalHandle) {
			clearInterval(this.intervalHandle);
			this.intervalHandle = undefined;
		}
	}

	public isRunning(): boolean {
		return this.intervalHandle !== undefined;
	}
}
