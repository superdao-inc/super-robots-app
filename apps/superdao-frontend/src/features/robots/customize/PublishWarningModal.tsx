import { useRouter } from 'next/router';
import cn from 'classnames';

import { NewLabel1, Title1, Title3 } from 'src/components';
import { BaseModalProps, Modal } from 'src/components/baseModal';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import { RobotWardrobeImage } from './RobotWardrobeImage';
import { ROBOT_PARTS_URL, getCurrentPartsVersion } from '@sd/superdao-shared';
import { customizeCustomElements } from './constants.custom';

type Props = BaseModalProps & {
	onPublish: () => void;
	selectionContainsUserElemsData: {
		id: string;
		customItem: {
			layerName: string;
			layerType: string;
		};
	}[];
	isUsingOddVersion: boolean;
	availableCustomizeActivationsCount: number;
};

export const PublishWarningModal = (props: Props) => {
	const {
		isOpen,
		onClose,
		onPublish: handlePublish,
		selectionContainsUserElemsData,
		isUsingOddVersion,
		availableCustomizeActivationsCount
	} = props;

	const { query } = useRouter();
	const { tokenId } = query;

	return (
		<Modal isOpen={isOpen} withCloseIcon onClose={onClose} className="w-full max-w-[520px] p-10">
			<Title1 className="font-black">This item will be transferred to Robot&apos;s inventory</Title1>
			<div className="mt-4 flex flex-wrap gap-2">
				{selectionContainsUserElemsData.map((elem) => {
					const configItem = customizeCustomElements.find((item) => item.index === elem.customItem.layerName);
					if (!configItem) return null;

					const isBg = elem.customItem.layerType === 'BG';

					const robotPartsPrefix = `${ROBOT_PARTS_URL}/${
						configItem.hasPreview ? 'preview-' : ''
					}${getCurrentPartsVersion(isUsingOddVersion)}`;

					return (
						<div className="flex w-full items-center justify-start gap-4" key={elem.id}>
							<div className="flex w-max items-center gap-4">
								<div
									className={cn(
										'flex h-[64px] w-[64px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[.06] bg-white/[.04]',
										{ 'p-2': !isBg }
									)}
								>
									<RobotWardrobeImage src={`${robotPartsPrefix}/${configItem.index}.png`} />
								</div>
							</div>
							<Title3 className="w-full truncate text-base">{configItem.name}</Title3>
						</div>
					);
				})}
			</div>
			<ol className="mt-6 ml-[30px] w-[calc(100%-30px)] list-decimal text-white">
				<li>
					<NewLabel1 className="inline">
						You will spend 1 of the available {availableCustomizeActivationsCount} publications
					</NewLabel1>
				</li>
				<li>
					<NewLabel1 className="inline">You will be able to put it on this Robot and take it off</NewLabel1>
				</li>
				<li>
					<NewLabel1 className="inline">You won&apos;t be able to apply it to another Robot</NewLabel1>
				</li>
				<li>
					<NewLabel1 className="inline">It will stay in the #{tokenId} Robot&apos;s inventory forever</NewLabel1>
				</li>
			</ol>
			<GradientButton className="mt-8 max-w-max !rounded-lg" onClick={handlePublish}>
				<NewLabel1 className="font-bold">Publish anyway</NewLabel1>
			</GradientButton>
		</Modal>
	);
};
