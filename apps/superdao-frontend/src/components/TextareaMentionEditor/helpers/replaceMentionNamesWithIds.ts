import { EditorState } from 'draft-js';

import { MENTION_SYMBOL } from 'src/constants/bio';
import { DaoMention } from '../TextareaMentionEditor.types';

type EditorEntities = Record<string, { data: { mention: DaoMention } }>;

export const replaceMentionNamesWithIds = (editorState: EditorState): string | null => {
	const content = editorState.getCurrentContent();
	const text = content.getPlainText();
	const entities = content.getAllEntities().toJS() as EditorEntities;

	let formattedText = text;
	for (const key in entities) {
		const { mention } = entities[key].data;
		formattedText = formattedText.replaceAll(`${MENTION_SYMBOL}${mention.name}`, `${MENTION_SYMBOL}${mention.id}`);
	}

	return formattedText;
};
