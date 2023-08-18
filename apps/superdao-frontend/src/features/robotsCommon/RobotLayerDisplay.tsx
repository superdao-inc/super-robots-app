import { ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';

import { Loader } from 'src/components';
import { getCurrentPartsVersion, ROBOT_PARTS_URL } from '@sd/superdao-shared';
import { CustomItemByTokenType } from '../robots/customize/types';

type Props = {
	isUsingOddVersion: boolean;
	imageName: string;
	backgroundEffect?: ReactNode;
	className?: string;
	customParts?: {
		bg?: string;
		eyes?: string;
		tubes?: string;
		body?: string;
		legs?: string;
	};
	withoutBackground?: boolean;
	customPersonalParts?: {
		customBg: CustomItemByTokenType;
		customEyes: CustomItemByTokenType;
		customTubes: CustomItemByTokenType;
		customBody: CustomItemByTokenType;
		customLegs: CustomItemByTokenType;
		customFeedback: CustomItemByTokenType;
	};
	customizeMode?: boolean;
};

const alwaysLoadingLayersCount = 6;

export const RobotLayerDisplay = (props: Props) => {
	const {
		isUsingOddVersion,
		imageName,
		backgroundEffect,
		customParts,
		className,
		withoutBackground,
		customPersonalParts,
		customizeMode
	} = props;

	const [loadedImagesCount, setLoadedImagesCount] = useState(0);
	const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

	const robotPartsPrefix = `${ROBOT_PARTS_URL}/${getCurrentPartsVersion(isUsingOddVersion)}`;

	const parts = imageName.split('-');

	const getRightPart = (layer: string) => {
		if (layer === 'BG') {
			if (customPersonalParts?.customBg) {
				return customPersonalParts.customBg.customItem.layerName;
			}

			if (customParts?.bg) {
				return customParts.bg;
			}
		}

		if (layer === 'BODY') {
			if (customPersonalParts?.customBody) {
				return customPersonalParts.customBody.customItem.layerName;
			}

			if (customParts?.body) {
				return customParts.body;
			}
		}

		if (layer === 'EYES') {
			if (customPersonalParts?.customEyes) {
				return customPersonalParts.customEyes.customItem.layerName;
			}

			if (customParts?.eyes) {
				return customParts.eyes;
			}
		}

		if (layer === 'LEGS') {
			if (customPersonalParts?.customLegs) {
				return customPersonalParts.customLegs.customItem.layerName;
			}

			if (customParts?.legs) {
				return customParts.legs;
			}
		}

		if (layer === 'TUBES') {
			if (customPersonalParts?.customTubes) {
				return customPersonalParts.customTubes.customItem.layerName;
			}

			if (customParts?.tubes) {
				return customParts.tubes;
			}
		}

		if (layer === 'FEEDBACK') {
			if (customizeMode) {
				return customPersonalParts?.customFeedback?.customItem.layerName;
			}

			if (customPersonalParts?.customFeedback) {
				return customPersonalParts.customFeedback.customItem.layerName;
			}
		}

		return parts.find((part) => part.startsWith(layer));
	};

	const bg = getRightPart('BG');
	const body = getRightPart('BODY');
	const eyes = getRightPart('EYES');
	const legs = getRightPart('LEGS');
	const tubes = getRightPart('TUBES');

	const head = parts.find((part) => part.startsWith('HEAD'));

	const twitter = parts.find((part) => part.startsWith('TWITTER'));
	const ens = parts.find((part) => part.startsWith('ENS'));
	const lens = parts.find((part) => part.startsWith('LENS'));
	const mirror = parts.find((part) => part.startsWith('MIRROR'));
	const rank = parts.find((part) => part.startsWith('RANK'));

	const feedback = getRightPart('FEEDBACK');

	const handleImageLoaded = () => {
		setLoadedImagesCount((count) => count + 1);
	};

	useEffect(() => {
		const neededImagesCount =
			alwaysLoadingLayersCount +
			Number(!!twitter) +
			Number(!!ens) +
			Number(!!lens) +
			Number(!!mirror) +
			Number(!!rank) +
			Number(!!feedback) -
			Number(!!withoutBackground);

		setIsPreloaderVisible(loadedImagesCount < neededImagesCount);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadedImagesCount]);

	return (
		<div className="relative h-full w-full">
			{!!backgroundEffect && backgroundEffect}

			<div className={cn('relative h-full w-full overflow-hidden object-cover', className)}>
				{!withoutBackground && (
					<img
						onLoad={handleImageLoaded}
						className="absolute left-0 top-0 h-full w-full"
						src={`${robotPartsPrefix}/${bg}.png`}
					/>
				)}
				<img
					onLoad={handleImageLoaded}
					className="absolute left-0 top-0 h-full w-full"
					src={`${robotPartsPrefix}/${legs}.png`}
				/>
				<img
					onLoad={handleImageLoaded}
					className="absolute left-0 top-0 h-full w-full"
					src={`${robotPartsPrefix}/${body}.png`}
				/>
				<img
					onLoad={handleImageLoaded}
					className="absolute left-0 top-0 h-full w-full"
					src={`${robotPartsPrefix}/${head}.png`}
				/>
				<img
					onLoad={handleImageLoaded}
					className="absolute left-0 top-0 h-full w-full"
					src={`${robotPartsPrefix}/${eyes}.png`}
				/>
				<img
					onLoad={handleImageLoaded}
					className="absolute left-0 top-0 h-full w-full"
					src={`${robotPartsPrefix}/${tubes}.png`}
				/>

				{twitter && (
					<img
						onLoad={handleImageLoaded}
						className="absolute left-0 top-0 h-full w-full"
						src={`${robotPartsPrefix}/${twitter}.png`}
					/>
				)}
				{ens && (
					<img
						onLoad={handleImageLoaded}
						className="absolute left-0 top-0 h-full w-full"
						src={`${robotPartsPrefix}/${ens}.png`}
					/>
				)}
				{lens && (
					<img
						onLoad={handleImageLoaded}
						className="absolute left-0 top-0 h-full w-full"
						src={`${robotPartsPrefix}/${lens}.png`}
					/>
				)}
				{mirror && (
					<img
						onLoad={handleImageLoaded}
						className="absolute left-0 top-0 h-full w-full"
						src={`${robotPartsPrefix}/${mirror}.png`}
					/>
				)}
				{rank && (
					<img
						onLoad={handleImageLoaded}
						className="absolute left-0 top-0 h-full w-full"
						src={`${robotPartsPrefix}/${rank}.png`}
					/>
				)}

				{feedback && (
					<img
						onLoad={handleImageLoaded}
						className="absolute left-0 top-0 h-full w-full"
						src={`${robotPartsPrefix}/${feedback}.png`}
					/>
				)}

				<div
					className={cn('absolute top-0 left-0 flex h-full w-full items-center justify-center bg-inherit', {
						hidden: !isPreloaderVisible
					})}
				>
					<Loader size="lg" />
				</div>
			</div>
		</div>
	);
};
