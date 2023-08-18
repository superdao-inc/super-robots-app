import styled from '@emotion/styled';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { FC, memo, useState } from 'react';
import { Button, CircleArrowsIcon, Display2 } from 'src/components';
import { Modal } from 'src/components/baseModal';

type Props = {
	randomRobots: string[];
	reloadRandom: () => void;
	onClose: () => void;
	isLoading: boolean;
};

const gcsReadonlyRobotsBucketUrlPrefix = 'https://storage.googleapis.com/superdao-robots-assets';
const randomRobotsPreviewFolder = '/random_robots';

export const RandomRobotsModal: FC<Props> = memo(({ randomRobots, reloadRandom, isLoading, onClose }) => {
	const [selected, setSelected] = useState(0);
	const { t } = useTranslation();

	const Title = (props: { className: string }) => (
		<div className={props.className}>
			<Display2>{t('features.babyRobots.randomModalTitle')}</Display2>
			<div
				onPointerDown={!isLoading ? reloadRandom : undefined}
				className="hover:bg-overlaySecondary hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all md:flex"
			>
				<CircleArrowsIcon className={isLoading ? 'animate-spin' : undefined} />
			</div>
		</div>
	);

	return (
		<>
			<Modal
				isOpen={!!randomRobots?.length}
				withCloseIcon
				onClose={onClose}
				style={{ content: { background: 'transparent', boxShadow: 'none', width: '100%', height: '100%' } }}
			>
				<div className="flex h-full items-center">
					<div className="bg-backgroundSecondary relative m-auto flex min-h-[608px] max-w-[1200px] flex-col justify-between overflow-hidden rounded-xl p-4 md:w-[90%] md:flex-row md:p-0">
						<Title className="mb-4 mt-1 justify-between md:hidden" />
						<div className="flex flex-1 items-center">
							<img
								src={`${gcsReadonlyRobotsBucketUrlPrefix}${randomRobotsPreviewFolder}/${randomRobots[selected]}.png`}
								className="block w-full rounded-lg"
							/>
						</div>
						<div className="md:min-w-[568px] md:py-8 md:px-12">
							<Title className="mb-4 hidden justify-between md:flex" />
							<div className="-mx-2 mt-2 flex flex-wrap pb-9 md:mt-0 md:max-w-[488px]">
								{randomRobots.map((robot, i) => {
									return (
										<div key={i} className="w-1/4 cursor-pointer" onPointerDown={() => setSelected(i)}>
											<div className="p-[2px]">
												<Border selected={i === selected}>
													<div className="bg-backgroundSecondary rounded-[14px] p-[6px]">
														<img
															src={`${gcsReadonlyRobotsBucketUrlPrefix}${randomRobotsPreviewFolder}/${robot}.png`}
															className="block w-full rounded-lg"
														/>
													</div>
												</Border>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</Modal>
			<div
				className={cn('bg-backgroundSecondary fixed bottom-0 left-0 z-[100000] w-full py-4 md:hidden', {
					hidden: !randomRobots?.length
				})}
			>
				<Button
					leftIcon={<CircleArrowsIcon className={cn('mr-1', { 'animate-spin': isLoading })} />}
					className="mx-auto w-full justify-center opacity-100 transition-all"
					color="backgroundTertiary"
					size="lg"
					onClick={reloadRandom}
					label={t('features.babyRobots.generateButtonText')}
				/>
			</div>
		</>
	);
});

const Border = styled.div<{ selected: boolean }>`
	background: ${(props) =>
		props.selected ? 'linear-gradient(144.34deg, #c9ff31 2.02%, #8fff00 94.22%)' : 'rgba(0, 0, 0, 0)'};
	border-radius: 16px;
	padding: 2px;

	${(props) => {
		if (!props.selected) {
			return '&:hover { background: linear-gradient(144.34deg, rgba(201, 255, 49, 0.4) 2.02%, rgba(143, 255, 0, 0.4) 94.22%);}';
		}
	}}
`;

RandomRobotsModal.displayName = 'RandomRobotsModal';
