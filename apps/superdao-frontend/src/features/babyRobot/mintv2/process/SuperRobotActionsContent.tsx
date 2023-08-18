import { useRouter } from 'next/router';
import { Button, NewLabel1 } from 'src/components';
import { ActionsProps } from 'src/features/babyRobot/mintv2/process/types';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import { openExternal } from 'src/utils/urls';
import { Arrow } from 'src/components/assets/icons/arrow';
import { useSwitch } from 'src/hooks';
import { GetRobotHintModal } from './GetRobotHintModal';

export const SuperRobotActionContent = (props: ActionsProps) => {
	const {
		isAuthorized,

		isLoading,
		isChecking,

		isInviteFlowOn
	} = props;

	const { push } = useRouter();

	const [isHintModalOpen, { on, off }] = useSwitch(false);

	const handleBuyOnOpensea = () => {
		openExternal('https://opensea.io/collection/super-robots-by-superdao');
	};

	const handleRedirectToRobots = () => {
		push('/robots');
	};

	// loading case response
	const isLoadingCase = isLoading || isChecking;

	if (isLoadingCase) {
		return (
			<div className="744:mt-8 744:w-[375px] mx-auto mt-6 flex h-[56px] w-[280px] animate-pulse items-center justify-center rounded-lg bg-[#2C2E33] px-6"></div>
		);
	}

	// not authorized case response
	if (!isAuthorized) {
		return (
			<div className="744:mt-8 744:max-w-max 744:gap-6 744:items-center mx-auto mt-6 flex max-w-[240px] flex-wrap justify-center gap-3">
				<GradientButton onClick={on} className="!w-max !rounded-lg">
					<NewLabel1 className="font-bold">{isInviteFlowOn ? 'Get a Robot' : 'Notify me'}</NewLabel1>
				</GradientButton>

				<Button color="iconBackground" size="xxl" onClick={handleBuyOnOpensea}>
					<NewLabel1 className="font-bold">Buy on Opensea</NewLabel1>
				</Button>

				<GetRobotHintModal isOpen={isHintModalOpen} onClose={off} isInviteFlowOn={!!isInviteFlowOn} />
			</div>
		);
	}

	return (
		<div className="744:mt-8 744:max-w-max 744:gap-6 744:items-center mx-auto mt-6 flex max-w-[240px] flex-wrap justify-center gap-3">
			<GradientButton onClick={handleRedirectToRobots} className="max-w-max !rounded-lg">
				<>
					<NewLabel1 className="shrink-0 font-bold">Open app</NewLabel1>
					<Arrow />
				</>
			</GradientButton>
			<Button color="iconBackground" size="xxl" onClick={handleBuyOnOpensea}>
				<NewLabel1 className="font-bold">Buy on Opensea</NewLabel1>
			</Button>
		</div>
	);
};
