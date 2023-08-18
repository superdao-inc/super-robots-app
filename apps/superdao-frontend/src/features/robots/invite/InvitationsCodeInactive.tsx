import { useQueryClient } from 'react-query';
import { DoneIcon, Loader, NewLabel1, NewTitle1, toast } from 'src/components';
import { GradientButton } from 'src/features/auth/components/gradientButton';
import {
	useGetIsStatisticClickNotifyMeRegisteredQuery,
	useSaveStatisticClickNotifyMeMutation
} from 'src/gql/userClicksStatistic.generated';

export const InvitationsCodeInactive = () => {
	const queryClient = useQueryClient();

	const { data, isLoading } = useGetIsStatisticClickNotifyMeRegisteredQuery(
		{},
		{ select: (data) => data.getIsStatisticClickNotifyMeRegistered }
	);

	const { mutate } = useSaveStatisticClickNotifyMeMutation();

	const handleNotifyMe = () => {
		mutate(
			{},
			{
				onSuccess: async (data) => {
					if (!data.saveStatisticClickNotifyMe) {
						toast.error('Error during registering data');
					}

					toast.success('We will notify you');
					await queryClient.refetchQueries('GetIsStatisticClickNotifyMeRegistered');
				},
				onError: () => {
					toast.error('Error during registering data');
				}
			}
		);
	};

	const handleVoidAction = () => {};

	const content = isLoading ? (
		<Loader className="500:mt-4 mx-auto mt-6" size="lg" />
	) : data ? (
		<GradientButton
			className="500:mt-4 pointer-events-none mx-auto mt-6 h-10 !w-max !rounded-lg"
			onClick={handleVoidAction}
		>
			<>
				<DoneIcon fill="#FFF" width={24} height={24} />
				<NewLabel1 className="font-bold">We will notify you</NewLabel1>
			</>
		</GradientButton>
	) : (
		<GradientButton className="500:mt-4 mx-auto mt-6 h-10 !w-max !rounded-lg" onClick={handleNotifyMe}>
			<NewLabel1 className="font-bold">Notify me</NewLabel1>
		</GradientButton>
	);

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="h-max w-max py-[62px] px-5">
				<NewTitle1 className="500:w-[350px] 500:text-[32px] 500:leading-10 w-[260px] text-center text-2xl">
					Soon you&apos;ll be able to invite your friends
				</NewTitle1>

				{content}
			</div>
		</div>
	);
};
