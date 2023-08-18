import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { ArrowLeftIcon, CrossThinIcon } from 'src/components/assets/icons';
import { shouldRedirectToMobileStub } from 'src/utils/shouldRedirectToMobileStub';

type ColumnSize = 'sm' | 'md' | 'lg' | 'custom';

export type PageContentProps = {
	className?: string;
	wrapperClassName?: string;
	arrowClassName?: string;
	columnClassName?: string;
	columnSize?: ColumnSize;
	withAccent?: boolean;
	onBack?: () => void;
	onClose?: () => void;
	children?: React.ReactNode;
};

export const PageContent: React.FC<PageContentProps> = (props) => {
	const {
		children,
		className,
		wrapperClassName,
		columnClassName,
		arrowClassName,
		columnSize = 'md',
		withAccent,
		onBack,
		onClose
	} = props;
	const { push, asPath, pathname } = useRouter();

	useEffect(() => {
		if (shouldRedirectToMobileStub(pathname)) {
			push(`/mobile?from=${asPath}`);
		}
	});

	return (
		<Wrapper wrapperClassName={wrapperClassName}>
			<div
				className={cn(
					'relative mx-auto flex w-[min(760px,100%)] min-w-[320px] flex-1 justify-center px-4 pt-0 lg:pt-5',
					className
				)}
			>
				{onBack && (
					<ArrowLeftIcon
						className={cn('absolute top-6 left-4 hidden h-6 w-6 cursor-pointer lg:block', arrowClassName)}
						width={24}
						height={24}
						onClick={onBack}
						data-testid={'PageContent__backButton'}
					/>
				)}

				<div
					className={cn('relative w-full', columnClassName, {
						'lg:w-[560px]': columnSize === 'sm',
						'lg:w-[760px]': columnSize === 'md',
						'lg:w-[1036px]': columnSize === 'lg',
						'z-10': !!withAccent
					})}
				>
					{children}
				</div>

				{onClose && (
					<CrossThinIcon
						className="absolute top-7 right-7 hidden h-6 w-6 cursor-pointer lg:block"
						width={24}
						height={24}
						onClick={onClose}
						data-testid="DaoForm__closeButton"
					/>
				)}
			</div>

			<div
				className={`z-1 fixed h-full w-full transition-all ${withAccent ? 'bg-overlayModal' : 'pointer-events-none'}`}
			/>
		</Wrapper>
	);
};

const Wrapper: FC<PropsWithChildren & { wrapperClassName?: string }> = (props) => {
	const { children, wrapperClassName } = props;

	if (wrapperClassName) {
		return <div className={wrapperClassName}>{children}</div>;
	}

	return <>{children}</>;
};
