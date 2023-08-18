import styled from '@emotion/styled';
import { ReactNode } from 'react';
import cn from 'classnames';

type Props = {
	content: ReactNode;
	onClick: () => void;
	className?: string;
	contentClassName?: string;
	withoutDecorator?: boolean;
};

export const CustomButton = (props: Props) => {
	const { content, onClick, className, contentClassName, withoutDecorator } = props;

	return (
		<Wrapper
			className={cn(
				'hover-first:h-[calc(100%+24px)] hover-first:w-[calc(100%+24px)] hover-first:-translate-x-[12px] hover-first:-translate-y-[12px] hover-first:rounded-4xl active-first:h-[calc(100%+8px)] active-first:w-[calc(100%+8px)] active-first:-translate-x-[4px] active-first:-translate-y-[4px] active-first:rounded-[20px] tr relative cursor-pointer duration-300',
				className
			)}
			onClick={onClick}
		>
			<div
				className={cn(
					'from-robotOrange to-robotViolet z-1 absolute top-0 left-0 h-[calc(100%+16px)] w-[calc(100%+16px)] -translate-x-[8px] -translate-y-[8px] overflow-hidden rounded-3xl bg-gradient-to-r p-[1.36px] transition-all',
					{ hidden: withoutDecorator }
				)}
			>
				<div className="bg-backgroundPrimary h-full w-full rounded-[inherit]"></div>
			</div>
			<Content
				className={cn(
					'from-robotOrange to-robotViolet z-2 relative flex items-center justify-center rounded-2xl bg-gradient-to-r py-5 px-10',
					contentClassName
				)}
			>
				{content}
			</Content>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	&:hover > div:last-child {
		box-shadow: 0 5.43046px 73.3113px rgba(229, 99, 88, 0.6);
	}
`;

const Content = styled.div`
	box-shadow: 0 5.43046px 73.3113px rgba(229, 99, 88, 0.4);
	transition-duration: 300ms;
`;
