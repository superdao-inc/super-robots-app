import { CopyIcon, DoneIcon, GiftUpdatedIcon, NewLabel1, NewTitle1, toast } from 'src/components';
import { InvitedUsers } from './InvitedUsers';

type Props = { code: string; remainingCodeActivations: number; maxCodeActivations: number };

export const InvitationsCode = (props: Props) => {
	const { code, remainingCodeActivations, maxCodeActivations } = props;

	const codeLink = `https://robot.superdao.co/invite/${code}`;

	const handleCopyCode = () => {
		navigator.clipboard.writeText(codeLink);
		toast.success('Code copied to clipboard');
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="m-auto h-max w-max py-[62px] px-5">
				<GiftUpdatedIcon className="mx-auto" />
				<NewTitle1 className="1280:text-[32px] 1280:max-w-[650px] 1280:leading-10 744:max-w-max mx-auto mt-6 max-w-[290px] text-center text-2xl">
					Invite 5 friends and unlock <br />
					<span className="inline-block -rotate-1 rounded-[1px] bg-[#6153CC] px-1">
						<span className="inline-block rotate-1">Robot</span>
					</span>{' '}
					<span className="-ml-2 inline-block -rotate-1 rounded-[1px] bg-[#6153CC] px-1">
						<span className="inline-block rotate-1">customization</span>
					</span>{' '}
					<br />
					and publishsing as NFT for 1 time
				</NewTitle1>
				<div className="744:w-[484px] 744:mt-8 mx-auto mt-6 w-[280px]">
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

				<div className="744:w-[484px] mx-auto w-[280px]">
					<NewLabel1 className="mt-10 font-bold">Your invite link</NewLabel1>
					<div className="mt-4 rounded-3xl border border-[#00B669]/[.06] bg-[rgba(0,182,105,0.04)] p-8">
						<NewLabel1 className="w-full break-words font-normal">{codeLink}</NewLabel1>
						<div className="744:gap-6 mt-6 flex flex-wrap items-center gap-0">
							<div
								onClick={handleCopyCode}
								className="translate-all flex w-max cursor-pointer items-center gap-2 rounded-lg bg-[#00B669] px-4 py-2 duration-100 hover:bg-[#00B669]/[.9] active:bg-[#00B669]/[.8]"
							>
								<CopyIcon fill="white" className="opacity-[55%]" width={24} height={24} />
								<NewLabel1 className="font-bold">Copy</NewLabel1>
							</div>
							<NewLabel1 className="744:w-max 744:mt-0 mt-4 w-full font-bold text-[#00B669]">
								{remainingCodeActivations} available
							</NewLabel1>
							{remainingCodeActivations < maxCodeActivations && (
								<div className="744:w-max 744:mt-0 mt-4 flex w-full items-center justify-center gap-2">
									<DoneIcon fill="#FC7900" width={24} height={24} />
									<NewLabel1 className="744:w-max w-full font-bold text-[#FC7900]">
										{maxCodeActivations - remainingCodeActivations} minted
									</NewLabel1>
								</div>
							)}
						</div>
					</div>
					<InvitedUsers />
				</div>
			</div>
		</div>
	);
};
