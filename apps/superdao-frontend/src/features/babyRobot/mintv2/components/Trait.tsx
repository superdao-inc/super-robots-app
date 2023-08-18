import cn from 'classnames';
import capitalize from 'lodash/capitalize';
import { Title3, Title4 } from 'src/components';

import { PropertyTrait } from 'src/types/types.generated';

type Props = {
	variant: 'left' | 'right';
	trait: PropertyTrait;
};

export const Trait = (props: Props) => {
	const { variant, trait } = props;

	return (
		<div
			className={cn(
				'border-foregroundPrimary bg-foregroundPrimary/[.04] 768:py-3 768:px-6 w-full rounded-xl border border-opacity-10 py-3 px-5',
				{
					'768:!rounded-r-none 768:border-r-0': variant === 'left',
					'768:!rounded-l-none 768:border-l-0 768:text-right': variant === 'right'
				}
			)}
		>
			<Title4 className="768:text-[13px] 960:text-[14px] text-[14px] font-bold leading-[20px] opacity-60">
				{trait.trait_type.toLowerCase() === 'lens'
					? 'LensProtocol'
					: trait.trait_type.toLowerCase() === 'ens'
					? 'ENS'
					: capitalize(trait.trait_type)}
			</Title4>
			<Title3
				className={cn(
					'768:mt-0 960:mt-1 768:text-[16px] 960:text-[16px] line-clamp-1 mt-1 text-[16px] leading-[24px]',
					{
						'opacity-40': trait.value.toLowerCase() === 'no',
						'text-[#95E512]': trait.value.toLowerCase() === 'yes'
					}
				)}
			>
				{trait.value}
			</Title3>
		</div>
	);
};
