import { Label2, SubHeading } from 'src/components/text';

type TooltipContentProps = {
	className?: string;
	title?: string;
	description?: string;
};

export const TooltipContent = (props: TooltipContentProps) => {
	const { className, title, description } = props;
	return (
		<div className={className}>
			{title && <Label2 className="w-full truncate">{title}</Label2>}
			{description && <SubHeading className="max-w-max whitespace-normal">{description}</SubHeading>}
		</div>
	);
};
