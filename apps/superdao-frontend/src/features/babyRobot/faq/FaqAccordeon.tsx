import cn from 'classnames';
import { ReactNode } from 'react';

import { ChevronAccordeonIcon, NewLabel1 } from 'src/components';
import { useSwitch } from 'src/hooks';

type Props = {
	title: string;
	content: string | ReactNode;
	activeContentClassName?: string;
};

export const FaqAccordeon = ({ title, content, activeContentClassName }: Props) => {
	const [isOpened, { toggle }] = useSwitch(false);

	return (
		<div
			className="h-max w-full cursor-pointer rounded-lg border border-white/[.08] bg-white/[.06] py-4 px-6"
			onClick={toggle}
		>
			<div className="flex w-full">
				<NewLabel1 className="w-full font-bold">{title}</NewLabel1>
				<ChevronAccordeonIcon className={cn('shrink-0 transition-all', { 'rotate-180': isOpened })} />
			</div>
			<div
				className={cn('max-h-0 overflow-hidden transition-[max-height]', {
					[`max-h-[300px] ${activeContentClassName}`]: isOpened
				})}
			>
				<NewLabel1 className="w-full pt-3 font-normal">{content}</NewLabel1>
			</div>
		</div>
	);
};
