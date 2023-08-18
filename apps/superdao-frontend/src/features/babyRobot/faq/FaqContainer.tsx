import { MouseEvent } from 'react';

import { NewLabel1, Title1 } from 'src/components';
import { FaqAccordeon } from './FaqAccordeon';
import { openExternal } from 'src/utils/urls';
import { NavDiscordIcon } from 'src/features/robots/common/navIcons/discordIcon';

export const FaqContainer = () => {
	const handleBlockHoisting = (link: string) => (e: MouseEvent) => {
		e.stopPropagation();

		openExternal(link);
	};

	const handleOpenExternal = (link: string) => () => {
		openExternal(link);
	};

	return (
		<div className="1440:w-[1280px] 744:pt-[64px] 1440:pt-[88px] mx-auto pt-10 pb-10">
			<Title1 className="744:mx-10 1440:mx-0 1440:text-[76px] 1440:leading-[84px] mx-5 text-[32px] font-black leading-10">
				FAQ
			</Title1>
			<div className="744:mt-10 744:px-10 1440:px-0 1440:gap-8 744:gap-6 mt-6 flex flex-wrap gap-4 px-5">
				<div className="1440:w-full 744:w-[calc(50%-12px)] 1440:max-w-[624px] 744:gap-6 1440:gap-8 flex max-h-max w-full flex-col flex-wrap gap-4">
					<FaqAccordeon
						title="How do I mint a robot?"
						content="Join the waitlist here, and we'll email you when the mint is open. The mint is free, and we'll cover the gas fees."
						activeContentClassName={'!max-h-[300px]'}
					/>
					<FaqAccordeon
						title="Is there a mint limit?"
						content="We only allow 1 robot to be minted per wallet."
						activeContentClassName={'!max-h-[300px]'}
					/>
					<FaqAccordeon
						title="When is the next mint wave?"
						content="We announce mint waves via email and in the holder chat. Usually, we do a mint wave once a week."
						activeContentClassName={'!max-h-[300px]'}
					/>
					<FaqAccordeon
						title="What do I get as a holder of a Super Robot NFT?"
						content="There are no holder benefits we can promise at the moment. We're developing the project, listening to your ideas and feedback, and considering different options."
						activeContentClassName={'!max-h-[300px]'}
					/>
					<FaqAccordeon
						title="Can I buy or sell my Super Robot NFT?"
						content={
							<>
								Yes, the NFT is transferable. It&apos;s available on{' '}
								<span
									className="underline underline-offset-4"
									onClick={handleBlockHoisting('https://opensea.io/collection/super-robots-by-superdao')}
								>
									Opensea
								</span>{' '}
								and{' '}
								<span
									className="underline underline-offset-4"
									onClick={handleBlockHoisting('https://rarible.com/super-robots/items')}
								>
									Rarible
								</span>
								.
							</>
						}
						activeContentClassName={'!max-h-[300px]'}
					/>
				</div>
				<div className="flow 1440:w-full 744:w-[calc(50%-12px)] 1440:max-w-[624px] 744:gap-6 1440:gap-8 flex max-h-max max-h-max w-full flex-col flex-wrap items-start gap-4">
					<FaqAccordeon
						title="Why did my Robot NFT change?"
						content="Super Robots is a generative collection that lets your robots evolve and transform over time. Right now, we're still in the development phase, working hard to find the perfect visuals for your robots.
                        But you can join us and have a hand in influencing our choices! We'd love to hear your thoughts, so don't hesitate to share them with us in the chat."
						activeContentClassName={'!max-h-[550px]'}
					/>
					<FaqAccordeon
						title="Where can I buy a Super Robot NFT?"
						content={
							<>
								The collection can be officially bought on{' '}
								<span
									className="underline underline-offset-4"
									onClick={handleBlockHoisting('https://opensea.io/collection/super-robots-by-superdao')}
								>
									Opensea
								</span>{' '}
								and{' '}
								<span
									className="underline underline-offset-4"
									onClick={handleBlockHoisting('https://rarible.com/super-robots/items')}
								>
									Rarible
								</span>
								.
							</>
						}
						activeContentClassName={'!max-h-[300px]'}
					/>
					<FaqAccordeon
						title="Why do I see “content is unavailable” or “updating” on my Robot NFT?"
						content={
							<>
								This can happen when we&apos;re updating your Robot or the collection, as blockchain transactions are
								not instant. Click the three dots on the NFT page and choose Refresh metadata - this should help.
								<img
									className="mt-4 aspect-video h-max w-full overflow-hidden rounded-2xl"
									src="/assets/updateMetadataOnOpenseaHint.png"
									alt="How to update metadata on OpenSea"
								/>
							</>
						}
						activeContentClassName={'!max-h-[500px]'}
					/>
					<FaqAccordeon
						title="My NFT isn’t showing up in my wallet, what do I do?"
						content={
							<>
								Blockchain transactions can take some time, especially during busier hours. Please wait for a bit and
								check your wallet again. If the NFT doesn&apos;t show up after 24 hours, send us a DM on{' '}
								<span
									className="underline underline-offset-4"
									onClick={handleBlockHoisting('https://t.me/superdao_team')}
								>
									Telegram
								</span>
								.
							</>
						}
						activeContentClassName={'!max-h-[300px]'}
					/>
				</div>
			</div>
			<div className="744:mx-10 1440:mx-0 500:gap-3 mx-5 mt-10 flex flex-wrap items-center">
				<NewLabel1 className="500:w-max w-full shrink-0 font-bold opacity-70">Can&apos;t find what you need?</NewLabel1>
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
	);
};
