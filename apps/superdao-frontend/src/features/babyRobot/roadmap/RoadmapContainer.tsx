import { useEffect, useState } from 'react';

import { NewLabel1, NewTitle1, RoadmapStarIcon } from 'src/components';
import { NavDiscordIcon } from 'src/features/robots/common/navIcons/discordIcon';
import { openExternal } from 'src/utils/urls';

export const RoadmapContainer = () => {
	const handleOpenExternal = (link: string) => () => {
		openExternal(link);
	};

	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const windowScrollHandler = () => {
			setOffset(Math.floor(Math.floor(window.document.body.scrollTop) / 5));
		};

		window.document.body.addEventListener('scroll', windowScrollHandler);

		return () => {
			window.document.body.removeEventListener('scroll', windowScrollHandler);
		};
	}, []);

	return (
		<div className="relative w-full overflow-y-visible">
			<div className="744:h-[1000px] 744:w-[1500px] 1440:h-[1492px] 1440:w-[2000px] 744:-top-[260px] 744:-left-[378px] 1440:-top-[380px] 1440:-left-[280px] absolute -top-[160px] -left-[340px] z-0 h-[746px] w-[1000px]">
				<div className="744:w-[113px] 744:h-[129px] 744:top-[360px] 744:right-[385px] 1440:h-[172px] 1440:w-[227px] 1440:top-[481px] 1440:right-[514px] 744:blur-[187px] 1440:blur-[250px] absolute top-[240px] right-[257px] h-[86px] w-[170px] rounded-full bg-[#9721F3] blur-[125px]"></div>
				<div className="744:w-[113px] 744:h-[129px] 744:top-[626px] 744:right-[620px] 1440:h-[172px] 1440:w-[227px] 1440:top-[835px] 1440:right-[827px] 744:blur-[187px] 1440:blur-[250px] absolute top-[417px] right-[413px] h-[86px] w-[113px] rounded-full bg-[#EFF321] blur-[125px]"></div>
				<div className="744:w-[113px] 744:h-[129px] 744:top-[540px] 744:right-[900px] 1440:h-[172px] 1440:w-[227px] 1440:top-[720px] 1440:right-[1200px] 744:blur-[187px] 1440:blur-[250px] absolute top-[360px] right-[600px] h-[86px] w-[113px] rounded-full bg-[#2196F3] blur-[125px]"></div>
				<div className="744:w-[113px] 744:h-[129px] 744:top-[600px] 744:right-[877px] 1440:h-[172px] 1440:w-[227px] 1440:top-[800px] 1440:right-[1170px] 744:blur-[187px] 1440:blur-[250px] absolute top-[400px] right-[585px] h-[86px] w-[113px] rounded-full bg-[#9747FF] blur-[125px]"></div>
				<div className="744:w-[113px] 744:h-[129px] 744:top-[374px] 744:right-[815px] 1440:h-[172px] 1440:w-[227px] 1440:top-[499px] 1440:right-[1087px] 744:blur-[187px] 1440:blur-[250px] absolute top-[250px] right-[544px] h-[86px] w-[113px] rounded-full bg-[#FF00B8] blur-[125px]"></div>
			</div>

			{
				// left stars
			}
			<RoadmapStarIcon
				width={14}
				height={14}
				className="1440:block absolute top-[758px] left-[88px] hidden"
				style={{ transform: `translateY(${offset}px)` }}
			/>
			<RoadmapStarIcon
				width={28}
				height={28}
				className="1440:block absolute top-[980px] left-[214px] hidden"
				style={{ transform: `translateY(${offset}px)` }}
			/>
			<RoadmapStarIcon
				width={66}
				height={66}
				className="1440:block absolute top-[1703px] left-[36px] hidden"
				style={{ transform: `translateY(${offset}px)` }}
			/>
			<RoadmapStarIcon
				width={14}
				height={14}
				className="1440:block absolute top-[2347px] left-[200px] hidden"
				style={{ transform: `translateY(${offset}px)` }}
			/>

			{
				// right stars
			}
			<RoadmapStarIcon
				width={66}
				height={66}
				className="1440:block absolute top-[561px] right-[108px] hidden"
				style={{ transform: `translateY(${offset}px)` }}
			/>
			<RoadmapStarIcon
				width={28}
				height={28}
				className="1440:block absolute top-[1267px] right-[233px] hidden"
				style={{ transform: `translateY(${offset}px)` }}
			/>
			<RoadmapStarIcon
				width={28}
				height={28}
				className="1440:block absolute top-[2165px] right-[40px] hidden"
				style={{ transform: `translateY(${offset}px)` }}
			/>
			<RoadmapStarIcon
				width={14}
				height={14}
				className="1440:block absolute top-[2275px] right-[148px] hidden"
				style={{ transform: `translateY(${offset}px)` }}
			/>

			<div className="z-1 744:pt-[64px] 744:pb-[88px] relative pt-10 pb-10">
				<div className="744:h-[349px] relative flex h-[174px] w-full items-center justify-center">
					<img
						src="/robot-roadmap-group.png"
						className="744:min-w-[1553px] 744:max-w-[1553px] h-full w-full min-w-[777px] max-w-[777px]"
					/>
				</div>

				<div className="744:px-10 px-5">
					<div className="mx-auto max-w-[720px]">
						<NewTitle1 className="744:text-[76px] 744:leading-[84px] 744:mt-[64px] mt-10">Roadmap</NewTitle1>

						<div className="mt-10 flex gap-1">
							<img width={40} height={40} src="/roadmap/melon.png" />
							<NewTitle1>Callout</NewTitle1>
						</div>
						<NewLabel1 className="744:text-[24px] 744:leading-8 mt-6 font-normal">
							This is not a traditional roadmap. The Super Robots is a highly experimental project, and our plans are
							very fluid and can change at any point. This is not a commitment to do specific things but rather a form
							of transparency where the Super Robots team shares ideas that we&apos;re considering and thinking about.
							We invite the community to offer us feedback and contribute your ideas!
						</NewLabel1>

						<div className="744:mt-[64px] mt-10 flex gap-1">
							<img width={40} height={40} src="/roadmap/krendel.png" />
							<NewTitle1>The Vision</NewTitle1>
						</div>
						<NewTitle1 className="mt-6 text-[24px] leading-8">
							Make self-expression through character-building available for all
						</NewTitle1>
						<NewLabel1 className="mt-6 font-normal">
							We believe in making digital character creation accessible to everyone, so we&apos;re not restricting the
							collection to 10,000 robots. Our goal is to offer an enjoyable experience where users can build and
							collect items for their characters, similar to Pokemon GO and other digital pets.
						</NewLabel1>

						<NewTitle1 className="mt-6 text-[24px] leading-8">
							Reward active web3 users and celebrate new web3 users
						</NewTitle1>
						<NewLabel1 className="mt-6 font-normal">
							The most advanced and complex robots for the biggest contributors to the Web3 ecosystem and starting
							robots for open-minded users curious about Web3. We aim to combine the fun of playing with a digital
							character with the utility and permanence of on-chain history. We want a collection that can change every
							day, so we build technology around a more live, more dynamic NFT.
						</NewLabel1>

						<NewTitle1 className="mt-6 text-[24px] leading-8">
							Maintain character economy without sacrificing accessibility
						</NewTitle1>
						<NewLabel1 className="mt-6 font-normal">
							We want to let people not just customize and develop unique robots but also sell them and make money by
							creating unique and special digital characters. We aim to support a trading ecosystem, an internal
							character economy, and a character item economy without compromising accessibility. We want to have a lot
							of robots available, but to make trading worthwhile, some robots will be rare or special.
						</NewLabel1>

						<div className="mt-10 flex items-start gap-1">
							<img width={40} height={40} className="shrink-0 grow-0" src="/roadmap/lego.png" />
							<NewTitle1>Upcoming features</NewTitle1>
						</div>
						<NewLabel1 className="mt-6 font-normal">
							We are currently focusing on improving the basics and technical aspects of our service, such as faster
							Robot updates on Opensea. Here are some new features that will be available soon:
						</NewLabel1>
						<ul className="w-calc[(100%-28px)] mt-6 ml-7 list-disc text-white">
							<li>
								<NewLabel1 className="inline font-normal">Customizable Robots</NewLabel1>
							</li>
							<li>
								<NewLabel1 className="inline font-normal">
									Rewards for successful invitations and project contributions - e.g., exclusive clothing items
								</NewLabel1>
							</li>
							<li>
								<NewLabel1 className="inline font-normal">Premium features</NewLabel1>
							</li>
						</ul>

						<div className="mt-10 flex items-start gap-1">
							<img width={40} height={40} className="shrink-0 grow-0" src="/roadmap/booblik.png" />
							<NewTitle1>Feature ideas</NewTitle1>
						</div>
						<NewLabel1 className="mt-6 font-normal">
							None of these are a firm commitment. We may end up implementing just one or all of them, and we want to
							explore everything.
						</NewLabel1>
						<ul className="w-calc[(100%-28px)] mt-6 ml-7 list-disc text-white">
							<li>
								<NewLabel1 className="inline font-normal">Collaboration with brands</NewLabel1>
							</li>
							<li>
								<NewLabel1 className="inline font-normal">
									Different views of Robot characters, including full-body, head close-up, and more
								</NewLabel1>
							</li>
							<li>
								<NewLabel1 className="inline font-normal">Sub-characters and pets</NewLabel1>
							</li>
							<li>
								<NewLabel1 className="inline font-normal">Quality images - Full HD and higher</NewLabel1>
							</li>
							<li>
								<NewLabel1 className="inline font-normal">Diverse races and body types beyond robots</NewLabel1>
							</li>
							<li>
								<NewLabel1 className="inline font-normal">
									Open ecosystem for designers - external artists can create and list items for the robots
								</NewLabel1>
							</li>
							<li>
								<NewLabel1 className="inline font-normal">
									Conversational abilities - the robot could chat with you using AI
								</NewLabel1>
							</li>
							<li>
								<NewLabel1 className="inline font-normal">
									More features to use the robots as an avatar - AR integration, e.g. TikTok and Instagram filters
								</NewLabel1>
							</li>
							<li>
								<NewLabel1 className="inline font-normal">IP rights for holders</NewLabel1>
							</li>
						</ul>
						<NewLabel1 className="mt-6 font-normal">
							We do not commit to specific long-term features because the project is funded by Superdao, not our users.
							We&apos;re not asking you to buy into the project early on - you can get the first robots for free and
							receive upgrades by contributing.
						</NewLabel1>

						<div className="500:gap-3 744:mt-[88px] mt-10 flex flex-wrap items-center">
							<NewLabel1 className="500:w-max w-full shrink-0 font-bold opacity-70">
								Can&apos;t find what you need?
							</NewLabel1>
							<div
								className="flex shrink-0 cursor-pointer items-center gap-2"
								onClick={handleOpenExternal('https://discord.gg/rHAq2SFh66')}
							>
								<NavDiscordIcon className="opacity-40" />
								<NewLabel1 className="font-bold underline decoration-white/[.15] underline-offset-[6px]">
									Contact us
								</NewLabel1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
