import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { NewLabel1, NewTitle1, OkIcon, RaiseHandsIcon, toast } from 'src/components';
import { OkSuccessIcon } from 'src/components/assets/icons/okSuccess';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import { useAddActivationsToUserCodeMutation, useGetCanUserRefillCodeQuery } from 'src/gql/userCodes.generated';
import { InvitedUsers } from './InvitedUsers';

type Props = { maxCodeActivations: number };

export const InvitationsCodeActivated = (props: Props) => {
	const { maxCodeActivations } = props;

	const queryClient = useQueryClient();

	const [isRefilling, setIsRefilling] = useState(false);

	const { data: canUserRefillCode } = useGetCanUserRefillCodeQuery({}, { select: (data) => data.getCanUserRefillCode });

	const { mutate } = useAddActivationsToUserCodeMutation();

	const handleRequestInvites = () => {
		if (isRefilling) return;

		setIsRefilling(true);

		mutate(
			{},
			{
				onSuccess: async (data) => {
					setIsRefilling(false);

					if (!data.addActivationsToUserCode.status) {
						toast.error('Error during refilling code');

						return;
					}

					if (data.addActivationsToUserCode.isCodeRefilled) {
						toast.success('Code is refilled');
					}

					await queryClient.refetchQueries('GetCodeInvitationsInfo');
					await queryClient.refetchQueries('GetCanUserRefillCode');
				},
				onError: () => {
					setIsRefilling(false);

					toast.error('Error during refilling code');
				}
			}
		);
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="m-auto py-[62px]">
				<div className="h-max w-max">
					<OkSuccessIcon className="mx-auto" />
					<div className="mx-auto mt-6 flex w-max items-center gap-3">
						<NewTitle1 className="1280:text-[32px] 1280:leading-10 w-max text-center text-2xl">
							You invited {maxCodeActivations} friends
						</NewTitle1>
						<RaiseHandsIcon />
					</div>
					<div className="500:w-[484px] mx-auto mt-10 w-[312px] rounded-3xl border border-[#00B669]/[.06] bg-[rgba(255,255,255,0.04)] p-6">
						{canUserRefillCode ? (
							<NewLabel1 className="w-full font-normal">No invites available at the moment</NewLabel1>
						) : (
							<div className="flex gap-[6px]">
								<OkIcon fill="#00B669" className="shrink-0" />
								<NewLabel1 className="w-full font-normal">
									Thanks! We&apos;ll let you know when more invites are available
								</NewLabel1>
							</div>
						)}

						{!!canUserRefillCode && (
							<GradientButton className="500:mt-6 mt-4 h-10 !w-max !rounded-lg" onClick={handleRequestInvites}>
								<NewLabel1 className="font-bold">Request invites</NewLabel1>
							</GradientButton>
						)}
					</div>
				</div>
				<InvitedUsers />
			</div>
		</div>
	);
};
