import { EntryComponentProps } from '@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry';
import cn from 'classnames';

import { Avatar } from 'src/components';
import { DaoMention } from '../../TextareaMentionEditor.types';

export type MentionEntryProps = Pick<
	EntryComponentProps,
	'className' | 'id' | 'role' | 'aria-selected' | 'onMouseDown' | 'onMouseEnter' | 'onMouseUp'
> & { mention: Pick<DaoMention, 'name' | 'avatar'> };

function MentionEntry({
	className,
	id,
	mention,
	role,
	'aria-selected': ariaSelected,
	onMouseDown,
	onMouseEnter,
	onMouseUp
}: MentionEntryProps) {
	return (
		<div
			aria-selected={ariaSelected}
			className={cn('hover:bg-backgroundTertiaryHover flex cursor-pointer px-4 py-2 duration-100', className)}
			id={id}
			role={role}
			onMouseDown={onMouseDown}
			onMouseEnter={onMouseEnter}
			onMouseUp={onMouseUp}
		>
			<Avatar fileId={mention.avatar} size="xs" />
			<div className="ml-3">{mention.name}</div>
		</div>
	);
}

export default MentionEntry;
