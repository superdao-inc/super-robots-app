import cn from 'classnames';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { RobotFactoryIcon } from 'src/components/assets/icons/robotFactory';
import { useRobotDataContext } from '../context/robotDataContext';
import {
	useGetIsStatisticClickCustomizeRegisteredQuery,
	useSaveStatisticClickCustomizeMutation
} from 'src/gql/userClicksStatistic.generated';

type Props = {
	disabled: boolean;
};

export const CustomizeRobotButton = (props: Props) => {
	const { disabled } = props;

	const { push } = useRouter();
	const queryClient = useQueryClient();

	const { tokenId } = useRobotDataContext();

	const [isRegisteredCustomize, setIsRegisteredCustomize] = useState(false);

	const { mutate } = useSaveStatisticClickCustomizeMutation();

	const { data: hasUserCustomizeClickRegistration } = useGetIsStatisticClickCustomizeRegisteredQuery(
		{},
		{ select: (data) => data.getIsStatisticClickCustomizeRegistered }
	);

	const handleOpenRobotCustomize = () => {
		if (!hasUserCustomizeClickRegistration && !isRegisteredCustomize) {
			setIsRegisteredCustomize(true);

			mutate(
				{},
				{
					onSuccess: async (data) => {
						if (!data.saveStatisticClickCustomize) {
							setIsRegisteredCustomize(false);
							return;
						}

						await queryClient.refetchQueries('GetIsStatisticClickCustomizeRegistered');
					},
					onError: () => {
						setIsRegisteredCustomize(false);
					}
				}
			);
		}

		push(`/robots/${tokenId}/customize`);
	};

	const iconColor = disabled ? '#999999' : undefined;

	return (
		<button
			onClick={handleOpenRobotCustomize}
			className={cn('btn-gradient flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-4', {
				'pointer-events-none !from-[rgba(242,242,242,0.15)] !to-[rgba(242,242,242,0.15)] backdrop-blur-lg': disabled
			})}
		>
			<RobotFactoryIcon color={iconColor} />{' '}
			<span
				className={cn('text-[16px] font-bold text-white', {
					'!text-[#999999]': disabled
				})}
			>
				Customize
			</span>
		</button>
	);
};
