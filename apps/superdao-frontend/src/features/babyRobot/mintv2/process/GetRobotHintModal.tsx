import { NewLabel1, NewTitle1 } from 'src/components/text';
import { BaseModalProps, Modal } from 'src/components/baseModal';
import { openExternal } from 'src/utils/urls';
import { DiscordIcon, TwitterIcon } from 'src/components';

type Props = BaseModalProps & {
	isInviteFlowOn: boolean;
};

export const GetRobotHintModal = (props: Props) => {
	const { isOpen, onClose, isInviteFlowOn } = props;

	const handleOpenDiscord = () => {
		openExternal('https://discord.gg/8V95n8Y42H');
	};

	const handleOpenTwitter = () => {
		openExternal('https://twitter.com/robots_xyz');
	};

	return (
		<Modal isOpen={isOpen} withCloseIcon onClose={onClose} className="744:w-[564px] 744:!p-10 px-5 pt-6 pb-8">
			<NewTitle1 className="744:max-w-max max-w-[240px]">
				{isInviteFlowOn ? 'Get an invite' : 'Access via invites soon'}
			</NewTitle1>
			<NewLabel1 className="744:max-w-max 744:mt-6 mt-4 font-normal opacity-70">
				{isInviteFlowOn
					? 'Mint waves are over and you can get your robot only by an invite. You can go to our discord and ask for it from members with inviter role or you can follow our twitter, since we sometimes drop limited invite links'
					: 'We will soon introduce invite links, you will be able to ask for them in our discord or catch a drop of invites in our twitter. Join and follow now'}
			</NewLabel1>

			<div className="744:gap-6 744:mt-10 mt-8 flex flex-wrap gap-4">
				<div
					className="items-cetner flex w-max shrink-0 cursor-pointer justify-center gap-3 rounded-lg bg-[#8C9EFF]/[.15] py-4 px-6 transition-all duration-100 hover:bg-[#8C9EFF]/[.12] active:bg-[#8C9EFF]/[.1]"
					onClick={handleOpenDiscord}
				>
					<DiscordIcon width={24} height={24} fill="#889AF8" />
					<NewLabel1 className="font-bold">Join Discord</NewLabel1>
				</div>
				<div
					className="items-cetner flex w-max shrink-0 cursor-pointer justify-center gap-3 rounded-lg bg-[#1DA1F2]/[.15] py-4 px-6 transition-all duration-100 hover:bg-[#1DA1F2]/[.12] active:bg-[#1DA1F2]/[.1]"
					onClick={handleOpenTwitter}
				>
					<TwitterIcon width={24} height={24} fill="#1DA1F2" />
					<NewLabel1 className="font-bold">Follow Twitter</NewLabel1>
				</div>
			</div>
		</Modal>
	);
};
