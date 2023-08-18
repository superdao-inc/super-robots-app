import { PopoverProps as Props } from '@draft-js-plugins/mention/lib/MentionSuggestions/Popover';
import { Children, ReactElement, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Loader } from 'src/components/common/loader';

type PopoverProps = Props & { loading?: boolean };

/**
 * @link https://github.com/draft-js-plugins/draft-js-plugins/blob/master/packages/mention/src/MentionSuggestions/Popover.tsx
 */
export default function Popover({
	store,
	children,
	theme,
	loading = false,
	popperOptions = { placement: 'bottom-start' }
}: PopoverProps): ReactElement {
	const { t } = useTranslation();

	const [className, setClassName] = useState(() => cn(theme.mentionSuggestions, theme.mentionSuggestionsPopup));
	const [popperEl, setPopperEl] = useState<HTMLElement | null>(null);

	const { styles, attributes } = usePopper(store.getReferenceElement(), popperEl, popperOptions);

	useEffect(() => {
		requestAnimationFrame(() =>
			setClassName(cn(theme.mentionSuggestions, theme.mentionSuggestionsPopup, theme.mentionSuggestionsPopupVisible))
		);
	}, [theme]);

	let contentTemplate = children;
	if (loading) {
		contentTemplate = (
			<div className="flex h-[48px] items-center justify-center">
				<Loader size="md" color="dark" />
			</div>
		);
	} else if (!Children.count(children)) {
		contentTemplate = (
			<div className="text-foregroundTertiary flex h-[48px] items-center justify-center px-2">
				{t('components.textareaMentionEditor.emptyListText')}
			</div>
		);
	}

	return (
		<div ref={setPopperEl} style={styles.popper} {...attributes.popper} className={className} role="listbox">
			{contentTemplate}
		</div>
	);
}
