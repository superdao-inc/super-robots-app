import { SocialLinks, Title3 } from 'src/components';
import { openExternal } from 'src/utils/urls';

const socials = { twitter: 'https://twitter.com/robots_xyz', discord: 'https://discord.gg/rHAq2SFh66' };

const superdaoLink = 'https://superdao.co/';

export const RobotsFooter = () => {
	const handleSocialClick = (link: string) => {
		openExternal(link);
	};

	const handleRedirectToSuperdao = () => {
		openExternal(superdaoLink);
	};

	return (
		<div className="1280:py-8 box-border w-full border-t border-white/[.06] py-6 px-6">
			<div className="500:justify-between 500:w-full mx-auto flex h-full w-[250px] flex-wrap items-center justify-center gap-4">
				<div className="500:mx-0 mx-auto block w-max">
					<SocialLinks onSocialLinkClick={handleSocialClick} {...socials} />
				</div>
				<Title3 className="text-base">
					Powered by{' '}
					<span
						className="cursor-pointer underline decoration-white/[.15] underline-offset-4"
						onClick={handleRedirectToSuperdao}
					>
						Superdao
					</span>
				</Title3>
			</div>
		</div>
	);
};
