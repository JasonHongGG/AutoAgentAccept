export function isCandidateCommandId(commandId: string): boolean {
	const hay = commandId.toLowerCase();
	return (
		hay.includes('accept') ||
		hay.includes('approve') ||
		hay.includes('allow') ||
		hay.includes('continue') ||
		hay.includes('tool') ||
		hay.includes('terminal') ||
		hay.includes('modal') ||
		hay.includes('dialog') ||
		hay.includes('notification') ||
		hay.includes('inlinechat') ||
		hay.includes('chat')
	);
}
