import noop from 'lodash/noop';
import { memo, useCallback, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { PopoverProps } from '@draft-js-plugins/mention/lib/MentionSuggestions/Popover';
import '@draft-js-plugins/mention/lib/plugin.css';

import { TextareaEditor } from '../TextareaEditor';
import { MentionEntry } from './components/MentionEntry';
import { MentionSearchResult, TextareaWithMentionsProps } from './TextareaMentionEditor.types';
import { initEditorPlugins } from './helpers/initEditorPlugins';
import { Popover } from './components/Popover';

const DEBOUNCE_DURATION = 500;

const TextareaMentionEditor = ({
	editorKey,
	error,
	initialValue,
	label,
	placeholder,
	loading = false,
	suggestions = [],
	onChange = noop,
	onSearchChange,
	onAddMention = noop
}: TextareaWithMentionsProps) => {
	const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);
	const [shouldDisableSuggestions, setShouldDisableSuggestions] = useState(false);

	const { plugins, MentionSuggestions } = useMemo(initEditorPlugins, []);

	const fetchSuggestionsDebounced = useMemo(
		() =>
			debounce(async (event: MentionSearchResult): Promise<void> => {
				await onSearchChange(event);
				setShouldDisableSuggestions(false);
			}, DEBOUNCE_DURATION),
		[onSearchChange]
	);

	const handleSearchChange = useCallback(
		(event: MentionSearchResult) => {
			fetchSuggestionsDebounced.cancel();
			setShouldDisableSuggestions(true);

			if (event.value.length) return fetchSuggestionsDebounced(event);
		},
		[fetchSuggestionsDebounced]
	);

	const popoverContainer = useCallback((props: PopoverProps) => <Popover loading={loading} {...props} />, [loading]);

	return (
		<div className="relative w-full">
			<TextareaEditor
				editorKey={editorKey}
				editorState={initialValue}
				error={error}
				label={label}
				placeholder={placeholder}
				plugins={plugins}
				onChange={onChange}
			/>
			<MentionSuggestions
				entryComponent={MentionEntry}
				open={shouldShowSuggestions && (loading || !shouldDisableSuggestions)}
				suggestions={suggestions}
				popoverContainer={popoverContainer}
				renderEmptyPopup
				onOpenChange={setShouldShowSuggestions}
				onSearchChange={handleSearchChange}
				onAddMention={onAddMention}
			/>
		</div>
	);
};

export default memo(TextareaMentionEditor);
