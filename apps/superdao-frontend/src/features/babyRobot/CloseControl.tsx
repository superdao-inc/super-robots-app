import { CrossIcon } from 'src/components';

type Props = {
	onClick: () => void;
};

export const CloseControl = (props: Props) => {
	const { onClick } = props;

	return (
		<CrossIcon
			onClick={onClick}
			width={24}
			height={24}
			className="absolute top-8 right-8 hidden cursor-pointer sm:block"
		/>
	);
};
