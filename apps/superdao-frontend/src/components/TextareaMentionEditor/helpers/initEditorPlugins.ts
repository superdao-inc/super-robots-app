import createMentionPlugin from '@draft-js-plugins/mention';

import { MENTION_SYMBOL } from 'src/constants/bio';

export const initEditorPlugins = () => {
	const mentionPlugin = createMentionPlugin({
		mentionPrefix: MENTION_SYMBOL,
		popperOptions: {
			placement: 'bottom-start',
			modifiers: [{ name: 'offset', options: { offset: [0, 12, 0, 12] } }]
		},
		theme: {
			mention: 'text-accentPrimary',
			mentionSuggestionsPopup:
				'overflow-hidden bg-backgroundTertiary rounded-lg py-1 text-[15px] text-foregroundPrimary z-1 min-w-[280px]'
		}
	});

	const plugins = [mentionPlugin];
	const { MentionSuggestions } = mentionPlugin;

	return { plugins, MentionSuggestions };
};
