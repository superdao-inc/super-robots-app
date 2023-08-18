import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { EditorState } from 'draft-js';
import Editor, { PluginEditorProps } from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';

import { Label } from 'src/components';

type TextareaEditorProps = Pick<PluginEditorProps, 'plugins' | 'onChange'> & {
	editorKey: string;
	editorState: EditorState;
	error?: string;
	label: string;
	placeholder?: string;
	readOnly?: boolean;
};

const TextareaEditor = ({
	editorKey,
	editorState,
	error,
	label,
	placeholder,
	plugins,
	readOnly = false,
	onChange
}: TextareaEditorProps) => {
	const editorRef = useRef<Editor | null>(null);
	const [state, setState] = useState(editorState);

	const [shouldShowEditor, setShouldShowEditor] = useState(false);

	// Trick to fix issue with NextJS. Init editor only on client side.
	// https://github.com/facebook/draft-js/issues/2332#issuecomment-780190353
	useEffect(() => {
		setShouldShowEditor(true);
	}, []);

	const handleChange = useCallback(
		(state: EditorState) => {
			setState(state);
			onChange(state);
		},
		[onChange]
	);

	const handleClick = () => editorRef.current?.focus();

	/**
	 * JSX.Element as string because the only way to style placeholder is global styles.
	 * @link: https://draftjs.org/docs/api-reference-editor/#placeholder
	 */
	const placeholderTemplate = (
		<span className="text-foregroundSecondary pointer-events-none absolute">{placeholder}</span>
	) as unknown as string;

	const editorTemplate = shouldShowEditor ? (
		<Editor
			key={editorKey}
			ref={editorRef}
			editorKey={editorKey}
			editorState={state}
			placeholder={placeholderTemplate}
			plugins={plugins}
			readOnly={readOnly}
			onChange={handleChange}
		/>
	) : (
		state.getCurrentContent().getPlainText()
	);

	return (
		<div className="w-full">
			<Label>{label}</Label>
			<div
				className="bg-overlaySecondary min-h-[140px] w-full whitespace-pre-wrap rounded-lg px-4 py-2 text-[15px] text-white duration-150"
				onClick={handleClick}
			>
				{editorTemplate}
			</div>
			{!!error && <div className="text-accentNegative mt-1">{error}</div>}
		</div>
	);
};

export default memo(TextareaEditor);
