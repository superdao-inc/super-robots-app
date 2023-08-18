import { useRouter } from 'next/router';
import cn from 'classnames';

import { GetNextPageParamFunction } from 'react-query';
import { shrinkSmallWallet } from '@sd/superdao-shared';

import { ArrowDownIcon, Loader, NewBody, NewLabel1, UserAvatarStub } from 'src/components';
import {
	UsersInvitedByCurrentUserCodeQuery,
	useInfiniteUsersInvitedByCurrentUserCodeQuery
} from 'src/gql/babyRobot.generated';

const DEFAULT_LIMIT = 100;

const offsetGenerator: GetNextPageParamFunction<UsersInvitedByCurrentUserCodeQuery> = (lastPage, allPages) => {
	if (lastPage?.usersInvitedByCurrentUserCode?.items?.length === DEFAULT_LIMIT) {
		return {
			offset: allPages.length * DEFAULT_LIMIT
		};
	}
};

export const InvitedUsers = () => {
	const { push } = useRouter();

	const {
		data: usersInvitedByCurrentUserCodeData,
		fetchNextPage,
		hasNextPage,
		isLoading
	} = useInfiniteUsersInvitedByCurrentUserCodeQuery({}, { keepPreviousData: true, getNextPageParam: offsetGenerator });

	const { pages } = usersInvitedByCurrentUserCodeData || {};

	const usersInvitedByCurrentUserCode = pages?.map((page) => page.usersInvitedByCurrentUserCode.items).flat();

	const bindRedirectToRobot = (tokenId: string) => () => {
		push(`/robots/${tokenId}`);
	};

	const handleFetchNextPage = () => {
		fetchNextPage();
	};

	return (
		<>
			{!!usersInvitedByCurrentUserCode?.length && (
				<>
					<div className="mt-10 flex items-center gap-[6px]">
						<NewLabel1 className="font-bold">Invited users</NewLabel1>
						{usersInvitedByCurrentUserCodeData?.pages[0].usersInvitedByCurrentUserCode.count && (
							<div className="flex shrink-0 rounded bg-[#22242A] px-[6px]">
								<NewBody className="font-bold leading-[19px]">
									{usersInvitedByCurrentUserCodeData?.pages[0].usersInvitedByCurrentUserCode.count}
								</NewBody>
							</div>
						)}
					</div>
					<div className="mt-4 overflow-hidden rounded-3xl border border-[#00B669]/[.06] bg-[rgba(255,255,255,0.04)] py-4">
						{usersInvitedByCurrentUserCode.map((entry, index) => (
							<div className="w-full" key={entry.id}>
								<div
									onClick={entry.tokenId ? bindRedirectToRobot(entry.tokenId) : undefined}
									className="flex w-full cursor-pointer items-center justify-between gap-2 px-8 py-4 transition-all duration-100 hover:bg-[rgba(255,255,255,0.04)] active:bg-[rgba(255,255,255,0.02)]"
								>
									<div className="h-8 w-8 shrink-0">
										<UserAvatarStub size="sm" seed={entry.walletAddress} />
									</div>

									<div className="744:w-max flex w-full flex-grow flex-wrap items-center justify-between">
										<NewLabel1 className="744:w-max w-full font-normal">
											{shrinkSmallWallet(entry.walletAddress)}
										</NewLabel1>
										<NewLabel1
											className={cn('744:!text-base 744:w-max w-full text-xs font-bold leading-5 text-[#00B669]', {
												'text-[#FC7900]': !entry.tokenId
											})}
										>
											{entry.tokenId ? 'Minted' : 'In progress'}
										</NewLabel1>
									</div>
								</div>
								{index + 1 < usersInvitedByCurrentUserCode.length && (
									<div className="w-full px-8">
										<div className="h-[1px] w-full bg-white opacity-[0.06]"></div>
									</div>
								)}
							</div>
						))}
					</div>
				</>
			)}
			{isLoading ? (
				<div className="mx-auto mt-4 w-max">
					<Loader size="lg" />
				</div>
			) : hasNextPage ? (
				<div
					onClick={handleFetchNextPage}
					className="mx-auto mt-4 flex w-max shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-white/[.08] py-2 px-4 transition-all duration-100 hover:bg-white/[.06] active:bg-white/[.04]"
				>
					<NewLabel1 className="font-bold">Load {DEFAULT_LIMIT} more</NewLabel1>
					<ArrowDownIcon />
				</div>
			) : null}
		</>
	);
};
