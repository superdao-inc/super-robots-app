import { MentionData } from '@draft-js-plugins/mention';
import { EditorState } from 'draft-js';

export type DaoMention = { id: string; name: string; avatar?: string };

export type MentionSearchResult = { trigger: string; value: string };

export type TextareaWithMentionsProps = {
	editorKey: string;
	error?: string;
	initialValue: EditorState;
	label: string;
	loading?: boolean;
	placeholder?: string;
	suggestions?: MentionData[];
	onChange?(val: EditorState): void;
	onSearchChange(event: MentionSearchResult): Promise<void>;
	onAddMention?(mention: DaoMention): void;
};
