import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import cn from 'classnames';
import { Button, DoneIcon, NewBody, NewLabel1, RestartIcon, RocketIcon, toast } from 'src/components';
import { RobotLayerDisplay } from 'src/features/robotsCommon/RobotLayerDisplay';
import {
	GetTokenCustomItemsQuery,
	GetUserCustomItemsQuery,
	useUpdateRobotLayersMutation
} from 'src/gql/babyRobot.generated';
import { CustomItemByTokenResponse, UpdateRobotLayersResponseStatus } from 'src/types/types.generated';
import { RobotSelectedPartsDisplay } from './RobotSelectedPartsDisplay';
import { RobotUpdateActions } from './RobotUpdateActions';
import { SelectableItems } from './SelectableItems';
import { SelectableSubshopItems } from './SelectableSubshopItems';
import { DemoRobotDoneModal } from './DemoRobotDoneModal';
import { useSwitch } from 'src/hooks';
import { PublishAttemptModal } from './PublishAttemptModal';
import Tooltip from 'src/components/tooltip';
import { PublishLockedModal } from './PublishLockedModal';
import { PublishWarningModal } from './PublishWarningModal';

type Props = {
	imageName: string;
	isUsingOddVersion: boolean;
	onSelectSubShop: (subShop: string) => void;
	subShop: string | null;
	onResetSubShop: () => void;
	isDemo?: boolean;
	availableCustomizeActivationsCount?: number;
	isUserEligibleForInvites?: boolean;
	userCustomItems?: GetUserCustomItemsQuery['getUserCustomItems'];
	tokenCustomItems?: GetTokenCustomItemsQuery['getTokenCustomItems'];
};

const extractPart = (part: string) => part.split('_')[1];

export const CustomizeRobot = (props: Props) => {
	const {
		imageName,
		isUsingOddVersion,
		onSelectSubShop: handleSelectSubShop,
		subShop,
		onResetSubShop: handleResetSubShop,
		isDemo,
		availableCustomizeActivationsCount = 0,
		isUserEligibleForInvites = false,
		userCustomItems,
		tokenCustomItems
	} = props;

	const queryClient = useQueryClient();
	const { query, push } = useRouter();
	const { tokenId } = query;

	const [isDemoRobotDoneModalOpen, { off: offDemoRobotDoneModal, on: onDemoRobotDoneModal }] = useSwitch(false);
	const [isPublishAttemptModalOpen, { off: offPublishAttemptModal, on: onPublishAttemptModal }] = useSwitch(false);
	const [isPublishLockedModalOpen, { off: offPublishLockedModal, on: onPublishLockedModal }] = useSwitch(false);
	const [isPublishWarningModalOpen, { off: offPublishWarningModal, on: onPublishWarningModal }] = useSwitch(false);

	const [isUpdateClicked, setIsUpdateClicked] = useState(false);
	const [isRobotUpdating, setIsRobotUpdating] = useState(false);

	const { mutate: updateRobotLayers } = useUpdateRobotLayersMutation({});

	const parts = imageName.split('-');

	const defaultBg = parts.find((part) => part.startsWith('BG')) ?? '';
	const defaultBody = parts.find((part) => part.startsWith('BODY')) ?? '';
	const defaultEyes = parts.find((part) => part.startsWith('EYES')) ?? '';
	const defaultLegs = parts.find((part) => part.startsWith('LEGS')) ?? '';
	const defaultTubes = parts.find((part) => part.startsWith('TUBES')) ?? '';

	const defaultCustomBg =
		tokenCustomItems?.find((part) => part.isEnabled && part.customItem.layerType === 'BG') ?? null;
	const defaultCustomBody =
		tokenCustomItems?.find((part) => part.isEnabled && part.customItem.layerType === 'BODY') ?? null;
	const defaultCustomEyes =
		tokenCustomItems?.find((part) => part.isEnabled && part.customItem.layerType === 'EYES') ?? null;
	const defaultCustomLegs =
		tokenCustomItems?.find((part) => part.isEnabled && part.customItem.layerType === 'LEGS') ?? null;
	const defaultCustomTubes =
		tokenCustomItems?.find((part) => part.isEnabled && part.customItem.layerType === 'TUBES') ?? null;
	const defaultCustomFeedback =
		tokenCustomItems?.find((part) => part.isEnabled && part.customItem.layerType === 'FEEDBACK') ?? null;

	const [bg, setBg] = useState(defaultBg);
	const [body, setBody] = useState(defaultBody);
	const [eyes, setEyes] = useState(defaultEyes);
	const [legs, setLegs] = useState(defaultLegs);
	const [tubes, setTubes] = useState(defaultTubes);

	const [customBg, setCustomBg] = useState(defaultCustomBg);
	const [customBody, setCustomBody] = useState(defaultCustomBody);
	const [customEyes, setCustomEyes] = useState(defaultCustomEyes);
	const [customLegs, setCustomLegs] = useState(defaultCustomLegs);
	const [customTubes, setCustomTubes] = useState(defaultCustomTubes);
	const [customFeedback, setCustomFeedback] = useState(defaultCustomFeedback);

	useEffect(() => {
		if (!isDemo) return;

		const parts = imageName.split('-');

		const newBg = parts.find((part) => part.startsWith('BG')) ?? '';
		const newBody = parts.find((part) => part.startsWith('BODY')) ?? '';
		const newEyes = parts.find((part) => part.startsWith('EYES')) ?? '';
		const newLegs = parts.find((part) => part.startsWith('LEGS')) ?? '';
		const newTubes = parts.find((part) => part.startsWith('TUBES')) ?? '';

		setBg(newBg);
		setBody(newBody);
		setEyes(newEyes);
		setLegs(newLegs);
		setTubes(newTubes);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageName]);

	const handleSetSelection = (
		fullset: { BG: string; BODY: string; TUBES: string; EYES: string; LEGS: string } | null
	) => {
		// setBg(fullset['BG']);

		setBody(fullset?.['BODY'] ?? 'BODY_1');
		setCustomBody(null);

		setEyes(fullset?.['EYES'] ?? 'EYES_1');
		setCustomEyes(null);

		setLegs(fullset?.['LEGS'] ?? 'LEGS_1');
		setCustomLegs(null);

		setTubes(fullset?.['TUBES'] ?? 'TUBES_1');
		setCustomTubes(null);
	};

	const handleSetPart = (part: string | null, type: string) => {
		if (type === 'BG') {
			setBg(part ?? 'BG_1');
			setCustomBg(null);
		}
		if (type === 'BODY') {
			setBody(part ?? 'BODY_1');
			setCustomBody(null);
		}
		if (type === 'EYES') {
			setEyes(part ?? 'EYES_1');
			setCustomEyes(null);
		}
		if (type === 'LEGS') {
			setLegs(part ?? 'LEGS_1');
			setCustomLegs(null);
		}
		if (type === 'TUBES') {
			setTubes(part ?? 'TUBES_1');
			setCustomTubes(null);
		}
	};

	const handleSetCustomPart = (part: CustomItemByTokenResponse | null, type: string) => {
		if (type === 'BG') {
			setCustomBg(part);
			setBg('BG_1');
		}
		if (type === 'BODY') {
			setCustomBody(part);
			setBody('BODY_1');
		}
		if (type === 'EYES') {
			setCustomEyes(part);
			setEyes('EYES_1');
		}
		if (type === 'LEGS') {
			setCustomLegs(part);
			setLegs('LEGS_1');
		}
		if (type === 'TUBES') {
			setCustomTubes(part);
			setTubes('TUBES_1');
		}
		if (type === 'FEEDBACK') {
			setCustomFeedback(part);
		}
	};

	const handleReset = () => {
		setBg(defaultBg);
		setBody(defaultBody);
		setEyes(defaultEyes);
		setLegs(defaultLegs);
		setTubes(defaultTubes);

		setCustomBg(defaultCustomBg);
		setCustomBody(defaultCustomBody);
		setCustomEyes(defaultCustomEyes);
		setCustomLegs(defaultCustomLegs);
		setCustomTubes(defaultCustomTubes);
		setCustomFeedback(defaultCustomFeedback);
	};

	const handleDone = () => {
		onDemoRobotDoneModal();
	};

	const handlePublishAttempt = () => {
		if (!availableCustomizeActivationsCount) {
			onPublishLockedModal();

			return;
		}

		const selectedCustomItemIds = [
			customBg?.id ?? '',
			customBody?.id ?? '',
			customEyes?.id ?? '',
			customLegs?.id ?? '',
			customTubes?.id ?? '',
			customFeedback?.id ?? ''
		].filter((elem) => !!elem);

		const isSelectionContainsUserElems = selectedCustomItemIds.filter((elem) =>
			userCustomItems?.map((item) => item.id).includes(elem)
		).length;

		if (isSelectionContainsUserElems) {
			onPublishWarningModal();
		} else {
			onPublishAttemptModal();
		}
	};

	const handlePublish = () => {
		setIsRobotUpdating(true);
		setIsUpdateClicked(true);

		// to off
		const toOffIds = [];

		if (defaultCustomBg && defaultCustomBg.id !== customBg?.id) {
			toOffIds.push(defaultCustomBg.id);
		}
		if (defaultCustomBody && defaultCustomBody.id !== customBody?.id) {
			toOffIds.push(defaultCustomBody.id);
		}
		if (defaultCustomEyes && defaultCustomEyes.id !== customEyes?.id) {
			toOffIds.push(defaultCustomEyes.id);
		}
		if (defaultCustomLegs && defaultCustomLegs.id !== customLegs?.id) {
			toOffIds.push(defaultCustomLegs.id);
		}
		if (defaultCustomTubes && defaultCustomTubes.id !== customTubes?.id) {
			toOffIds.push(defaultCustomTubes.id);
		}
		if (defaultCustomFeedback && defaultCustomFeedback.id !== customFeedback?.id) {
			toOffIds.push(defaultCustomFeedback.id);
		}

		// to on
		const toOnIds = [];
		// to transfer
		const toTransferIds = [];

		if (customBg && defaultCustomBg?.id !== customBg.id) {
			if (userCustomItems?.map((item) => item.id).includes(customBg.id)) {
				toTransferIds.push(customBg.id);
			} else {
				toOnIds.push(customBg.id);
			}
		}
		if (customBody && defaultCustomBody?.id !== customBody.id) {
			if (userCustomItems?.map((item) => item.id).includes(customBody.id)) {
				toTransferIds.push(customBody.id);
			} else {
				toOnIds.push(customBody.id);
			}
		}
		if (customEyes && defaultCustomEyes?.id !== customEyes.id) {
			if (userCustomItems?.map((item) => item.id).includes(customEyes.id)) {
				toTransferIds.push(customEyes.id);
			} else {
				toOnIds.push(customEyes.id);
			}
		}
		if (customLegs && defaultCustomLegs?.id !== customLegs.id) {
			if (userCustomItems?.map((item) => item.id).includes(customLegs.id)) {
				toTransferIds.push(customLegs.id);
			} else {
				toOnIds.push(customLegs.id);
			}
		}
		if (customTubes && defaultCustomTubes?.id !== customTubes.id) {
			if (userCustomItems?.map((item) => item.id).includes(customTubes.id)) {
				toTransferIds.push(customTubes.id);
			} else {
				toOnIds.push(customTubes.id);
			}
		}
		if (customFeedback && defaultCustomFeedback?.id !== customFeedback.id) {
			if (userCustomItems?.map((item) => item.id).includes(customFeedback.id)) {
				toTransferIds.push(customFeedback.id);
			} else {
				toOnIds.push(customFeedback.id);
			}
		}

		updateRobotLayers(
			{
				updateRobotLayersRequest: {
					tokenId: tokenId as string,
					common: {
						bg: extractPart(bg),
						body: extractPart(body),
						eyes: extractPart(eyes),
						legs: extractPart(legs),
						tubes: extractPart(tubes)
					},
					toOffIds,
					toOnIds,
					toTransferIds
				}
			},
			{
				onSuccess: async (data) => {
					setIsRobotUpdating(false);

					if (data.updateRobotLayers.status === UpdateRobotLayersResponseStatus.Fail) {
						toast.error('Error while updating robot layers');
						return;
					}

					if (data.updateRobotLayers.status === UpdateRobotLayersResponseStatus.SanitizeFail) {
						toast.error('Cannot update robot: wrong update params');
						return;
					}

					if (data.updateRobotLayers.status === UpdateRobotLayersResponseStatus.AlreadyUpdating) {
						toast.error('Robot is already updating');
						return;
					}

					queryClient.removeQueries('IsRobotUpdating');

					await Promise.all([
						queryClient.invalidateQueries('MintedBabyRobotInfoByTokenId'),
						queryClient.refetchQueries([
							'MintedBabyRobotInfoWithImageMetaAndOwnerByTokenId',
							{ tokenId: tokenId as string }
						]),
						queryClient.refetchQueries('UserEligibleForCustomizeData'),
						queryClient.refetchQueries('GetUserCustomItems'),
						queryClient.refetchQueries('GetTokenCustomItems')
					]);

					push(`/robots/${tokenId}`);
				},
				onError: () => {
					setIsRobotUpdating(false);

					toast.error('Error while updating robot layers');
				}
			}
		);
	};

	const isRobotChanged =
		customBg !== defaultCustomBg ||
		bg !== defaultBg ||
		customBody !== defaultCustomBody ||
		body !== defaultBody ||
		customEyes !== defaultCustomEyes ||
		eyes !== defaultEyes ||
		customLegs !== defaultCustomLegs ||
		legs !== defaultLegs ||
		customTubes !== defaultCustomTubes ||
		tubes !== defaultTubes ||
		customFeedback !== defaultCustomFeedback;

	const isPublishDisabled = !isRobotChanged || isRobotUpdating || isUpdateClicked;

	const selectedCustomItemIds = [
		customBg?.id ?? '',
		customBody?.id ?? '',
		customEyes?.id ?? '',
		customLegs?.id ?? '',
		customTubes?.id ?? '',
		customFeedback?.id ?? ''
	].filter((elem) => !!elem);

	const selectionContainsUserElems = selectedCustomItemIds.filter((elem) =>
		userCustomItems?.map((item) => item.id).includes(elem)
	);

	const selectionContainsUserElemsData =
		userCustomItems?.filter((uci) => selectionContainsUserElems.includes(uci.id)) ?? [];

	return (
		<div className="1280:h-[calc(100vh-56px)] 1280:overflow-hidden 1280:flex 1280:pt-0 500:pb-[calc(72px+24px+24px)] 1280:pb-0 relative block pt-10 pb-[calc(72px+40px)]">
			<div className="1280:h-full 1280:border-l 1280:border-white/[.06] 1280:mx-0 1280:block 1280:order-2 1280:w-[434px] mx-auto w-max">
				<div className="500:h-[434px] 500:w-[434px] 1280:h-[463px] 1280:w-[463px] h-[280px] w-[280px] shrink-0">
					<RobotLayerDisplay
						customizeMode={!isDemo}
						imageName={imageName}
						isUsingOddVersion={isUsingOddVersion}
						customParts={{ bg, eyes, legs, body, tubes }}
						customPersonalParts={{ customBg, customEyes, customLegs, customBody, customTubes, customFeedback }}
						className="bg-backgroundPrimary 1280:rounded-none rounded-3xl"
					/>
				</div>
				<div className="1280:block relative hidden h-[calc(100%-463px)] w-full overflow-auto">
					<div className={cn('p-8 pb-[calc(72px+32px)]', { '!pb-8': isPublishDisabled })}>
						<RobotSelectedPartsDisplay
							isUsingOddVersion={isUsingOddVersion}
							customParts={{ bg, eyes, legs, body, tubes }}
						/>
					</div>
					{!isPublishDisabled && (
						<>
							<Button
								className="absolute top-[28px] right-8"
								color="iconBackground"
								size="md"
								onClick={handleReset}
								label={'Reset'}
								leftIcon={<RestartIcon />}
							/>
							<div className="fixed bottom-0 right-0 flex h-[72px] w-[434px] items-center gap-4 border border-[#FFFFFF]/[.06] bg-[#23262F]/[.7] p-4 backdrop-blur-lg">
								{isDemo ? (
									<div
										onClick={handleDone}
										className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white py-2 transition-all hover:bg-white/[.9] active:bg-white/[.8]"
									>
										<DoneIcon width={24} height={24} />
										<NewLabel1 className="font-bold text-black">Done</NewLabel1>
									</div>
								) : isUserEligibleForInvites ? (
									<>
										<div
											onClick={handlePublishAttempt}
											className={cn(
												'flex w-[208px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-white py-2 transition-all hover:bg-white/[.9] active:bg-white/[.8]'
											)}
										>
											<RocketIcon />
											<NewLabel1 className="font-bold text-black">Publish</NewLabel1>
											<div className="rounded bg-[#6153CC] px-[6px]">
												<NewBody className="font-bold leading-[19px]">{availableCustomizeActivationsCount}</NewBody>
											</div>
										</div>
										<NewBody className="w-[208px] opacity-70">
											Usually takes minutes.
											<br />
											In rare cases, 1-2 hours
										</NewBody>
									</>
								) : (
									<>
										<Tooltip
											content={
												<div className="h-max max-w-[308px]">
													<NewBody className="w-full text-center">
														You will soon be able to invite
														<br />
														your friends and unlock customization.
														<br />
														Stay tuned 🥳
													</NewBody>
												</div>
											}
											placement="top"
										>
											<div
												className={cn(
													'pointer-events-none flex w-[208px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-white py-2 opacity-40 transition-all hover:bg-white/[.9] active:bg-white/[.8]'
												)}
											>
												<RocketIcon />
												<NewLabel1 className="font-bold text-black">Publish soon</NewLabel1>
											</div>
										</Tooltip>
										<NewBody className="w-[208px] opacity-70">
											Usually takes minutes.
											<br />
											In rare cases, 1-2 hours
										</NewBody>
									</>
								)}
							</div>
						</>
					)}
					<DemoRobotDoneModal
						imageName={imageName}
						isUsingOddVersion={isUsingOddVersion}
						customParts={{ bg, eyes, legs, body, tubes }}
						isOpen={isDemoRobotDoneModalOpen}
						onClose={offDemoRobotDoneModal}
					/>
					<PublishAttemptModal
						availableCustomizeActivationsCount={availableCustomizeActivationsCount}
						onConfirm={isPublishDisabled ? undefined : handlePublish}
						isOpen={isPublishAttemptModalOpen}
						onClose={offPublishAttemptModal}
					/>
					<PublishLockedModal isOpen={isPublishLockedModalOpen} onClose={offPublishLockedModal} />
					<PublishWarningModal
						availableCustomizeActivationsCount={availableCustomizeActivationsCount}
						isOpen={isPublishWarningModalOpen}
						onClose={offPublishWarningModal}
						onPublish={isPublishDisabled ? () => {} : handlePublish}
						selectionContainsUserElemsData={selectionContainsUserElemsData}
						isUsingOddVersion={isUsingOddVersion}
					/>
				</div>
			</div>

			<div className="1280:order-1 1280:grow 1280:overflow-auto 1280:max-h-full 1280:pb-10">
				{subShop ? (
					<SelectableSubshopItems
						subShop={subShop}
						imageName={imageName}
						onPartSelection={handleSetPart}
						onSetSelection={handleSetSelection}
						partsConfig={{ bg, eyes, legs, body, tubes }}
						isUsingOddVersion={isUsingOddVersion}
						onResetSubShop={handleResetSubShop}
					/>
				) : (
					<SelectableItems
						userCustomItems={userCustomItems ?? []}
						tokenCustomItems={tokenCustomItems ?? []}
						isDemo={isDemo}
						isRobotChanged={isRobotChanged}
						onSelectSubShop={handleSelectSubShop}
						onPartSelection={handleSetPart}
						onCustomPartSelection={handleSetCustomPart}
						partsConfig={{ bg, eyes, legs, body, tubes }}
						customPartsConfig={{ customBg, customEyes, customLegs, customBody, customTubes, customFeedback }}
						isUsingOddVersion={isUsingOddVersion}
					/>
				)}

				<RobotUpdateActions
					isUserEligibleForInvites={isUserEligibleForInvites}
					availableCustomizeActivationsCount={availableCustomizeActivationsCount}
					onPublishAttemptModal={handlePublishAttempt}
					imageName={imageName}
					isUsingOddVersion={isUsingOddVersion}
					customParts={{ bg, eyes, legs, body, tubes }}
					isDemo={isDemo}
					isUpdateClicked={isUpdateClicked}
					isRobotUpdating={isRobotUpdating}
					isRobotChanged={isRobotChanged}
					onReset={handleReset}
				/>
			</div>
		</div>
	);
};
