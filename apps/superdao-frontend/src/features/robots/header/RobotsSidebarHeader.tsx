import { useRouter } from 'next/router';
import { RobotsSidebarHeaderBurger } from './RobotsSidebarHeaderBurger';

type Props = {
	isCodeFlowAvailable: boolean;
	remainingCodeActivations: number;
};

export const RobotsSidebarHeader = ({ isCodeFlowAvailable, remainingCodeActivations }: Props) => {
	const { push, pathname } = useRouter();

	const handleRedirectToMint = () => {
		if (pathname === '/') {
			location.reload();
			return;
		}

		push('/');
	};

	return (
		<div className="flex h-[56px] w-full items-center justify-between border-b border-white/[.06] px-6">
			<img className="cursor-pointer" onClick={handleRedirectToMint} src="/robot-logo.png" width={185} height={24} />

			<div>
				<RobotsSidebarHeaderBurger
					withDemo
					isCodeFlowAvailable={isCodeFlowAvailable}
					remainingCodeActivations={remainingCodeActivations}
				/>
			</div>
		</div>
	);
};
