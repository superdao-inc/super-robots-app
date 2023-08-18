import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { getRandomIntFromInterval } from '@sd/superdao-shared';
import { ModalText, ModalTitle } from 'src/components';
import { Modal } from 'src/components/baseModal';

// const getRobotImageUrl = (randomIndex: string) => {
// 	return `https://storage.googleapis.com/superdao-robots-assets/random_robots/${randomIndex}.png`;
// };

export const BabyRobotIsMintingModal: React.FC<{ isOpen: boolean }> = (props) => {
	const { isOpen } = props;

	const { t } = useTranslation();

	const [addon, setAddon] = useState('...');
	const [_index, setIndex] = useState(1);

	useEffect(() => {
		const addonInterval = setInterval(() => {
			setAddon((addon) => {
				if (addon.length) {
					return addon.slice(1);
				} else {
					return '...';
				}
			});
		}, 150);

		const indexInterval = setInterval(() => {
			setIndex((index) => {
				let newIndex = getRandomIntFromInterval(1, 100);

				while (newIndex === index) {
					newIndex = getRandomIntFromInterval(1, 100);
				}

				return newIndex;
			});
		}, 500);

		return () => {
			clearInterval(addonInterval);
			clearInterval(indexInterval);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal isOpen={isOpen} className="960:w-[500px] 960:rounded-3xl rounded-t-3xl">
			<div className="960:min-h-[500px] relative h-auto w-full">
				<img className="relative h-full w-full" src="robot-generating.png" />
				{/* <video className="relative h-full w-full object-cover mix-blend-screen" autoPlay loop muted playsInline>
					<source src="/video/robot-animation.mp4" type="video/mp4" />
				</video> */}
			</div>
			<div className="order-1 mb-6 mt-8 sm:order-2 sm:mb-0">
				<ModalTitle className="mx-auto text-center">{t('features.robotMintV2.modal.title')}</ModalTitle>
				<ModalText className="mx-auto mb-8 mt-2 w-[300px] text-center text-base leading-6">
					<>
						May take a little time
						<span className="inline-block min-w-[15px] text-start">{addon}</span>
					</>
				</ModalText>
			</div>
		</Modal>
	);
};
