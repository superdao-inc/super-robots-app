import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import styled from '@emotion/styled';
import { useToggle } from 'src/hooks';
import { Body, Label1 } from 'src/components/text';
import { colors } from 'src/style';

type CollapsableDescriptionProps = {
	description: string;
	className?: string;
};

const LINES_COUNT = 3;

export const CollapsableDescription = memo((props: CollapsableDescriptionProps) => {
	const { description, className = '' } = props;

	const { t } = useTranslation();

	const descriptionRef = useRef<HTMLSpanElement>(null);

	const [shouldDescriptionBeCollapsed, setShouldDescriptionBeCollapsed] = useState(false);

	useEffect(() => {
		let isTextLongEnoughToBeCollapsed = false;
		const descriptionEl = descriptionRef.current;

		if (!description || !descriptionEl) return;

		const { offsetHeight } = descriptionEl;
		const lineHeightWithUnits = window.getComputedStyle(descriptionEl).lineHeight;
		const lineHeight = parseInt(lineHeightWithUnits.substring(0, lineHeightWithUnits.length - 2), 10);

		const rate = offsetHeight / lineHeight;
		if (rate > LINES_COUNT) {
			isTextLongEnoughToBeCollapsed = true;
		}

		const hasTextEnoughLinesToBeCollapsed = description.split('\n').length > LINES_COUNT;
		setShouldDescriptionBeCollapsed(isTextLongEnoughToBeCollapsed || hasTextEnoughLinesToBeCollapsed);
	}, [description]);

	const [isDescriptionExpanded, toggleIsDescriptionExpanded] = useToggle(false);

	return (
		<div className={classNames('relative mt-4 max-w-full', { 'pb-6': isDescriptionExpanded }, className)}>
			{' '}
			{/* Adds empty line before Show More to prevent it's overflow */}
			<Body
				ref={descriptionRef}
				className={classNames('break-words', {
					['line-clamp-3']: shouldDescriptionBeCollapsed && !isDescriptionExpanded,
					'min-h-18': shouldDescriptionBeCollapsed && !isDescriptionExpanded
				})}
				data-testid="Profile__description"
			>
				{description}
			</Body>
			{shouldDescriptionBeCollapsed && (
				<div className="absolute bottom-0 right-0 flex">
					<DescriptionFade />
					<Label1
						className="bg-backgroundSecondary text-accentPrimary inline-block cursor-pointer"
						onClick={toggleIsDescriptionExpanded}
					>
						{isDescriptionExpanded ? t('components.post.showLessLabel') : t('components.post.showMoreLabel')}
					</Label1>
				</div>
			)}
		</div>
	);
});

CollapsableDescription.displayName = 'CollapsableDescription';

const DescriptionFade = styled.div`
	width: 70px;
	height: 24px;
	display: inline-block;
	background-image: linear-gradient(to right, transparent, ${colors.backgroundSecondary} 85%);
`;
