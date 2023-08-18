import { ReactNode } from 'react';

type Props = {
	left?: ReactNode;
	right?: ReactNode;
};

const wrapperClass =
	'bg-backgroundTertiary absolute inset-x-0 bottom-0 flex items-center justify-between rounded-b-lg py-4 px-6';

const itemClass = 'flex flex-row gap-x-1';

const ModalFooter = (props: Props) => {
	const { left, right } = props;

	return (
		<div className={wrapperClass}>
			<div className={itemClass}>{left}</div>
			<div className={itemClass}>{right}</div>
		</div>
	);
};

export { ModalFooter };
