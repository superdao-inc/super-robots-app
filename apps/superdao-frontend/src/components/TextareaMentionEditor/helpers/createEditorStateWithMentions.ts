import { EditorState, Modifier } from 'draft-js';

import { MENTION_SYMBOL } from 'src/constants/bio';
import { prepareBio } from 'src/utils/bio';
import { DaoMention } from '../TextareaMentionEditor.types';

export const createEditorStateWithMentions = (value: string, mentions: DaoMention[]): EditorState => {
	const preparedBio = prepareBio(value);

	let nextEditorState = EditorState.createEmpty();
	for (const chunk of preparedBio) {
		const content = nextEditorState.getCurrentContent();

		const id = chunk.slice(1);
		const mention = mentions.find((dao) => dao.id === id);

		if (!chunk.startsWith(MENTION_SYMBOL) || !mention) {
			const stateWithText = Modifier.insertText(content, nextEditorState.getSelection(), chunk);
			nextEditorState = EditorState.push(nextEditorState, stateWithText, 'insert-characters');
			continue;
		}

		const { name, avatar } = mention;
		const stateWithEntity = content.createEntity('mention', 'IMMUTABLE', { mention: { id, name, avatar } });

		const stateWithText = Modifier.replaceText(
			stateWithEntity,
			nextEditorState.getSelection(),
			`${MENTION_SYMBOL}${name}`,
			nextEditorState.getCurrentInlineStyle(),
			stateWithEntity.getLastCreatedEntityKey()
		);

		nextEditorState = EditorState.push(nextEditorState, stateWithText, 'insert-characters');
	}

	return nextEditorState;
};
