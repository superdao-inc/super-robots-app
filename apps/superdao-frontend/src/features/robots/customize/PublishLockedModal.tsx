import { useRouter } from 'next/router';
import { NewLabel1, NewTitle1 } from 'src/components';
import { BaseModalProps, Modal } from 'src/components/baseModal';
import { GradientButton } from 'src/features/auth/components/gradientButton';

type Props = BaseModalProps & {};

export const PublishLockedModal = (props: Props) => {
	const { isOpen, onClose } = props;

	const { push } = useRouter();

	const handleRedirectToInvite = () => {
		push('/invite');
	};

	return (
		<Modal isOpen={isOpen} withCloseIcon onClose={onClose} className="744:min-w-[564px] 744:p-10 p-8">
			<NewTitle1 className="1280:max-w-[564px] 744:max-w-max 744:block mx-auto mt-6 hidden max-w-[280px] text-center text-[32px] leading-10">
				Invite 5 friends and unlock <br />
				<span className="ml-2 inline-block -rotate-1 rounded-[1px] bg-[#6153CC] px-1">
					<span className="inline-block rotate-1">Robot</span>
				</span>{' '}
				<span className="-ml-2 inline-block -rotate-1 rounded-[1px] bg-[#6153CC] px-1">
					<span className="inline-block rotate-1">publishing as NFT</span>
				</span>
			</NewTitle1>
			<NewTitle1 className="744:hidden max-w-[240px] text-2xl">
				Invite 5 friends and unlock
				<br />
				<span className="z-1 relative inline-block -rotate-1 rounded-[1px] bg-[#6153CC] pl-1">
					<span className="inline-block rotate-1">Rob</span>
				</span>{' '}
				<span className="relative z-0 -ml-[5px] inline-block -rotate-1 rounded-[1px] bg-[#6153CC] pr-1">
					<span className="inline-block rotate-1">ot publishing</span>
				</span>
				<br />
				as NFT
			</NewTitle1>
			<div className="744:mt-8 mt-6">
				<div className="mb-1 flex max-w-[430px] gap-4">
					<div className="flex flex-col items-center gap-1">
						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[.04]">
							<NewLabel1 className="font-bold opacity-70">1</NewLabel1>
						</div>
						<div className="w-[2px] flex-grow rounded-full bg-white/[.04]"></div>
					</div>
					<NewLabel1 className="mb-5 mt-1 font-bold">Share the invite link with 5 friends</NewLabel1>
				</div>
				<div className="mb-1 flex max-w-[430px] gap-4">
					<div className="flex flex-col items-center gap-1">
						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[.04]">
							<NewLabel1 className="font-bold opacity-70">2</NewLabel1>
						</div>
						<div className="w-[2px] flex-grow rounded-full bg-white/[.04]"></div>
					</div>
					<NewLabel1 className="mb-5 mt-1 font-bold">Make sure they minted the Robot with your link</NewLabel1>
				</div>
				<div className="flex max-w-[430px] gap-4">
					<div className="flex flex-col items-center gap-1">
						<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[.04]">
							<NewLabel1 className="font-bold opacity-70">3</NewLabel1>
						</div>
					</div>
					<NewLabel1 className="mt-1 font-bold">Unlock Robot customization</NewLabel1>
				</div>
			</div>
			<GradientButton className="mt-8 max-w-max !rounded-lg" onClick={handleRedirectToInvite}>
				<NewLabel1 className="font-bold">Go to invites</NewLabel1>
			</GradientButton>
		</Modal>
	);
};
