import cn from 'classnames';

type Props = {
	onClick: () => void;
	isOpen: boolean;
};

export const HeaderBurger = ({ onClick, isOpen }: Props) => {
	return (
		<div className={cn({ 'header-burger-open': isOpen })} id="header-burger" onClick={onClick}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
};
