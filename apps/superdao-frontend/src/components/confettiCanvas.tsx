import { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import confetti from 'canvas-confetti';

const duration = 2 * 1000;
const defaults = {
	startVelocity: 40,
	spread: 360,
	ticks: 400,
	zIndex: 0,
	gravity: 0.6,
	colors: [
		'#FF21FBD9',
		'#9AF5FCE5',
		'#F62584',
		'#DCBCFAE5',
		'#03A3F5A6',
		'#FFED36E5',
		'#480CA7A6',
		'#C9FCBEE5',
		'#FC9E1CE5'
	]
};

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

type Props = {
	position?: string;
};

export const ConfettiCanvas = (props: Props) => {
	const { position } = props;

	const [show, setShow] = useState(true);
	const confettiRef = useCallback((node: HTMLCanvasElement) => {
		if (!node) {
			return;
		}

		const myConfetti = confetti.create(node, {
			resize: true,
			useWorker: true
		});

		const animationEnd = Date.now() + duration;

		const intervalId: any = setInterval(() => {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				setTimeout(() => setShow(false), 5000);
				return clearInterval(intervalId);
			}

			const particleCount = 70 * (timeLeft / duration);

			// since particles fall down, start a bit higher than random
			myConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
			myConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });

			return undefined;
		}, 250);
	}, []);

	if (!show || typeof document === 'undefined') {
		return null;
	}

	return ReactDOM.createPortal(
		<canvas
			ref={confettiRef}
			style={{
				width: '100vw',
				height: '100vh',
				position: (position as any) ?? 'absolute',
				top: 0,
				left: 0,
				zIndex: 1,
				pointerEvents: 'none'
			}}
		/>,
		document.body
	);
};
