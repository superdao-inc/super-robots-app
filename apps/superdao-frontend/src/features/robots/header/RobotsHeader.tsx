import { useRouter } from 'next/router';
import cn from 'classnames';

import { Title3 } from 'src/components';
import { openExternal } from 'src/utils/urls';
import { linksConfig } from './constants';
import { RobotsHeaderButton } from './RobotsHeaderButton';
import { RobotsSidebarHeaderBurger } from './RobotsSidebarHeaderBurger';

const faq = linksConfig.find((elem) => elem.text === 'FAQ');
const roadmap = linksConfig.find((elem) => elem.text === 'Roadmap');
const socialLinks = linksConfig.filter((elem) => elem.text !== 'FAQ' && elem.text !== 'Roadmap');

type Props = {
	isCodeFlowAvailable: boolean;
	remainingCodeActivations: number;
	withoutRedirect?: boolean;
	withDemo?: boolean;
};

export const RobotsHeader = ({ withoutRedirect, withDemo, isCodeFlowAvailable, remainingCodeActivations }: Props) => {
	const { push, pathname } = useRouter();

	const handleRedirectToMint = () => {
		if (pathname === '/') {
			location.reload();
			return;
		}

		push('/');
	};

	const bindRedirectToLink = (link: string) => () => {
		openExternal(link);
	};

	const bindOpenLink = (path: string) => () => {
		push(path);
	};

	return (
		<div className="flex h-[56px] w-full items-center justify-between border-b border-white/[.06] px-6">
			<img className="cursor-pointer" onClick={handleRedirectToMint} src="/robot-logo.png" width={185} height={24} />

			<div className="1440:flex hidden items-center gap-2">
				{!!faq && (
					<Title3
						onClick={bindOpenLink(faq.link)}
						className={cn('cursor-pointer px-2 text-base font-normal', {
							'rounded-lg bg-white/[.04] py-1': pathname === '/faq'
						})}
					>
						{faq.text}
					</Title3>
				)}
				{!!roadmap && (
					<Title3
						onClick={bindOpenLink(roadmap.link)}
						className={cn('cursor-pointer px-2 text-base font-normal', {
							'rounded-lg bg-white/[.04] py-1': pathname === '/roadmap'
						})}
					>
						{roadmap.text}
					</Title3>
				)}
				{socialLinks.map((elem) => (
					<Title3
						key={elem.text}
						onClick={bindRedirectToLink(elem.link)}
						className="cursor-pointer px-2 text-base font-normal"
					>
						{elem.text}
					</Title3>
				))}
			</div>

			<div className="1440:flex hidden items-center gap-2">
				<RobotsHeaderButton
					isCodeFlowAvailable={isCodeFlowAvailable}
					remainingCodeActivations={remainingCodeActivations}
					withDemo={withDemo}
					withoutRedirect={withoutRedirect}
				/>
			</div>

			<div className="1440:hidden block">
				<RobotsSidebarHeaderBurger
					withDemo={withDemo}
					withoutRedirect={withoutRedirect}
					isCodeFlowAvailable={isCodeFlowAvailable}
					remainingCodeActivations={remainingCodeActivations}
				/>
			</div>
		</div>
	);
};
