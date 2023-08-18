import { NewLabel1, NewTitle1 } from 'src/components/text';
import { BaseModalProps, Modal } from 'src/components/baseModal';
import { openExternal } from 'src/utils/urls';
import { Button, PartyIcon } from 'src/components';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import { RobotLayerDisplay } from 'src/features/robotsCommon/RobotLayerDisplay';

type Props = BaseModalProps & {
	isUsingOddVersion: boolean;
	imageName: string;
	customParts?: {
		bg?: string;
		eyes?: string;
		tubes?: string;
		body?: string;
		legs?: string;
	};
};

export const DemoRobotDoneModal = (props: Props) => {
	const { isOpen, onClose, isUsingOddVersion, imageName, customParts } = props;

	const handleOpenDiscord = () => {
		openExternal('https://discord.gg/8V95n8Y42H');
	};

	const handleBuyOnOpensea = () => {
		openExternal('https://opensea.io/collection/super-robots-by-superdao');
	};

	return (
		<Modal isOpen={isOpen} withCloseIcon onClose={onClose} className="744:w-[564px] w-full max-w-[564px] px-5">
			<div className="744:mt-[56px] 744:justify-center mt-4 flex items-center gap-2">
				<NewTitle1>Well done!</NewTitle1>
				<PartyIcon />
			</div>
			<NewLabel1 className="744:max-w-[340px] 744:text-center 744:mx-auto mt-4 max-w-[400px] font-normal opacity-70">
				Get your own personal robot and join Super Robot family!
			</NewLabel1>

			<div className="744:mt-10 744:mx-auto 744:h-[420px] 744:w-[420px] mt-6 aspect-square h-auto w-full overflow-hidden rounded-lg">
				<RobotLayerDisplay
					imageName={imageName}
					isUsingOddVersion={isUsingOddVersion}
					customParts={customParts}
					className="bg-backgroundPrimary"
				/>
			</div>

			<div className="744:gap-6 744:max-w-max 744:gap-6 744:mb-[56px] mx-auto mb-6 mt-6 flex max-w-full flex-wrap items-center gap-4">
				<GradientButton className="!w-max !rounded-lg" onClick={handleOpenDiscord}>
					<NewLabel1 className="shrink-0 font-bold">Ask for invite</NewLabel1>
				</GradientButton>
				<Button color="iconBackground" size="xxl" onClick={handleBuyOnOpensea}>
					<NewLabel1 className="font-bold">Buy on Opensea</NewLabel1>
				</Button>
			</div>
		</Modal>
	);
};
