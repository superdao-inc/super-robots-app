import { hrtime } from 'node:process';

const NS_PER_SEC = 1e9;

function formatDiff(time: ReturnType<typeof hrtime>) {
	return Math.trunc((time[0] * NS_PER_SEC + time[1]) / 1e6);
}

export function measure(): () => number {
	let prev = hrtime();

	const stop = () => {
		const diff = hrtime(prev);

		prev = hrtime();

		return formatDiff(diff);
	};

	return stop;
}
