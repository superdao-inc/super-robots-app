import { MouseEvent, useCallback } from 'react';
import { Body, LinkingIcon, PolygonscanFilledIcon } from 'src/components';
import { openExternal } from 'src/utils/urls';

type Props = {
	walletAddress: string;
	className?: string;
};

export const ViewOnPolygonscanLink = (props: Props) => {
	const { walletAddress, className } = props;

	const handleClick = useCallback(
		(e: MouseEvent) => {
			e.stopPropagation();

			openExternal(`https://polygonscan.com/address/${walletAddress}`);
		},
		[walletAddress]
	);

	return (
		<div
			className={`${
				className ?? ''
			} flex cursor-pointer items-center gap-2 transition-all duration-100 hover:opacity-80`}
			onClick={handleClick}
		>
			<PolygonscanFilledIcon />
			<Body className="text-base">
				Owned by {walletAddress.slice(0, 2)}
				<span className="-ml-[4px] mr-[3px] -tracking-[7px]">...</span>
				{walletAddress.slice(-3)}
			</Body>
			<LinkingIcon />
		</div>
	);
};
