import { useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { Detail, Headline } from 'src/components';
import { colors } from 'src/style';

type Props = {
	title: string;
	isActive: boolean;
	isSoon: boolean;
};

const getHeadlineColor = (isActive: boolean, isSoon: boolean, isHovered: boolean) => {
	if (isSoon) {
		return colors.foregroundPrimary;
	}
	if (isHovered) {
		return colors.accentPrimary;
	}
	if (isActive) {
		return colors.accentPrimary;
	}
	return colors.foregroundPrimary;
};

const NavigationItemView = (
	props: Props & { isHovered: boolean; onMouseEnter: () => void; onMouseLeave: () => void }
) => {
	const { title, isActive, isHovered, isSoon, onMouseEnter, onMouseLeave } = props;

	let headlineColor = getHeadlineColor(isActive, isSoon, isHovered);

	return (
		<div
			className={cn('flex cursor-pointer items-center rounded py-2 px-4', { 'cursor-default': isSoon })}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<Headline color={headlineColor} className="ml-2 text-[17px] transition-all">
				{title}
			</Headline>
			{isSoon && (
				<Detail color={colors.tintCyan} className="ml-1 self-start">
					SOON
				</Detail>
			)}
		</div>
	);
};

type NavigationItemProps = Props & {
	url?: string;
};

export const NavigationItem = (props: NavigationItemProps) => {
	const { url, ...restItem } = props;

	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	if (url) {
		return (
			<Link href={url} passHref legacyBehavior>
				<a>
					<NavigationItemView
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						isHovered={isHovered}
						{...restItem}
					/>
				</a>
			</Link>
		);
	}

	return (
		<NavigationItemView
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			isHovered={isHovered}
			{...restItem}
		/>
	);
};
