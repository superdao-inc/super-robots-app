import upperCase from 'lodash/upperCase';

import { BgTraitIcon } from 'src/components/assets/icons/robots/bgTraitIcon';
import { BodyTraitIcon } from 'src/components/assets/icons/robots/bodyTraitIcon';
import { EarringTraitIcon } from 'src/components/assets/icons/robots/earringTraitIcon';
import { EnsTraitIcon } from 'src/components/assets/icons/robots/ensTraitIcon';
import { EyesTraitIcon } from 'src/components/assets/icons/robots/eyesTraitIcon';
import { LegsTraitIcon } from 'src/components/assets/icons/robots/legsTraitIcon';
import { LensTraitIcon } from 'src/components/assets/icons/robots/lensTraitIcon';
import { MirrorTraitIcon } from 'src/components/assets/icons/robots/mirrorTraitIcon';
import { TubesTraitIcon } from 'src/components/assets/icons/robots/tubesTraitIcon';
import { TwitterTraitIcon } from 'src/components/assets/icons/robots/twitterTraitIcon';

import { SuperRobotTrait } from './SuperRobotTrait';

type Props = {
	propertyTraits:
		| {
				trait_type: string;
				value: string;
		  }[]
		| undefined;
	isLoading: boolean;
};

export const SuperRobotTraitsList = (props: Props) => {
	const { propertyTraits, isLoading } = props;

	if (isLoading || !propertyTraits)
		return (
			<div className="mt-4 grid w-full grid-cols-2 gap-4">
				{Array.from(new Array(10)).map((_, key) => (
					<div className="h-[56px] w-full animate-pulse rounded-lg bg-[#2B2D33]" key={key}></div>
				))}
			</div>
		);

	const findProperty = (key: string) => propertyTraits.find((propertyTrait) => propertyTrait.trait_type === key);

	const bg = findProperty('BG');
	const tubes = findProperty('TUBES');
	const eyes = findProperty('EYES');
	const twitter = findProperty('TWITTER');
	const mirror = findProperty('MIRROR');
	const ens = findProperty('ENS');
	const lens = findProperty('LENS');

	const earringOg = findProperty('EARRING OG');
	const earringTrait = { trait_type: 'EARRING', value: earringOg?.value ?? '' };

	const body = findProperty('TOP');
	const bodyValue = body
		? findProperty(upperCase(body.value))
		: {
				trait_type: '',
				value: ''
		  };
	const bodyTrait = { trait_type: 'BODY', value: `${bodyValue?.value ?? ''} ${body?.value ?? ''}` };

	const legs = findProperty('FOOTWEAR');
	const legsValue = legs
		? findProperty(upperCase(legs.value))
		: {
				trait_type: '',
				value: ''
		  };
	const legsTrait = { trait_type: 'LEGS', value: `${legsValue?.value ?? ''} ${legs?.value ?? ''}` };

	return (
		<div className="1280:max-w-[398px] grid w-full grid-cols-2 gap-4">
			{bg && <SuperRobotTrait propertyTrait={bg} icon={<BgTraitIcon opacity=".4" />} />}
			{earringOg && <SuperRobotTrait propertyTrait={earringTrait} icon={<EarringTraitIcon opacity=".4" />} />}
			{tubes && <SuperRobotTrait propertyTrait={tubes} icon={<TubesTraitIcon opacity=".4" />} />}
			{eyes && <SuperRobotTrait propertyTrait={eyes} icon={<EyesTraitIcon opacity=".4" />} />}
			{body && <SuperRobotTrait propertyTrait={bodyTrait} icon={<BodyTraitIcon opacity=".4" />} />}
			{legs && <SuperRobotTrait propertyTrait={legsTrait} icon={<LegsTraitIcon opacity=".4" />} />}
			{twitter && (
				<SuperRobotTrait
					propertyTrait={twitter}
					icon={<TwitterTraitIcon opacity=".4" />}
					hint="Activates if you have more than 1000 followers on Twitter"
				/>
			)}
			{mirror && (
				<SuperRobotTrait
					propertyTrait={mirror}
					icon={<MirrorTraitIcon opacity=".4" />}
					hint="Activates if you have collected at least one entry on Mirror"
				/>
			)}
			{ens && (
				<SuperRobotTrait
					propertyTrait={ens}
					icon={<EnsTraitIcon opacity=".4" />}
					hint="Activates if there is an assigned ENS domain to your wallet"
				/>
			)}
			{lens && (
				<SuperRobotTrait
					propertyTrait={lens}
					icon={<LensTraitIcon opacity=".4" />}
					hint="Activates if you have a profile on Lens Protocol"
				/>
			)}
		</div>
	);
};
