export const runTimer = (deadline: number, callback: (time: string, end: boolean) => void): (() => void) => {
	let timer: ReturnType<typeof setInterval>;
	let totalSeconds = Math.floor((deadline - Date.now()) / 1000);

	const run = (): boolean => {
		totalSeconds -= 1;

		if (totalSeconds <= 0) {
			clearTimeout(timer);
			callback(`00:00`, true);
			return true;
		}

		const seconds = Math.floor(totalSeconds % 60);
		const minutes = Math.floor((totalSeconds / 60) % 60);
		const secondsStr = seconds < 10 ? '0' + seconds : seconds;
		const minutesStr = minutes < 10 ? '0' + minutes : minutes;

		callback(`${minutesStr}:${secondsStr}`, false);
		return false;
	};

	const end = run();
	if (!end) timer = setInterval(run, 1000);

	return () => clearTimeout(timer);
};
