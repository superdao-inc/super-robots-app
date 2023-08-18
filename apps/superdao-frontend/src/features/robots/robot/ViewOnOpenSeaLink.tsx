import { MouseEvent, useCallback } from 'react';
import { Body, LinkingIcon, OpenseaFilledIcon } from 'src/components';
import { openExternal } from 'src/utils/urls';

type Props = {
	tokenId: string;
	className?: string;
};

export const ViewOnOpenSeaLink = (props: Props) => {
	const { tokenId, className } = props;

	const handleClick = useCallback(
		(e: MouseEvent) => {
			e.stopPropagation();

			openExternal(`https://opensea.io/assets/matic/0xdcfa55e5581b1e3f04ac752c08692eacaa509d9e/${tokenId}`);
		},
		[tokenId]
	);

	return (
		<div
			className={`${
				className ?? ''
			} flex cursor-pointer items-center gap-2 transition-all duration-100 hover:opacity-80`}
			onClick={handleClick}
		>
			<OpenseaFilledIcon />
			<Body className="text-base">View on OpenSea</Body>
			<LinkingIcon />
		</div>
	);
};
